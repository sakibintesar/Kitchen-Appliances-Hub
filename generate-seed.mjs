import { readFileSync, writeFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync('data/mock-catalog.json', 'utf-8'));
let sql = '';

// Collections
for (const coll of catalog.collections) {
  sql += `INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES ('${coll.handle}', '${coll.title.replace(/'/g, "''")}', '${coll.description.replace(/'/g, "''")}', '${coll.image?.src || ''}', '${coll.image?.alt || ''}', datetime('now'), datetime('now'));\n`;
}

// Products
for (const prod of catalog.products) {
  const images = JSON.stringify(prod.images).replace(/'/g, "''");
  const tags = JSON.stringify(prod.tags).replace(/'/g, "''");
  const collections = JSON.stringify(prod.collectionHandles).replace(/'/g, "''");
  const variants = JSON.stringify(prod.variants).replace(/'/g, "''");
  const compareAt = prod.compareAtPrice ? Math.round(prod.compareAtPrice.amount * 100) : 'NULL';
  const compareAtCurr = prod.compareAtPrice?.currency || 'USD';
  sql += `INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, tags, collection_handles, variants, created_at, updated_at) VALUES ('${prod.handle}', '${prod.title.replace(/'/g, "''")}', '${prod.description.replace(/'/g, "''")}', ${Math.round(prod.price.amount * 100)}, '${prod.price.currency}', ${compareAt}, '${compareAtCurr}', '${images}', '${tags}', '${collections}', '${variants}', datetime('now'), datetime('now'));\n`;
}

writeFileSync('seed.sql', sql);
console.log('Generated seed.sql with', catalog.collections.length, 'collections and', catalog.products.length, 'products');