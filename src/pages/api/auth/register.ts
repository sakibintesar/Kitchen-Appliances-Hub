import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, sessions, eq } from '../../../db/schema';
import bcrypt from 'bcryptjs';
import { encodeBase64 } from '@oslojs/encoding';

function generateSessionId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return encodeBase64(bytes);
}

function setAuthCookies(response: Response, sessionId: string, userId: number): Response {
  const headers = new Headers(response.headers);
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  headers.append('Set-Cookie', `session_id=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`);
  headers.append('Set-Cookie', `user_id=${userId}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`);
  return new Response(response.body, { ...response, headers });
}

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  
  const { email, password, name } = await request.json();
  
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password required' }), { 
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
  
  // Check if user exists
  const existing = await db.select().from(users).where(eq(users.email, email)).get();
  if (existing) {
    return new Response(JSON.stringify({ error: 'Email already registered' }), { 
      status: 409,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const passwordHash = await bcrypt.hash(password, 10);
  
  const result = await db.insert(users).values({
    email,
    passwordHash,
    name: name || null,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
  }).run();
  
  const userId = result.meta.last_row_id as number;
  const sessionId = generateSessionId();
  const expiresAt = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  
  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  }).run();
  
  const response = new Response(JSON.stringify({ 
    success: true, 
    user: { id: userId, email, name: name || null } 
  }), { headers: { 'Content-Type': 'application/json' } });
  
  return setAuthCookies(response, sessionId, userId);
};