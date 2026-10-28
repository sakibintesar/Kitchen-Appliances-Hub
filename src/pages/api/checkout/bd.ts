import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { orders, carts, eq } from '../../../db/schema';
import { cartLines, clearCart } from '../../../lib/cart';
import { SSLCommerzGateway } from '../../../lib/payments/sslcommerz';
import type { SSLCommerzConfig } from '../../../lib/payments/sslcommerz';
import { createWhatsAppService } from '../../../lib/whatsapp';
import type { BDPaymentMethod, CheckoutSession } from '../../../lib/commerce/types';

function getCartId(request: Request): string {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/cart_id=([^;]+)/);
  if (match) return match[1];
  return crypto.randomUUID();
}

function setCartCookie(response: Response, cartId: string): Response {
  const headers = new Headers(response.headers);
  headers.append('Set-Cookie', `cart_id=${cartId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`);
  return new Response(response.body, { ...response, headers });
}

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as {
    DB: D1Database;
    SSLCOMMERZ_STORE_ID: string;
    SSLCOMMERZ_STORE_PASSWORD: string;
    SSLCOMMERZ_SANDBOX: string;
    PUBLIC_SITE_URL: string;
    WHATSAPP_PHONE_NUMBER_ID?: string;
    WHATSAPP_ACCESS_TOKEN?: string;
  };
  
  const db = getDb(env);
  const cartId = getCartId(request);

  try {
    const body = await request.json();
    const { 
      email, 
      name, 
      phone,
      shippingAddress, 
      billingAddress, 
      paymentMethod = 'cod' as BDPaymentMethod,
      lines, 
      totalAmount, 
      currency = 'BDT' 
    } = body;

    if (!email || !name || !phone || !shippingAddress || !lines || !Array.isArray(lines) || lines.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validMethods: BDPaymentMethod[] = ['cod', 'sslcommerz', 'bkash', 'nagad', 'rocket'];
    if (!validMethods.includes(paymentMethod)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid payment method' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const initialStatus = paymentMethod === 'cod' ? 'pending' : 'pending_payment';

    const orderResult = await db.insert(orders).values({
      userId: null,
      sessionId: cartId,
      email,
      name,
      phone,
      status: initialStatus,
      totalAmount,
      currency,
      lines: JSON.stringify(lines),
      shippingAddress: JSON.stringify(shippingAddress),
      billingAddress: JSON.stringify(billingAddress || shippingAddress),
      paymentMethod,
      paymentIntentId: null,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    }).run();

    const orderId = orderResult.meta?.last_row_id || 0;
    const orderNumber = `#KH-${String(orderId).padStart(6, '0')}`;

    clearCart();
    await db.delete(carts).where(eq(carts.id, cartId)).run();

    let sessionUrl: string | undefined;
    let paymentUrl: string | undefined;
    let sessionId: string | undefined;

    if (paymentMethod === 'sslcommerz') {
      if (!env.SSLCOMMERZ_STORE_ID || !env.SSLCOMMERZ_STORE_PASSWORD) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'SSLCommerz not configured' 
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const sslConfig: SSLCommerzConfig = {
        storeId: env.SSLCOMMERZ_STORE_ID,
        storePassword: env.SSLCOMMERZ_STORE_PASSWORD,
        isSandbox: env.SSLCOMMERZ_SANDBOX === 'true',
        successUrl: `${env.PUBLIC_SITE_URL}/checkout/success?order=${orderId}`,
        failUrl: `${env.PUBLIC_SITE_URL}/checkout?failed=true&order=${orderId}`,
        cancelUrl: `${env.PUBLIC_SITE_URL}/checkout?canceled=true&order=${orderId}`,
        ipnUrl: `${env.PUBLIC_SITE_URL}/api/webhooks/sslcommerz`,
      };

      const gateway = new SSLCommerzGateway(sslConfig);
      const initRequest = SSLCommerzGateway.buildInitRequest(sslConfig, {
        orderId,
        orderNumber,
        email,
        name,
        phone,
        shippingAddress,
        lines: lines.map((l: any) => ({
          title: l.title,
          quantity: l.quantity,
          price: l.price?.amount || 0,
        })),
        totalAmount,
      });

      const initResponse = await gateway.initPayment(initRequest);

      if (initResponse.status === 'SUCCESS' && initResponse.GatewayPageURL) {
        sessionUrl = initResponse.GatewayPageURL;
        sessionId = initResponse.sessionkey;
        
        await db.update(orders)
          .set({ 
            paymentIntentId: initResponse.sessionkey,
            updatedAt: Math.floor(Date.now() / 1000),
          })
          .where(eq(orders.id, orderId))
          .run();
      } else {
        await db.update(orders)
          .set({ 
            status: 'payment_failed',
            updatedAt: Math.floor(Date.now() / 1000),
          })
          .where(eq(orders.id, orderId))
          .run();
        
        return new Response(JSON.stringify({ 
          success: false, 
          error: initResponse.failedreason || 'Payment initialization failed' 
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    let whatsappSent = false;
    if (env.WHATSAPP_PHONE_NUMBER_ID && env.WHATSAPP_ACCESS_TOKEN) {
      try {
        const whatsapp = createWhatsAppService({
          WHATSAPP_PHONE_NUMBER_ID: env.WHATSAPP_PHONE_NUMBER_ID,
          WHATSAPP_ACCESS_TOKEN: env.WHATSAPP_ACCESS_TOKEN,
        });

        const paymentUrlForWhatsApp = sessionUrl || paymentUrl;
        
        await whatsapp.sendOrderConfirmation({
          to: phone,
          orderNumber,
          customerName: name,
          totalAmount,
          currency,
          items: lines.map((l: any) => ({
            name: l.title,
            quantity: l.quantity,
            price: l.price?.amount || 0,
          })),
          paymentMethod,
          paymentUrl: paymentUrlForWhatsApp,
          estimatedDelivery: '2-3 business days',
        });
        
        whatsappSent = true;
      } catch (waError) {
        console.error('WhatsApp notification failed:', waError);
      }
    }

    const response: CheckoutSession = {
      success: true,
      sessionId,
      sessionUrl,
      paymentUrl,
      orderId,
      orderNumber,
      paymentMethod,
      whatsappSent,
    };

    return setCartCookie(
      new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      }),
      cartId
    );
  } catch (error) {
    console.error('BD Checkout error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to create order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};