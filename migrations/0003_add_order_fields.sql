-- Add shipping_method to orders table
ALTER TABLE orders ADD COLUMN shipping_method TEXT DEFAULT 'standard';