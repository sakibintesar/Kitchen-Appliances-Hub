-- Initial schema for KitchenHub (drizzle-orm)

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY, -- handle/slug
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price_amount INTEGER NOT NULL, -- in cents
  price_currency TEXT NOT NULL DEFAULT 'USD',
  compare_at_price_amount INTEGER,
  compare_at_price_currency TEXT DEFAULT 'USD',
  images TEXT NOT NULL, -- JSON array of {src, alt}
  tags TEXT NOT NULL DEFAULT '[]', -- JSON array
  collection_handles TEXT NOT NULL DEFAULT '[]', -- JSON array
  variants TEXT NOT NULL DEFAULT '[]', -- JSON array
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY, -- handle/slug
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_src TEXT,
  image_alt TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Carts table
CREATE TABLE IF NOT EXISTS carts (
  id TEXT PRIMARY KEY, -- session ID or user ID
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT,
  lines TEXT NOT NULL DEFAULT '[]', -- JSON array of CartLine
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  session_id TEXT,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, fulfilled, cancelled
  total_amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  lines TEXT NOT NULL, -- JSON array of CartLine
  shipping_address TEXT, -- JSON
  billing_address TEXT, -- JSON
  payment_intent_id TEXT, -- Stripe payment intent
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT,
  product_handle TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE(user_id, product_handle),
  UNIQUE(session_id, product_handle)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_products_collection_handles ON products(collection_handles);
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_session_id ON carts(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_session_id ON favorites(session_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_handle ON favorites(product_handle);