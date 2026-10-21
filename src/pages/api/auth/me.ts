import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, sessions, eq } from '../../../db/schema';

export const GET: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/session_id=([^;]+)/);
  
  if (!match) {
    return new Response(JSON.stringify({ user: null }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const session = await db.select()
    .from(sessions)
    .where(eq(sessions.id, match[1]))
    .get();
  
  if (!session || session.expiresAt < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ user: null }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const user = await db.select()
    .from(users)
    .where(eq(users.id, session.userId))
    .get();
  
  if (!user) {
    return new Response(JSON.stringify({ user: null }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  return new Response(JSON.stringify({ 
    user: { id: user.id, email: user.email, name: user.name } 
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};