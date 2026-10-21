import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { favorites, eq, and } from '../../db/schema';

function getUserId(request: Request): number | null {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/user_id=([^;]+)/);
  return match ? parseInt(match[1], 10) : null;
}

function getSessionId(request: Request): string {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/session_id=([^;]+)/);
  if (match) return match[1];
  return crypto.randomUUID();
}

function setSessionCookie(response: Response, sessionId: string): Response {
  const headers = new Headers(response.headers);
  headers.append('Set-Cookie', `session_id=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`);
  return new Response(response.body, { ...response, headers });
}

export const GET: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const userId = getUserId(request);
  const sessionId = getSessionId(request);
  
  let query = db.select().from(favorites);
  
  if (userId) {
    query = query.where(eq(favorites.userId, userId));
  } else {
    query = query.where(eq(favorites.sessionId, sessionId));
  }
  
  const rows = await query.all();
  const handles = rows.map(r => r.productHandle);
  
  const response = new Response(JSON.stringify({ favorites: handles }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  return setSessionCookie(response, sessionId);
};

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const userId = getUserId(request);
  const sessionId = getSessionId(request);
  
  const { productHandle } = await request.json();
  
  await db.insert(favorites).values({
    userId: userId || null,
    sessionId: userId ? null : sessionId,
    productHandle,
    createdAt: Math.floor(Date.now() / 1000),
  }).onConflictDoNothing();
  
  const response = new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  return setSessionCookie(response, sessionId);
};

export const DELETE: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const userId = getUserId(request);
  const sessionId = getSessionId(request);
  
  const url = new URL(request.url);
  const productHandle = url.searchParams.get('handle');
  
  if (!productHandle) {
    return new Response(JSON.stringify({ error: 'Missing handle' }), { status: 400 });
  }
  
  if (userId) {
    await db.delete(favorites).where(and(eq(favorites.userId, userId), eq(favorites.productHandle, productHandle))).run();
  } else {
    await db.delete(favorites).where(and(eq(favorites.sessionId, sessionId), eq(favorites.productHandle, productHandle))).run();
  }
  
  const response = new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  return setSessionCookie(response, sessionId);
};