/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SHOPIFY_DOMAIN: string;
  readonly PUBLIC_SHOPIFY_STOREFRONT_TOKEN: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cloudflare Workers environment types
declare namespace App {
  interface Locals {
    env: {
      DB: D1Database;
      SSLCOMMERZ_STORE_ID?: string;
      SSLCOMMERZ_STORE_PASSWORD?: string;
      SSLCOMMERZ_SANDBOX?: string;
      WHATSAPP_PHONE_NUMBER_ID?: string;
      WHATSAPP_ACCESS_TOKEN?: string;
      SESSION: KVNamespace;
      IMAGES?: ImagesBinding;
      [key: string]: any;
    };
    runtime: {
      env: App.Locals['env'];
    };
  }
}

// D1 Database type
interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<D1ExecResult>;
  dump(): Promise<ArrayBuffer>;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = any>(colName?: string): Promise<T | null>;
  all<T = any>(): Promise<D1Result<T>>;
  run(): Promise<D1Result<any>>;
}

interface D1Result<T = any> {
  results: T[];
  success: boolean;
  error?: string;
  meta: {
    last_row_id?: number;
    changes?: number;
    duration?: number;
    rows_read?: number;
    rows_written?: number;
  };
}

interface D1ExecResult {
  count: number;
  duration: number;
}

interface KVNamespace {
  get(key: string, type?: 'text' | 'json' | 'arrayBuffer' | 'stream'): Promise<any>;
  put(key: string, value: string | ArrayBuffer | ReadableStream, options?: { expirationTtl?: number; expiration?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<KVListResult>;
}

interface KVListResult {
  keys: Array<{ name: string; expiration?: number; metadata?: unknown }>;
  list_complete: boolean;
  cursor?: string;
}

interface ImagesBinding {
  // Cloudflare Images binding
  [key: string]: any;
}