/**
 * Seed script for KitchenHub D1 database
 * Run with: npx tsx scripts/seed.ts (local) or wrangler d1 execute kitchenhub-db --file=./scripts/seed.sql (remote)
 */

import { drizzle } from 'drizzle-orm/d1';
import { createClient } from '@libsql/client';
import * as schema from '../src/db/schema';
import catalog from '../src/data/mock-catalog.json';

// For local development with libSQL (Turso) - matches D1 schema
// For production D1, we generate SQL file instead

async function generateSeedSQL() {
  const db = drizzle({ schema });

  // Generate INSERT statements for collections
  const collectionInserts = catalog.collections.map((c: any) => {
    return `INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      '${c.handle}',
      '${c.title.replace(/'/g, "''")}',
      '${c.description.replace(/'/g, "''")}',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );`;
  }).join('\n');

  // Generate INSERT statements for products
  const productInserts = catalog.products.map((p: any) => {
    const images = JSON.stringify(p.images);
    const variants = JSON.stringify(p.variants);
    const tags = JSON.stringify(p.tags);
    const collectionHandles = JSON.stringify(p.collectionHandles);
    const priceAmount = Math.round(p.price.amount * 100);
    const compareAtPriceAmount = p.compareAtPrice ? Math.round(p.compareAtPrice.amount * 100) : null;

    return `INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      '${p.handle}',
      '${p.title.replace(/'/g, "''")}',
      '${p.description.replace(/'/g, "''")}',
      ${priceAmount},
      '${p.price.currency}',
      ${compareAtPriceAmount ?? 'NULL'},
      ${compareAtPriceAmount ? `'${p.compareAtPrice.currency}'` : 'NULL'},
      '${images.replace(/'/g, "''")}',
      '${variants.replace(/'/g, "''")}',
      '${tags.replace(/'/g, "''")}',
      '${collectionHandles.replace(/'/g, "''")}',
      (unixepoch()),
      (unixepoch())
    );`;
  }).join('\n');

  const sql = `-- KitchenHub Seed Data
-- Generated from src/data/mock-catalog.json
-- Run: wrangler d1 execute kitchenhub-db --file=./scripts/seed.sql

${collectionInserts}

${productInserts}
`;

  return sql;
}

// For local libSQL/Turso development
async function seedLocal() {
  const client = createClient({ url: 'file:local.db' });
  const db = drizzle(client, { schema });

  console.log('Seeding local database...');

  // Insert collections
  for (const c of catalog.collections) {
    await db.insert(schema.collections).values({
      id: c.handle,
      title: c.title,
      description: c.description,
      imageSrc: null,
      imageAlt: null,
    }).onConflictDoUpdate({
      target: schema.collections.id,
      set: { title: c.title, description: c.description }
    });
  }
  console.log(`✓ Inserted ${catalog.collections.length} collections`);

  // Insert products
  for (const p of catalog.products) {
    await db.insert(schema.products).values({
      id: p.handle,
      title: p.title,
      description: p.description,
      priceAmount: Math.round(p.price.amount * 100),
      priceCurrency: p.price.currency,
      compareAtPriceAmount: p.compareAtPrice ? Math.round(p.compareAtPrice.amount * 100) : null,
      compareAtPriceCurrency: p.compareAtPrice ? p.compareAtPrice.currency : null,
      images: JSON.stringify(p.images),
      variants: JSON.stringify(p.variants),
      tags: JSON.stringify(p.tags),
      collectionHandles: JSON.stringify(p.collectionHandles),
    }).onConflictDoUpdate({
      target: schema.products.id,
      set: {
        title: p.title,
        description: p.description,
        priceAmount: Math.round(p.price.amount * 100),
        priceCurrency: p.price.currency,
        compareAtPriceAmount: p.compareAtPrice ? Math.round(p.compareAtPrice.amount * 100) : null,
        compareAtPriceCurrency: p.compareAtPrice ? p.compareAtPrice.currency : null,
        images: JSON.stringify(p.images),
        variants: JSON.stringify(p.variants),
        tags: JSON.stringify(p.tags),
        collectionHandles: JSON.stringify(p.collectionHandles),
        updatedAt: Math.floor(Date.now() / 1000),
      }
    });
  }
  console.log(`✓ Inserted ${catalog.products.length} products`);

  console.log('✅ Local database seeded successfully!');
  process.exit(0);
}

// Main
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--sql')) {
    // Generate SQL file for D1
    const sql = await generateSeedSQL();
    const fs = await import('fs');
    fs.writeFileSync('scripts/seed.sql', sql);
    console.log('✅ Generated scripts/seed.sql');
    console.log('Run: wrangler d1 execute kitchenhub-db --file=./scripts/seed.sql');
  } else {
    // Seed local database
    await seedLocal();
  }
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});