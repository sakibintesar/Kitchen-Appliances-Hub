/**
 * D1 Database Schema for KitchenHub
 * Run migrations with: npx wrangler d1 execute kitchenhub-db --file=./src/db/schema.sql
 */
import { and, eq, sql } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export { and, eq, sql };

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  emailVerifyToken: text('email_verify_token'),
  emailVerifyExpires: integer('email_verify_expires'),
  passwordResetToken: text('password_reset_token'),
  passwordResetExpires: integer('password_reset_expires'),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(), // handle/slug
  title: text('title').notNull(),
  description: text('description').notNull(),
  priceAmount: integer('price_amount').notNull(), // in cents
  priceCurrency: text('price_currency').notNull().default('USD'),
  compareAtPriceAmount: integer('compare_at_price_amount'),
  compareAtPriceCurrency: text('compare_at_price_currency').default('USD'),
  images: text('images').notNull(), // JSON array of {src, alt}
  tags: text('tags').notNull().default('[]'), // JSON array
  collectionHandles: text('collection_handles').notNull().default('[]'), // JSON array
  variants: text('variants').notNull().default('[]'), // JSON array
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
});

export const collections = sqliteTable('collections', {
  id: text('id').primaryKey(), // handle/slug
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageSrc: text('image_src'),
  imageAlt: text('image_alt'),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
});

export const carts = sqliteTable('carts', {
  id: text('id').primaryKey(), // session ID or user ID
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  sessionId: text('session_id'),
  lines: text('lines').notNull().default('[]'), // JSON array of CartLine
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
});

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  sessionId: text('session_id'),
  email: text('email').notNull(),
  name: text('name').notNull(),
  phone: text('phone'), // Customer phone for WhatsApp notifications
  status: text('status').notNull().default('pending'), // pending, pending_payment, confirmed, payment_failed, fulfilled, cancelled
  totalAmount: integer('total_amount').notNull(),
  currency: text('currency').notNull().default('USD'),
  lines: text('lines').notNull(), // JSON array of CartLine
  shippingAddress: text('shipping_address'), // JSON
  billingAddress: text('billing_address'), // JSON
  paymentMethod: text('payment_method'), // cod, sslcommerz, bkash, nagad, rocket
  paymentIntentId: text('payment_intent_id'), // Stripe payment intent or SSLCommerz tran_id
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
});

export const favorites = sqliteTable('favorites', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  sessionId: text('session_id'),
  productHandle: text('product_handle').notNull(),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
}, (table) => [
  uniqueIndex('favorites_user_product_idx').on(table.userId, table.productHandle),
  uniqueIndex('favorites_session_product_idx').on(table.sessionId, table.productHandle),
]);

export const addresses = sqliteTable('addresses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  company: text('company'),
  address1: text('address1').notNull(),
  address2: text('address2'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  postalCode: text('postal_code').notNull(),
  country: text('country').notNull().default('US'),
  isDefault: integer('is_default', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
});