import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, eq } from '../../../db/schema';

export const POST: APIRoute = async ({ locals, request }) => {
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

  const { name } = await request.json();

  if (!name || name.trim().length < 2) {
    return new Response(JSON.stringify({ error: 'Name must be at least 2 characters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await db.update(users)
    .set({ name: name.trim() })
    .where(eq(users.id, userId));

  const updatedUser = await db.select().from(users).where(eq(users.id, userId)).get();

  return new Response(JSON.stringify({
    success: true,
    user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name }
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};