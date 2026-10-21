import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, eq } from '../../../db/schema';
import bcrypt from 'bcryptjs';

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

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return new Response(JSON.stringify({ error: 'Current and new password are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (newPassword.length < 8) {
    return new Response(JSON.stringify({ error: 'New password must be at least 8 characters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await db.select().from(users).where(eq(users.id, userId)).get();

  if (!user || !user.passwordHash) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) {
    return new Response(JSON.stringify({ error: 'Current password is incorrect' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await db.update(users).set({ passwordHash: newHash }).where(eq(users.id, userId));

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};