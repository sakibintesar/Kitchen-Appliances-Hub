/**
 * Provider selection — the only place that knows which backend is active.
 * Default: mock (works with zero config). Set env to go live:
 *   COMMERCE_PROVIDER=d1          — Cloudflare D1 database (this project)
 *   COMMERCE_PROVIDER=shopify     — Shopify Storefront API
 */
import type { CommerceProvider } from './types';
import { mockProvider } from './mock';
import { shopifyProvider } from './shopify';
import { createD1Provider } from './d1';

// This will be set at runtime via middleware/env
let d1Provider: CommerceProvider | null = null;

export function setD1Provider(provider: CommerceProvider) {
  d1Provider = provider;
}

const name = import.meta.env.COMMERCE_PROVIDER ?? 'mock';

export const commerce: CommerceProvider = (() => {
  switch (name) {
    case 'd1':
      return d1Provider ?? mockProvider; // Fallback to mock if D1 not initialized
    case 'shopify':
      return shopifyProvider;
    default:
      return mockProvider;
  }
})();

export const providerName = name;
export * from './types';
