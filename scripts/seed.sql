-- KitchenHub Seed Data
-- Generated from src/data/mock-catalog.json
-- Run: wrangler d1 execute kitchenhub-db --file=./scripts/seed.sql

INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'cooking',
      'Cooking',
      'Rice cookers, ovens, induction cookers, infrared cookers, and more.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'refrigeration',
      'Refrigeration',
      'Refrigerators and freezers.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'dishwashers',
      'Dishwashers',
      'Dishwashing appliances.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'ventilation',
      'Ventilation',
      'Range hoods and ventilation.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'small-appliances',
      'Small Appliances',
      'Mixers, blenders, kettles, toasters, air fryers, and countertop essentials.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );

INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-air-fryer-5012',
      'Miyako Miyako Air Fryer 5012',
      'Miyako Miyako Air Fryer 5012 - Air Fryer. SKU: 5012. High-quality kitchen appliance for your home.',
      1000000,
      'BDT',
      1200000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Air Fryer 5012"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Air Fryer 5012 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Air Fryer 5012 - additional view"}]',
      '[{"id":"model_f5ca1eb64b4568c25b8f6c9f-v1","title":"Default","price":{"amount":10000,"currency":"BDT"},"available":true}]',
      '["miyako","air-fryer"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-air-fryer-6012',
      'Miyako Miyako Air Fryer 6012',
      'Miyako Miyako Air Fryer 6012 - Air Fryer. SKU: 6012. High-quality kitchen appliance for your home.',
      1000000,
      'BDT',
      1200000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Air Fryer 6012"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Air Fryer 6012 - additional view"}]',
      '[{"id":"model_2e6026002be58ce20f982954-v1","title":"Default","price":{"amount":10000,"currency":"BDT"},"available":true}]',
      '["miyako","air-fryer"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-induction-cooker-105yk',
      'Miyako Miyako Induction Cooker 105YK',
      'Miyako Miyako Induction Cooker 105YK - Induction Cooker. SKU: 105YK. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Induction Cooker 105YK"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Induction Cooker 105YK - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Induction Cooker 105YK - additional view"}]',
      '[{"id":"model_cbc8ed144e2d508825eca97d-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","induction-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-infrared-cooker-102yk',
      'Miyako Miyako Infrared Cooker 102YK',
      'Miyako Miyako Infrared Cooker 102YK - Infrared Cooker. SKU: 102YK. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Infrared Cooker 102YK"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Infrared Cooker 102YK - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Infrared Cooker 102YK - additional view"}]',
      '[{"id":"model_a57f14711a36450dd8755dc8-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","infrared-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-infrared-cooker-sp11',
      'Miyako Miyako Infrared Cooker SP11',
      'Miyako Miyako Infrared Cooker SP11 - Infrared Cooker. SKU: SP11. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Infrared Cooker SP11"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Infrared Cooker SP11 - additional view"}]',
      '[{"id":"model_0a51187acc1d25242546aec6-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","infrared-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-iron-ei-140',
      'Miyako Miyako Electric Iron EI-140',
      'Miyako Miyako Electric Iron EI-140 - Electric Iron. SKU: EI-140. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Iron EI-140"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Iron EI-140 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Iron EI-140 - additional view"}]',
      '[{"id":"model_c02ecc9ad88bafaeea114ee4-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-iron"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-sandwich-maker-219-mr',
      'Miyako Miyako Sandwich Maker 219 MR',
      'Miyako Miyako Sandwich Maker 219 MR - Sandwich Maker. SKU: 219 MR. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 219 MR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 219 MR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 219 MR - additional view"}]',
      '[{"id":"model_bea23e40762ba5aa919cdf41-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","sandwich-maker"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-sandwich-maker-219-m',
      'Miyako Miyako Sandwich Maker 219 M',
      'Miyako Miyako Sandwich Maker 219 M - Sandwich Maker. SKU: 219 M. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 219 M"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 219 M - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 219 M - additional view"}]',
      '[{"id":"model_d864ce11a5222d25bfc78b16-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","sandwich-maker"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-sandwich-maker-826-3-in-1',
      'Miyako Miyako Sandwich Maker 826 (3 in 1)',
      'Miyako Miyako Sandwich Maker 826 (3 in 1) - Sandwich Maker. SKU: 826 (3 in 1). High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 826 (3 in 1)"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 826 (3 in 1) - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Sandwich Maker 826 (3 in 1) - additional view"}]',
      '[{"id":"model_451dbc4b82d0f21f85d942b0-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","sandwich-maker"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-waffle-maker-296',
      'Miyako Miyako Waffle Maker 296',
      'Miyako Miyako Waffle Maker 296 - Waffle Maker. SKU: 296. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Waffle Maker 296"}]',
      '[{"id":"model_e473c9890c8dc372518c8f5e-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","waffle-maker"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-roti-maker-rm-250',
      'Miyako Miyako Roti Maker RM-250',
      'Miyako Miyako Roti Maker RM-250 - Roti Maker. SKU: RM-250. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Roti Maker RM-250"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Roti Maker RM-250 - additional view"}]',
      '[{"id":"model_d6d5f2a05c4108277f1d6b96-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","roti-maker"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-bread-toaster-kt-420-fs',
      'Miyako Miyako Bread Toaster KT-420 FS',
      'Miyako Miyako Bread Toaster KT-420 FS - Bread Toaster. SKU: KT-420 FS. High-quality kitchen appliance for your home.',
      300000,
      'BDT',
      360000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Bread Toaster KT-420 FS"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Bread Toaster KT-420 FS - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Bread Toaster KT-420 FS - additional view"}]',
      '[{"id":"model_f6f2c00655b66c43fef38aa8-v1","title":"Default","price":{"amount":3000,"currency":"BDT"},"available":true}]',
      '["miyako","bread-toaster"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-salad-cutter-chopper-processor-fp-107a',
      'Miyako Miyako Salad Cutter / Chopper / Processor FP-107A',
      'Miyako Miyako Salad Cutter / Chopper / Processor FP-107A - Salad Cutter / Chopper / Processor. SKU: FP-107A. High-quality kitchen appliance for your home.',
      350000,
      'BDT',
      420000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Salad Cutter / Chopper / Processor FP-107A"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Salad Cutter / Chopper / Processor FP-107A - additional view"}]',
      '[{"id":"model_d68da179c86089bf1cfbb73a-v1","title":"Default","price":{"amount":3500,"currency":"BDT"},"available":true}]',
      '["miyako","salad-cutter-/-chopper-/-processor"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-flask-50hm',
      'Miyako Miyako Electric Flask 50HM',
      'Miyako Miyako Electric Flask 50HM - Electric Flask. SKU: 50HM. High-quality kitchen appliance for your home.',
      200000,
      'BDT',
      240000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Flask 50HM"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Flask 50HM - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Flask 50HM - additional view"}]',
      '[{"id":"model_2ed7cecd646350ed3f259eb5-v1","title":"Default","price":{"amount":2000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-flask"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-fireplace-room-heater-ptc-fh09yl',
      'Miyako Miyako Electric Fireplace / Room Heater PTC-FH09YL',
      'Miyako Miyako Electric Fireplace / Room Heater PTC-FH09YL - Electric Fireplace / Room Heater. SKU: PTC-FH09YL. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Fireplace / Room Heater PTC-FH09YL"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Fireplace / Room Heater PTC-FH09YL - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Fireplace / Room Heater PTC-FH09YL - additional view"}]',
      '[{"id":"model_747316507f9f32c708b35121-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-fireplace-/-room-heater"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-fireplace-room-heater-ptc-d1510yl-d',
      'Miyako Miyako Electric Fireplace / Room Heater PTC-D1510YL-D',
      'Miyako Miyako Electric Fireplace / Room Heater PTC-D1510YL-D - Electric Fireplace / Room Heater. SKU: PTC-D1510YL-D. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Fireplace / Room Heater PTC-D1510YL-D"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Fireplace / Room Heater PTC-D1510YL-D - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Fireplace / Room Heater PTC-D1510YL-D - additional view"}]',
      '[{"id":"model_d1a3343af9dd2545a00ce37b-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-fireplace-/-room-heater"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-espresso-coffee-maker-2036-bt',
      'Miyako Miyako Espresso Coffee Maker 2036 BT',
      'Miyako Miyako Espresso Coffee Maker 2036 BT - Espresso Coffee Maker. SKU: 2036 BT. High-quality kitchen appliance for your home.',
      300000,
      'BDT',
      360000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Espresso Coffee Maker 2036 BT"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Espresso Coffee Maker 2036 BT - additional view"}]',
      '[{"id":"model_8c7f43613e7f47068a7b4736-v1","title":"Default","price":{"amount":3000,"currency":"BDT"},"available":true}]',
      '["miyako","espresso-coffee-maker"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-vacuum-cleaner-227e',
      'Miyako Miyako Vacuum Cleaner 227E',
      'Miyako Miyako Vacuum Cleaner 227E - Vacuum Cleaner. SKU: 227E. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner 227E"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner 227E - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner 227E - additional view"}]',
      '[{"id":"model_3c95d540674c4a7d0dc1bc59-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","vacuum-cleaner"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-vacuum-cleaner-mvc-950-bk',
      'Miyako Miyako Vacuum Cleaner MVC-950 BK',
      'Miyako Miyako Vacuum Cleaner MVC-950 BK - Vacuum Cleaner. SKU: MVC-950 BK. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner MVC-950 BK"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner MVC-950 BK - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner MVC-950 BK - additional view"}]',
      '[{"id":"model_af79904a068c3430fb985411-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","vacuum-cleaner"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-vacuum-cleaner-mvc-1625-l',
      'Miyako Miyako Vacuum Cleaner MVC-1625 L',
      'Miyako Miyako Vacuum Cleaner MVC-1625 L - Vacuum Cleaner. SKU: MVC-1625 L. High-quality kitchen appliance for your home.',
      400000,
      'BDT',
      480000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner MVC-1625 L"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner MVC-1625 L - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Vacuum Cleaner MVC-1625 L - additional view"}]',
      '[{"id":"model_98c2c6e30d08d3c85f72801d-v1","title":"Default","price":{"amount":4000,"currency":"BDT"},"available":true}]',
      '["miyako","vacuum-cleaner"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-commercial-blender-bl-029',
      'Miyako Miyako Commercial Blender BL-029',
      'Miyako Miyako Commercial Blender BL-029 - Commercial Blender. SKU: BL-029. High-quality kitchen appliance for your home.',
      600000,
      'BDT',
      720000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-029"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-029 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-029 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-029 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-029 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-029 - additional view"}]',
      '[{"id":"model_dc15fc7be02b27b160453dd1-v1","title":"Default","price":{"amount":6000,"currency":"BDT"},"available":true}]',
      '["miyako","commercial-blender"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-commercial-blender-bl-039',
      'Miyako Miyako Commercial Blender BL-039',
      'Miyako Miyako Commercial Blender BL-039 - Commercial Blender. SKU: BL-039. High-quality kitchen appliance for your home.',
      600000,
      'BDT',
      720000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-039"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-039 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Commercial Blender BL-039 - additional view"}]',
      '[{"id":"model_784b11c354bfd2f8a84e4e1b-v1","title":"Default","price":{"amount":6000,"currency":"BDT"},"available":true}]',
      '["miyako","commercial-blender"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-oven-45l-af',
      'Miyako Miyako Electric Oven 45L (AF)',
      'Miyako Miyako Electric Oven 45L (AF) - Electric Oven. SKU: 45L (AF). High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 45L (AF)"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 45L (AF) - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 45L (AF) - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 45L (AF) - additional view"}]',
      '[{"id":"model_1fb8a0dc0d8c18ac84029a09-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-oven-50l',
      'Miyako Miyako Electric Oven 50L',
      'Miyako Miyako Electric Oven 50L - Electric Oven. SKU: 50L. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 50L"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 50L - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 50L - additional view"}]',
      '[{"id":"model_9fc9cd4171d337442612b4b1-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-oven-60l-af',
      'Miyako Miyako Electric Oven 60L (AF)',
      'Miyako Miyako Electric Oven 60L (AF) - Electric Oven. SKU: 60L (AF). High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 60L (AF)"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 60L (AF) - additional view"}]',
      '[{"id":"model_104fc758f82ad3f412e64fc4-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-microwave-oven-20l',
      'Miyako Miyako Microwave Oven 20L',
      'Miyako Miyako Microwave Oven 20L - Microwave Oven. SKU: 20L. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 20L"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 20L - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 20L - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 20L - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 20L - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 20L - additional view"}]',
      '[{"id":"model_bcff204bff4545863934f402-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","microwave-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-microwave-oven-23-ltr',
      'Miyako Miyako Microwave Oven 23 LTR',
      'Miyako Miyako Microwave Oven 23 LTR - Microwave Oven. SKU: 23 LTR. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 23 LTR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 23 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 23 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 23 LTR - additional view"}]',
      '[{"id":"model_ceda9481883b6a71a25d334a-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","microwave-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-microwave-oven-25-ltr',
      'Miyako Miyako Microwave Oven 25 LTR',
      'Miyako Miyako Microwave Oven 25 LTR - Microwave Oven. SKU: 25 LTR. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 25 LTR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 25 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 25 LTR - additional view"}]',
      '[{"id":"model_0dd46edfccf3b58f055da944-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","microwave-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-microwave-oven-30-ltr',
      'Miyako Miyako Microwave Oven 30 LTR',
      'Miyako Miyako Microwave Oven 30 LTR - Microwave Oven. SKU: 30 LTR. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 30 LTR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 30 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 30 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 30 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 30 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Microwave Oven 30 LTR - additional view"}]',
      '[{"id":"model_dfb01745ede6dfa7ee6a5b2b-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","microwave-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-convection-oven-28-ltr',
      'Miyako Miyako Convection Oven 28 LTR',
      'Miyako Miyako Convection Oven 28 LTR - Convection Oven. SKU: 28 LTR. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Convection Oven 28 LTR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Convection Oven 28 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Convection Oven 28 LTR - additional view"}]',
      '[{"id":"model_e7d979987aedf3db01b6624a-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","convection-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-curry-cooker-580t',
      'Miyako Miyako Curry Cooker 580T',
      'Miyako Miyako Curry Cooker 580T - Curry Cooker. SKU: 580T. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 580T"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 580T - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 580T - additional view"}]',
      '[{"id":"model_ebe92aac8f91b143a7086122-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","curry-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-curry-cooker-400t',
      'Miyako Miyako Curry Cooker 400T',
      'Miyako Miyako Curry Cooker 400T - Curry Cooker. SKU: 400T. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 400T"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 400T - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 400T - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 400T - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 400T - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Curry Cooker 400T - additional view"}]',
      '[{"id":"model_e94081046c07db2a112adc60-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","curry-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-rice-cooker-1180-jpn',
      'Miyako Miyako Electric Rice Cooker 1180-JPN',
      'Miyako Miyako Electric Rice Cooker 1180-JPN - Electric Rice Cooker. SKU: 1180-JPN. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1180-JPN"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1180-JPN - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1180-JPN - additional view"}]',
      '[{"id":"model_c5ce6a19845862bac3a5bf35-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-rice-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-rice-cooker-1280-jpn',
      'Miyako Miyako Electric Rice Cooker 1280-JPN',
      'Miyako Miyako Electric Rice Cooker 1280-JPN - Electric Rice Cooker. SKU: 1280-JPN. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1280-JPN"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1280-JPN - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1280-JPN - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1280-JPN - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1280-JPN - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 1280-JPN - additional view"}]',
      '[{"id":"model_0d919488d5e4fb00ea634232-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-rice-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-rice-cooker-p06',
      'Miyako Miyako Electric Rice Cooker P06',
      'Miyako Miyako Electric Rice Cooker P06 - Electric Rice Cooker. SKU: P06. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker P06"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker P06 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker P06 - additional view"}]',
      '[{"id":"model_44cb55b44cb5006f3ca2c31a-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-rice-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-rice-cooker-p2510',
      'Miyako Miyako Electric Rice Cooker P2510',
      'Miyako Miyako Electric Rice Cooker P2510 - Electric Rice Cooker. SKU: P2510. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker P2510"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker P2510 - additional view"}]',
      '[{"id":"model_18c6c22c4628cfb0f02b893c-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-rice-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-rice-cooker-515-yld',
      'Miyako Miyako Electric Rice Cooker 515 YLD',
      'Miyako Miyako Electric Rice Cooker 515 YLD - Electric Rice Cooker. SKU: 515 YLD. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 515 YLD"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 515 YLD - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Rice Cooker 515 YLD - additional view"}]',
      '[{"id":"model_9c3655fe197bfe54f85532cd-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-rice-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-oven-22-ltr',
      'Miyako Miyako Electric Oven 22 LTR',
      'Miyako Miyako Electric Oven 22 LTR - Electric Oven. SKU: 22 LTR. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 22 LTR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 22 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 22 LTR - additional view"}]',
      '[{"id":"model_8332c7207dd54740cb137880-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-oven-24-ltr',
      'Miyako Miyako Electric Oven 24 LTR',
      'Miyako Miyako Electric Oven 24 LTR - Electric Oven. SKU: 24 LTR. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 24 LTR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 24 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 24 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 24 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 24 LTR - additional view"}]',
      '[{"id":"model_7373b48d70f7b3d6ab903283-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-oven-36-ltr',
      'Miyako Miyako Electric Oven 36 LTR',
      'Miyako Miyako Electric Oven 36 LTR - Electric Oven. SKU: 36 LTR. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 36 LTR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 36 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 36 LTR - additional view"}]',
      '[{"id":"model_e9bd07dbf4537b26472feecd-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miyako-miyako-electric-oven-32-ltr',
      'Miyako Miyako Electric Oven 32 LTR',
      'Miyako Miyako Electric Oven 32 LTR - Electric Oven. SKU: 32 LTR. High-quality kitchen appliance for your home.',
      1500000,
      'BDT',
      1800000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 32 LTR"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 32 LTR - additional view"},{"src":"https://picsum.photos/800/800","alt":"Miyako Miyako Electric Oven 32 LTR - additional view"}]',
      '[{"id":"model_de6d88f3b181da889bf2c440-v1","title":"Default","price":{"amount":15000,"currency":"BDT"},"available":true}]',
      '["miyako","electric-oven"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'prestige-prestige-multifunction-electric-cooker',
      'Prestige Prestige Multifunction Electric Cooker ',
      'Prestige Prestige Multifunction Electric Cooker  - Multifunction Electric Cooker. SKU: . High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Prestige Prestige Multifunction Electric Cooker "},{"src":"https://picsum.photos/800/800","alt":"Prestige Prestige Multifunction Electric Cooker  - additional view"}]',
      '[{"id":"model_2c88c2fcd38044a96c3dc840-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["prestige","multifunction-electric-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-non-stick-casserole-size-range',
      'Kiam Kiam Non-Stick Casserole Size range',
      'Kiam Kiam Non-Stick Casserole Size range - Non-Stick Casserole. SKU: Size range. High-quality kitchen appliance for your home.',
      200000,
      'BDT',
      240000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Casserole Size range"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Casserole Size range - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Casserole Size range - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Casserole Size range - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Casserole Size range - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Casserole Size range - additional view"}]',
      '[{"id":"model_135cf9ad192e0f86401b31b6-v1","title":"Default","price":{"amount":2000,"currency":"BDT"},"available":true}]',
      '["kiam","non-stick-casserole"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-non-stick-gift-set-3-pcs',
      'Kiam Kiam Non-Stick Gift Set 3 Pcs',
      'Kiam Kiam Non-Stick Gift Set 3 Pcs - Non-Stick Gift Set. SKU: 3 Pcs. High-quality kitchen appliance for your home.',
      1000000,
      'BDT',
      1200000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 3 Pcs"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 3 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 3 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 3 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 3 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 3 Pcs - additional view"}]',
      '[{"id":"model_8d405a3b6624b192fb186176-v1","title":"Default","price":{"amount":10000,"currency":"BDT"},"available":true}]',
      '["kiam","non-stick-gift-set"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-non-stick-gift-set-5-pcs',
      'Kiam Kiam Non-Stick Gift Set 5 Pcs',
      'Kiam Kiam Non-Stick Gift Set 5 Pcs - Non-Stick Gift Set. SKU: 5 Pcs. High-quality kitchen appliance for your home.',
      1000000,
      'BDT',
      1200000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 5 Pcs"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 5 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 5 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 5 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 5 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 5 Pcs - additional view"}]',
      '[{"id":"model_3315585d13863b22aa050650-v1","title":"Default","price":{"amount":10000,"currency":"BDT"},"available":true}]',
      '["kiam","non-stick-gift-set"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-non-stick-gift-set-7-pcs',
      'Kiam Kiam Non-Stick Gift Set 7 Pcs',
      'Kiam Kiam Non-Stick Gift Set 7 Pcs - Non-Stick Gift Set. SKU: 7 Pcs. High-quality kitchen appliance for your home.',
      1000000,
      'BDT',
      1200000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 7 Pcs"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 7 Pcs - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Non-Stick Gift Set 7 Pcs - additional view"}]',
      '[{"id":"model_09568ca3b32879ad27431e76-v1","title":"Default","price":{"amount":10000,"currency":"BDT"},"available":true}]',
      '["kiam","non-stick-gift-set"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-rice-cooker-5702-8702',
      'Kiam Kiam Rice Cooker 5702 / 8702',
      'Kiam Kiam Rice Cooker 5702 / 8702 - Rice Cooker. SKU: 5702 / 8702. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 5702 / 8702"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 5702 / 8702 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 5702 / 8702 - additional view"}]',
      '[{"id":"model_739b5cbd2fcd80f83286432d-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["kiam","rice-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-rice-cooker-5704-8704',
      'Kiam Kiam Rice Cooker 5704 / 8704',
      'Kiam Kiam Rice Cooker 5704 / 8704 - Rice Cooker. SKU: 5704 / 8704. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 5704 / 8704"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 5704 / 8704 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 5704 / 8704 - additional view"}]',
      '[{"id":"model_218a446bb900e10ff468cec0-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["kiam","rice-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-rice-cooker-302-304',
      'Kiam Kiam Rice Cooker 302 / 304',
      'Kiam Kiam Rice Cooker 302 / 304 - Rice Cooker. SKU: 302 / 304. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 302 / 304"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 302 / 304 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Rice Cooker 302 / 304 - additional view"}]',
      '[{"id":"model_aaeff20aa0ca861a8f5042c3-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["kiam","rice-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-induction-cooker-h77',
      'Kiam Kiam Induction Cooker H77',
      'Kiam Kiam Induction Cooker H77 - Induction Cooker. SKU: H77. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Induction Cooker H77"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Induction Cooker H77 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Induction Cooker H77 - additional view"}]',
      '[{"id":"model_9361aca37fb1b2e4ea8295d0-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["kiam","induction-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-induction-cooker-h22',
      'Kiam Kiam Induction Cooker H22',
      'Kiam Kiam Induction Cooker H22 - Induction Cooker. SKU: H22. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Induction Cooker H22"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Induction Cooker H22 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Induction Cooker H22 - additional view"}]',
      '[{"id":"model_0b524d3ac782c8881aff417a-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["kiam","induction-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-infrared-cooker-h10',
      'Kiam Kiam Infrared Cooker H10',
      'Kiam Kiam Infrared Cooker H10 - Infrared Cooker. SKU: H10. High-quality kitchen appliance for your home.',
      800000,
      'BDT',
      960000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Infrared Cooker H10"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Infrared Cooker H10 - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Infrared Cooker H10 - additional view"}]',
      '[{"id":"model_9b7ef6b5d072b6fe3e0370da-v1","title":"Default","price":{"amount":8000,"currency":"BDT"},"available":true}]',
      '["kiam","infrared-cooker"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-mixer-grinder-750w',
      'Kiam Kiam Mixer Grinder 750W',
      'Kiam Kiam Mixer Grinder 750W - Mixer Grinder. SKU: 750W. High-quality kitchen appliance for your home.',
      600000,
      'BDT',
      720000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 750W"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 750W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 750W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 750W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 750W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 750W - additional view"}]',
      '[{"id":"model_2ce4a70b3f9bd493b33273d6-v1","title":"Default","price":{"amount":6000,"currency":"BDT"},"available":true}]',
      '["kiam","mixer-grinder"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-mixer-grinder-850w',
      'Kiam Kiam Mixer Grinder 850W',
      'Kiam Kiam Mixer Grinder 850W - Mixer Grinder. SKU: 850W. High-quality kitchen appliance for your home.',
      600000,
      'BDT',
      720000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 850W"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 850W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 850W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 850W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 850W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 850W - additional view"}]',
      '[{"id":"model_9b3d301e80377c7acacb7957-v1","title":"Default","price":{"amount":6000,"currency":"BDT"},"available":true}]',
      '["kiam","mixer-grinder"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-mixer-grinder-1000w',
      'Kiam Kiam Mixer Grinder 1000W',
      'Kiam Kiam Mixer Grinder 1000W - Mixer Grinder. SKU: 1000W. High-quality kitchen appliance for your home.',
      600000,
      'BDT',
      720000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1000W"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1000W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1000W - additional view"}]',
      '[{"id":"model_31d2bbfaee5fa2b0258a9eaf-v1","title":"Default","price":{"amount":6000,"currency":"BDT"},"available":true}]',
      '["kiam","mixer-grinder"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-mixer-grinder-1200w',
      'Kiam Kiam Mixer Grinder 1200W',
      'Kiam Kiam Mixer Grinder 1200W - Mixer Grinder. SKU: 1200W. High-quality kitchen appliance for your home.',
      600000,
      'BDT',
      720000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1200W"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1200W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1200W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1200W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1200W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1200W - additional view"}]',
      '[{"id":"model_5e30655e2aae721295fc6553-v1","title":"Default","price":{"amount":6000,"currency":"BDT"},"available":true}]',
      '["kiam","mixer-grinder"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-mixer-grinder-1500w',
      'Kiam Kiam Mixer Grinder 1500W',
      'Kiam Kiam Mixer Grinder 1500W - Mixer Grinder. SKU: 1500W. High-quality kitchen appliance for your home.',
      600000,
      'BDT',
      720000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1500W"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1500W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1500W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1500W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1500W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1500W - additional view"}]',
      '[{"id":"model_cc42ee4fbc0bc9857fa1ee02-v1","title":"Default","price":{"amount":6000,"currency":"BDT"},"available":true}]',
      '["kiam","mixer-grinder"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kiam-kiam-mixer-grinder-1800w',
      'Kiam Kiam Mixer Grinder 1800W',
      'Kiam Kiam Mixer Grinder 1800W - Mixer Grinder. SKU: 1800W. High-quality kitchen appliance for your home.',
      600000,
      'BDT',
      720000,
      'BDT',
      '[{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1800W"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1800W - additional view"},{"src":"https://picsum.photos/800/800","alt":"Kiam Kiam Mixer Grinder 1800W - additional view"}]',
      '[{"id":"model_d276c247ad1326856792585c-v1","title":"Default","price":{"amount":6000,"currency":"BDT"},"available":true}]',
      '["kiam","mixer-grinder"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
