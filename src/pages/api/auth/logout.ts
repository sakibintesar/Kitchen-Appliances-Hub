import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { sessions, eq } from '../../../db/schema';

function clearAuthCookies(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.append('Set-Cookie', 'session_id=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  headers.append('Set-Cookie', 'user_id=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  return new Response(response.body, { ...response, headers });
}

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/session_id=([^;]+)/);
  
  if (match) {
    await db.delete(sessions).where(eq(sessions.id, match[1])).run();
  }
  
  const response = new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  return clearAuthCookies(response);
};