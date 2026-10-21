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
  
  const { email, password } = await request.json();
  
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const user = await db.select().from(users).where(eq(users.email, email)).get();
  
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const sessionId = generateSessionId();
  const expiresAt = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days
  
  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  }).run();
  
  const response = new Response(JSON.stringify({ 
    success: true, 
    user: { id: user.id, email: user.email, name: user.name } 
  }), { headers: { 'Content-Type': 'application/json' } });
  
  return setAuthCookies(response, sessionId, user.id);
};