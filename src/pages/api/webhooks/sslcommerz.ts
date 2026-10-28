import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { orders, eq } from '../../../db/schema';
import { SSLCommerzGateway } from '../../../lib/payments/sslcommerz';
import type { SSLCommerzIPNPayload } from '../../../lib/payments/sslcommerz';
import { createWhatsAppService } from '../../../lib/whatsapp';

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as {
    DB: D1Database;
    SSLCOMMERZ_STORE_ID: string;
    SSLCOMMERZ_STORE_PASSWORD: string;
    SSLCOMMERZ_SANDBOX: string;
    WHATSAPP_PHONE_NUMBER_ID?: string;
    WHATSAPP_ACCESS_TOKEN?: string;
  };
  
  const db = getDb(env);

  try {
    // SSLCommerz sends IPN as form data
    const formData = await request.formData();
    
    const payload: SSLCommerzIPNPayload = {
      val_id: formData.get('val_id') as string,
      tran_id: formData.get('tran_id') as string,
      amount: formData.get('amount') as string,
      currency: formData.get('currency') as string,
      card_type: formData.get('card_type') as string,
      card_no: formData.get('card_no') as string,
      card_issuer: formData.get('card_issuer') as string,
      card_brand: formData.get('card_brand') as string,
      card_issuer_country: formData.get('card_issuer_country') as string,
      card_issuer_country_code: formData.get('card_issuer_country_code') as string,
      bank_tran_id: formData.get('bank_tran_id') as string,
      card_sub_type: formData.get('card_sub_type') as string,
      currency_type: formData.get('currency_type') as string,
      currency_amount: formData.get('currency_amount') as string,
      currency_rate: formData.get('currency_rate') as string,
      base_fair: formData.get('base_fair') as string,
      risk_level: formData.get('risk_level') as string,
      risk_title: formData.get('risk_title') as string,
      EMI_amount: formData.get('EMI_amount') as string,
      EMI_inst: formData.get('EMI_inst') as string,
      EMI_issuer: formData.get('EMI_issuer') as string,
      value_a: formData.get('value_a') as string,
      value_b: formData.get('value_b') as string,
      value_c: formData.get('value_c') as string,
      value_d: formData.get('value_d') as string,
      tran_date: formData.get('tran_date') as string,
      status: formData.get('status') as any,
    };

    // Validate required fields
    if (!payload.val_id || !payload.tran_id || !payload.value_a) {
      console.error('Invalid SSLCommerz IPN payload:', payload);
      return new Response('Invalid payload', { status: 400 });
    }

    const orderId = parseInt(payload.value_a);
    
    // Verify with SSLCommerz
    const sslConfig = {
      storeId: env.SSLCOMMERZ_STORE_ID,
      storePassword: env.SSLCOMMERZ_STORE_PASSWORD,
      isSandbox: env.SSLCOMMERZ_SANDBOX === 'true',
      successUrl: '',
      failUrl: '',
      cancelUrl: '',
      ipnUrl: '',
    };
    
    const gateway = new SSLCommerzGateway(sslConfig);
    const validation = await gateway.verifyIPN(payload);

    if (validation.status !== 'VALID' && validation.status !== 'VALIDATED') {
      // Payment failed or invalid
      await db.update(orders)
        .set({ 
          status: 'payment_failed',
          paymentIntentId: payload.tran_id,
          updatedAt: Math.floor(Date.now() / 1000),
        })
        .where(eq(orders.id, orderId))
        .run();

      console.log(`Order ${orderId} payment failed: ${validation.status}`);
      return new Response('OK', { status: 200 });
    }

    // Payment successful - update order
    const order = await db.select().from(orders).where(eq(orders.id, orderId)).get();
    
    if (!order) {
      console.error(`Order ${orderId} not found`);
      return new Response('Order not found', { status: 404 });
    }

    // Update order status to confirmed
    await db.update(orders)
      .set({ 
        status: 'confirmed',
        paymentIntentId: payload.tran_id,
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .where(eq(orders.id, orderId))
      .run();

    // Send WhatsApp confirmation for paid order
    if (env.WHATSAPP_PHONE_NUMBER_ID && env.WHATSAPP_ACCESS_TOKEN && order.phone) {
      try {
        const whatsapp = createWhatsAppService({
          WHATSAPP_PHONE_NUMBER_ID: env.WHATSAPP_PHONE_NUMBER_ID,
          WHATSAPP_ACCESS_TOKEN: env.WHATSAPP_ACCESS_TOKEN,
        });

        const lines = JSON.parse(order.lines as string);
        
        await whatsapp.sendOrderConfirmation({
          to: order.phone,
          orderNumber: `#KH-${String(orderId).padStart(6, '0')}`,
          customerName: order.name,
          totalAmount: order.totalAmount,
          currency: order.currency,
          items: lines.map((l: any) => ({
            name: l.title,
            quantity: l.quantity,
            price: l.price?.amount || 0,
          })),
          paymentMethod: order.paymentMethod as any,
          estimatedDelivery: '2-3 business days',
        });
      } catch (waError) {
        console.error('WhatsApp confirmation failed:', waError);
      }
    }

    console.log(`Order ${orderId} confirmed via SSLCommerz IPN`);
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('SSLCommerz webhook error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// Also handle GET (some gateways redirect via GET)
export const GET: APIRoute = async ({ locals, request }) => {
  // Redirect to success/fail page based on query params
  const url = new URL(request.url);
  const orderId = url.searchParams.get('order');
  const status = url.searchParams.get('status');
  
  if (orderId) {
    const redirectUrl = status === 'failed' 
      ? `/checkout?failed=true&order=${orderId}`
      : `/checkout/success?order=${orderId}`;
    
    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    });
  }
  
  return new Response('Invalid request', { status: 400 });
};