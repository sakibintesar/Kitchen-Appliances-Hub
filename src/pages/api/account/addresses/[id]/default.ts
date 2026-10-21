import type { APIRoute } from 'astro';
import { getDb } from '../../../../../db';
import { addresses, eq } from '../../../../../db/schema';

export const POST: APIRoute = async ({ locals, request, params }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const id = params.id;

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

  const address = await db.select()
    .from(addresses)
    .where(eq(addresses.id, parseInt(id)))
    .get();

  if (!address || address.userId !== userId) {
    return new Response(JSON.stringify({ error: 'Address not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Unset all other defaults
  await db.update(addresses)
    .set({ isDefault: false })
    .where(eq(addresses.userId, userId));

  // Set this as default
  await db.update(addresses)
    .set({ isDefault: true })
    .where(eq(addresses.id, parseInt(id)));

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};