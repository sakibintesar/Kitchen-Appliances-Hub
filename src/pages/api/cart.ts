import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { carts, eq } from '../../db/schema';

function getCartId(request: Request): string {
  // Get or create cart ID from cookie/session
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/cart_id=([^;]+)/);
  if (match) return match[1];
  
  // Generate new cart ID
  return crypto.randomUUID();
}

function setCartCookie(response: Response, cartId: string): Response {
  const headers = new Headers(response.headers);
  headers.append('Set-Cookie', `cart_id=${cartId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`);
  return new Response(response.body, { ...response, headers });
}

export const GET: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const cartId = getCartId(request);
  
  const cart = await db.select().from(carts).where(eq(carts.id, cartId)).get();
  
  return new Response(JSON.stringify({ 
    lines: cart ? JSON.parse(cart.lines) : [],
    cartId 
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const cartId = getCartId(request);
  
  const { lines } = await request.json();
  
  await db.insert(carts).values({
    id: cartId,
    lines: JSON.stringify(lines),
    updatedAt: Math.floor(Date.now() / 1000),
  }).onConflictDoUpdate({
    target: carts.id,
    set: { lines: JSON.stringify(lines), updatedAt: Math.floor(Date.now() / 1000) },
  });
  
  return new Response(JSON.stringify({ success: true, cartId }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const cartId = getCartId(request);
  
  await db.delete(carts).where(eq(carts.id, cartId)).run();
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};