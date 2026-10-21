import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { orders, carts, eq } from '../../db/schema';
import { cartLines, clearCart } from '../../lib/cart';

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
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const cartId = getCartId(request);

  try {
    const body = await request.json();
    const { email, name, shippingAddress, billingAddress, paymentMethod, paymentDetails, lines, totalAmount, currency = 'USD' } = body;

    // Validate required fields
    if (!email || !name || !shippingAddress || !lines || !Array.isArray(lines) || lines.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create order
    const result = await db.insert(orders).values({
      userId: null, // Could be linked to authenticated user
      sessionId: cartId,
      email,
      name,
      status: 'pending',
      totalAmount,
      currency,
      lines: JSON.stringify(lines),
      shippingAddress: JSON.stringify(shippingAddress),
      billingAddress: JSON.stringify(billingAddress),
      paymentIntentId: paymentDetails?.paymentIntentId || null,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    }).run();

    const orderId = result.meta?.last_row_id || 0;
    const orderNumber = `#KH-${String(orderId).padStart(6, '0')}`;

    // Clear the cart
    clearCart();
    await db.delete(carts).where(eq(carts.id, cartId)).run();

    return new Response(JSON.stringify({
      success: true,
      orderId,
      orderNumber,
      email,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to create order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const cartId = getCartId(request);

  const url = new URL(request.url);
  const orderId = url.searchParams.get('orderId');

  if (orderId) {
    const order = await db.select().from(orders).where(eq(orders.id, parseInt(orderId))).get();
    if (!order) {
      return new Response(JSON.stringify({ success: false, error: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true, order }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // List orders for current session
  const userOrders = await db.select().from(orders).where(eq(orders.sessionId, cartId)).all();
  return new Response(JSON.stringify({ success: true, orders: userOrders }), {
    headers: { 'Content-Type': 'application/json' },
  });
};