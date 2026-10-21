import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { collections, eq } from '../../db/schema';

function mapCollection(row: any) {
  return {
    id: row.id,
    handle: row.id,
    title: row.title,
    description: row.description,
    image: row.image_src ? { src: row.image_src, alt: row.image_alt || row.title } : undefined,
  };
}

export const GET: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const url = new URL(request.url);
  const handle = url.searchParams.get('handle');
  
  if (handle) {
    const row = await db.select().from(collections).where(eq(collections.id, handle)).get();
    if (!row) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    return new Response(JSON.stringify({ collection: mapCollection(row) }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const rows = await db.select().from(collections).all();
  
  return new Response(JSON.stringify({ collections: rows.map(mapCollection) }), {
    headers: { 'Content-Type': 'application/json' },
  });
};