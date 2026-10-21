import { defineMiddleware } from 'astro:middleware';
import { setD1Provider } from './lib/commerce';
import { createD1Provider } from './lib/commerce/d1';
import { env } from 'cloudflare:workers';
import type { App } from 'astro';

// Cloudflare D1Database and KVNamespace types
declare global {
  interface D1Database {
    prepare(query: string): D1PreparedStatement;
    exec(query: string): Promise<D1ExecResult>;
    dump(): Promise<ArrayBuffer>;
    batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
  }
  
  interface D1PreparedStatement {
    bind(...values: any[]): D1PreparedStatement;
    first<T = any>(): Promise<T | null>;
    run(): Promise<D1Result>;
    all<T = any>(): Promise<D1Result<T>>;
    raw(): Promise<any[]>;
  }
  
  interface D1Result<T = any> {
    results: T[];
    success: boolean;
    meta: any;
  }
  
  interface D1ExecResult {
    count: number;
    duration: number;
  }
  
  interface KVNamespace {
    get(key: string, type?: 'text' | 'json' | 'arrayBuffer' | 'stream'): Promise<any>;
    put(key: string, value: string | ArrayBuffer | ReadableStream, options?: { expirationTtl?: number }): Promise<void>;
    delete(key: string): Promise<void>;
    list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{ keys: { name: string }[]; cursor?: string }>;
  }
}

// Middleware to copy bindings from cloudflare:workers env to locals.env for pages and API routes
export const onRequest = defineMiddleware(async (context, next) => {
  // Get bindings from cloudflare:workers (new Astro v6 approach)
  const bindings = env;
  
  // Copy bindings to locals.env so they're available in pages and API routes
  if (bindings && !context.locals.env) {
    context.locals.env = {
      DB: bindings.DB,
      CART_KV: bindings.CART_KV,
      SESSION_KV: bindings.SESSION_KV,
      SESSION: bindings.SESSION,
    };
  }
  
  // Initialize D1 provider if env is available
  const localEnv = context.locals.env;
  if (localEnv?.DB) {
    const d1Provider = createD1Provider({ DB: localEnv.DB });
    setD1Provider(d1Provider);
  }
  
  return next();
});