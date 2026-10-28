import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { orders, eq } from '../../../db/schema';

export const GET: APIRoute = async ({ params, locals }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const orderId = params.id;

  if (!orderId) {
    return new Response(JSON.stringify({ success: false, error: 'Order ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const orderResult = await db
      .select()
      .from(orders)
      .where(eq(orders.id, parseInt(orderId)))
      .get();

    if (!orderResult) {
      return new Response(JSON.stringify({ success: false, error: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse JSON fields
    const order = {
      ...orderResult,
      lines: JSON.parse(orderResult.lines || '[]'),
      shippingAddress: JSON.parse(orderResult.shippingAddress || '{}'),
      billingAddress: JSON.parse(orderResult.billingAddress || '{}'),
    };

    return new Response(JSON.stringify({ success: true, order }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};