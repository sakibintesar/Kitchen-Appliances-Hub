import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, eq } from '../../../db/schema';

export const GET: APIRoute = async ({ locals, request, params }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const token = new URL(request.url).searchParams.get('token');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Invalid verification token' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await db.select()
    .from(users)
    .where(eq(users.emailVerifyToken, token))
    .get();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid or expired verification token' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (user.emailVerifyExpires && user.emailVerifyExpires < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ error: 'Verification token has expired' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await db.update(users)
    .set({
      emailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpires: null,
      updatedAt: Math.floor(Date.now() / 1000),
    })
    .where(eq(users.id, user.id));

  return new Response(JSON.stringify({ success: true, message: 'Email verified successfully' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};