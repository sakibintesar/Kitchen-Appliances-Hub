import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, eq } from '../../../db/schema';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);

  const { token, password } = await request.json();

  if (!token || !password) {
    return new Response(JSON.stringify({ error: 'Token and new password are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (password.length < 8) {
    return new Response(JSON.stringify({ error: 'Password must be at least 8 characters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await db.select()
    .from(users)
    .where(eq(users.passwordResetToken, token))
    .get();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid or expired reset token' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (user.passwordResetExpires && user.passwordResetExpires < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ error: 'Reset token has expired' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.update(users)
    .set({
      passwordHash,
      passwordResetToken: null,
      passwordResetExpires: null,
      updatedAt: Math.floor(Date.now() / 1000),
    })
    .where(eq(users.id, user.id));

  return new Response(JSON.stringify({ success: true, message: 'Password reset successfully' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};