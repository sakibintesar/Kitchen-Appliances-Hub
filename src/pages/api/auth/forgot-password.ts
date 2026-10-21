import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, eq } from '../../../db/schema';
import { encodeBase64 } from '@oslojs/encoding';

function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return encodeBase64(bytes);
}

async function sendResetEmail(email: string, token: string, name?: string | null) {
  const resetUrl = `${import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321'}/reset-password?token=${token}`;
  console.log(`[DEV] Password reset email to ${email}: ${resetUrl}`);
}

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);

  const { email } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await db.select().from(users).where(eq(users.email, email)).get();

  // Always return success to prevent email enumeration
  if (!user) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resetToken = generateToken();
  const resetExpires = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour

  await db.update(users)
    .set({
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
      updatedAt: Math.floor(Date.now() / 1000),
    })
    .where(eq(users.id, user.id));

  await sendResetEmail(email, resetToken, user.name);

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};