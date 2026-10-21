/**
 * Seed script for KitchenHub D1 database
 * Run with: npx tsx src/db/seed.ts (local) or via wrangler
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { drizzle } from 'drizzle-orm/d1';
import { products, collections } from './schema';
import { createClient } from '@libsql/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seed() {
  // Connect to local D1 database
  const client = createClient({
    url: 'file:.wrangler/state/v3/d1/kitchenhub-db.sqlite',
  });
  const db = drizzle(client);
  
  // Read mock catalog
  const catalogPath = join(__dirname, '..', '..', 'data', 'mock-catalog.json');
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));
  
  console.log('Seeding collections...');
  for (const coll of catalog.collections) {
    await db.insert(collections).values({
      id: coll.handle,
      title: coll.title,
      description: coll.description,
      imageSrc: coll.image?.src,
      imageAlt: coll.image?.alt,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: collections.id,
      set: {
        title: coll.title,
        description: coll.description,
        imageSrc: coll.image?.src,
        imageAlt: coll.image?.alt,
        updatedAt: new Date(),
      },
    });
  }
  
  console.log('Seeding products...');
  for (const prod of catalog.products) {
    await db.insert(products).values({
      id: prod.handle,
      title: prod.title,
      description: prod.description,
      priceAmount: Math.round(prod.price.amount * 100),
      priceCurrency: prod.price.currency,
      compareAtPriceAmount: prod.compareAtPrice ? Math.round(prod.compareAtPrice.amount * 100) : null,
      compareAtPriceCurrency: prod.compareAtPrice?.currency || 'USD',
      images: JSON.stringify(prod.images),
      tags: JSON.stringify(prod.tags),
      collectionHandles: JSON.stringify(prod.collectionHandles),
      variants: JSON.stringify(prod.variants),
      createdAt: new Date(),
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: products.id,
      set: {
        title: prod.title,
        description: prod.description,
        priceAmount: Math.round(prod.price.amount * 100),
        priceCurrency: prod.price.currency,
        compareAtPriceAmount: prod.compareAtPrice ? Math.round(prod.compareAtPrice.amount * 100) : null,
        compareAtPriceCurrency: prod.compareAtPrice?.currency || 'USD',
        images: JSON.stringify(prod.images),
        tags: JSON.stringify(prod.tags),
        collectionHandles: JSON.stringify(prod.collectionHandles),
        variants: JSON.stringify(prod.variants),
        updatedAt: new Date(),
      },
    });
  }
  
  console.log('Seed complete!');
  
  // Verify
  const productCount = await db.select().from(products).all();
  const collectionCount = await db.select().from(collections).all();
  console.log(`Products: ${productCount.length}, Collections: ${collectionCount.length}`);
  
  client.close();
}

// For local testing
if (import.meta.main) {
  await seed();
}

export { seed };