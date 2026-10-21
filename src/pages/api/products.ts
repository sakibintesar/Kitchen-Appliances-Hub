import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { products, collections, eq, sql } from '../../db/schema';

function jsonParse<T>(str: string, fallback: T): T {
  try { return JSON.parse(str); } catch { return fallback; }
}

function mapProduct(row: any) {
  // Handle both snake_case (DB columns) and camelCase (Drizzle TS properties)
  const get = (snake: string, camel: string) => row[snake] ?? row[camel];
  const priceAmount = get('price_amount', 'priceAmount');
  const priceCurrency = get('price_currency', 'priceCurrency');
  const compareAtPriceAmount = get('compare_at_price_amount', 'compareAtPriceAmount');
  const compareAtPriceCurrency = get('compare_at_price_currency', 'compareAtPriceCurrency');
  const collectionHandles = get('collection_handles', 'collectionHandles');
  
  return {
    id: row.id,
    handle: row.id,
    title: row.title,
    description: row.description,
    images: jsonParse(row.images, []),
    price: { amount: priceAmount ? Number(priceAmount) / 100 : 0, currency: priceCurrency || 'USD' },
    compareAtPrice: compareAtPriceAmount ? {
      amount: Number(compareAtPriceAmount) / 100,
      currency: compareAtPriceCurrency || 'USD',
    } : undefined,
    variants: jsonParse(row.variants, []),
    tags: jsonParse(row.tags, []),
    collectionHandles: jsonParse(collectionHandles, []),
  };
}

function mapCollection(row: any) {
  const get = (snake: string, camel: string) => row[snake] ?? row[camel];
  const imageSrc = get('image_src', 'imageSrc');
  const imageAlt = get('image_alt', 'imageAlt');
  return {
    id: row.id,
    handle: row.id,
    title: row.title,
    description: row.description,
    image: imageSrc ? { src: imageSrc, alt: imageAlt || row.title } : undefined,
  };
}

export const GET: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);
  const url = new URL(request.url);
  
  const collection = url.searchParams.get('collection');
  const limit = parseInt(url.searchParams.get('limit') || '50', 10);
  const handle = url.searchParams.get('handle');
  
  if (handle) {
    // Get single product
    const row = await db.select().from(products).where(eq(products.id, handle)).get();
    if (!row) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    return new Response(JSON.stringify({ product: mapProduct(row) }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  let query = db.select().from(products);
  
  if (collection) {
    query = query.where(sql`json_each(collection_handles) = ${collection}`) as any;
  }
  
  const rows = await query.limit(limit).all();
  
  return new Response(JSON.stringify({ products: rows.map(mapProduct) }), {
    headers: { 'Content-Type': 'application/json' },
  });
};