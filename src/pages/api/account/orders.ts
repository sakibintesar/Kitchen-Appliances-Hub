import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { orders, eq } from '../../../db/schema';

export const GET: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);

  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/session_id=([^;]+)/);

  if (!match) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const sessionRes = await env.DB.prepare(
    'SELECT user_id, expires_at FROM sessions WHERE id = ?'
  ).bind(match[1]).first();

  if (!sessionRes || sessionRes.expires_at < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = sessionRes.user_id;

  const userOrders = await db.select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .all();

  return new Response(JSON.stringify({ orders: userOrders }), {
    headers: { 'Content-Type': 'application/json' },
  });
};