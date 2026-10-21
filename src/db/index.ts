/**
 * D1 Database Client for KitchenHub
 * Uses Drizzle ORM with Cloudflare D1
 */
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb(env: { DB: D1Database }) {
  return drizzle(env.DB, { schema });
}

export type Db = ReturnType<typeof getDb>;
export * from './schema';