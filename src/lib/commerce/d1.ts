/**
 * D1 Commerce Provider for KitchenHub
 * Implements CommerceProvider interface using Cloudflare D1 database
 */
import { eq, sql } from 'drizzle-orm';
import type { CommerceProvider, Product, Collection, CartLine, ProductVariant, ProductImage, Money } from '../commerce/types';
import { getDb } from '../../db';
import type { Db } from '../../db';

function jsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function mapProduct(row: any): Product {
  const images = jsonParse<ProductImage[]>(row.images, []);
  const tags = jsonParse<string[]>(row.tags, []);
  const collectionHandles = jsonParse<string[]>(row.collection_handles, []);
  const variants = jsonParse<ProductVariant[]>(row.variants, []);

  return {
    id: row.id,
    handle: row.id,
    title: row.title,
    description: row.description,
    images,
    price: {
      amount: row.price_amount / 100,
      currency: row.price_currency,
    },
    compareAtPrice: row.compare_at_price_amount ? {
      amount: row.compare_at_price_amount / 100,
      currency: row.compare_at_price_currency || 'USD',
    } : undefined,
    variants,
    tags,
    collectionHandles,
  };
}

function mapCollection(row: any): Collection {
  return {
    id: row.id,
    handle: row.id,
    title: row.title,
    description: row.description,
    image: row.image_src ? {
      src: row.image_src,
      alt: row.image_alt || row.title,
    } : undefined,
  };
}

export function createD1Provider(env: { DB: D1Database }): CommerceProvider {
  const db = getDb(env);

  return {
    async listProducts(opts = {}) {
      let query = db.select().from(db.schema.products);
      
      if (opts.collection) {
        // Filter by collection - need to check JSON array
        query = query.where(sql`json_each(collection_handles) = ${opts.collection}`) as any;
      }
      
      const rows = opts.limit ? await query.limit(opts.limit).all() : await query.all();
      return rows.map(mapProduct);
    },

    async getProduct(handle: string) {
      const row = await db.select().from(db.schema.products).where(eq(db.schema.products.id, handle)).get();
      return row ? mapProduct(row) : null;
    },

    async listCollections() {
      const rows = await db.select().from(db.schema.collections).all();
      return rows.map(mapCollection);
    },

    async getCollection(handle: string) {
      const row = await db.select().from(db.schema.collections).where(eq(db.schema.collections.id, handle)).get();
      return row ? mapCollection(row) : null;
    },

    async checkoutUrl(lines: CartLine[]) {
      // Create order in database and return checkout URL
      // For now, return a placeholder - will integrate with Stripe later
      return '/checkout?mock=true';
    },
  };
}