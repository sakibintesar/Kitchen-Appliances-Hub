-- KitchenHub Seed Data
-- Generated from src/data/mock-catalog.json
-- Run: wrangler d1 execute kitchenhub-db --file=./scripts/seed.sql

INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'cooking',
      'Cooking',
      'Professional-grade ranges, ovens, and cooktops for the serious home chef.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'refrigeration',
      'Refrigeration',
      'Built-in and freestanding refrigerators that preserve freshness with precision.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'dishwashers',
      'Dishwashers',
      'Whisper-quiet, high-capacity dishwashers with advanced cleaning technology.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'ventilation',
      'Ventilation',
      'Powerful range hoods and ventilation systems that clear the air beautifully.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO collections (id, title, description, image_src, image_alt, created_at, updated_at) VALUES (
      'small-appliances',
      'Small Appliances',
      'Countertop essentials: coffee machines, blenders, stand mixers, and more.',
      NULL,
      NULL,
      (unixepoch()),
      (unixepoch())
    );

INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'wolf-36-dual-fuel-range',
      'Wolf 36" Dual Fuel Range',
      'The iconic dual fuel range that defines professional cooking at home. Six dual-stacked sealed burners deliver precise control from 300 to 20,000 BTU. The electric convection oven with dual fans ensures even baking across all racks. Signature red knobs, stainless steel construction, and a temperature probe for perfect roasts.',
      749900,
      'USD',
      829900,
      'USD',
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Wolf 36-inch Dual Fuel Range in stainless steel with red knobs"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Wolf range oven interior showing convection fans"}]',
      '[{"id":"p1v1","title":"Natural Gas","price":{"amount":7499,"currency":"USD"},"available":true},{"id":"p1v2","title":"Liquid Propane","price":{"amount":7499,"currency":"USD"},"available":true}]',
      '["dual-fuel","professional","sale","red-knobs"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'sub-zero-36-french-door-refrigerator',
      'Sub-Zero 36" French Door Refrigerator',
      'The gold standard in food preservation. Dual refrigeration system keeps produce fresh up to 2x longer. NASA-inspired air purification scrubs ethylene and odors every 20 minutes. Stainless steel interior, soft-close doors and drawers, and a water dispenser with advanced filtration. Panel-ready for seamless cabinetry integration.',
      949900,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=800&fit=crop","alt":"Sub-Zero 36-inch French Door Refrigerator in stainless steel"},{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Sub-Zero refrigerator interior with crisper drawers"}]',
      '[{"id":"p2v1","title":"Stainless Steel","price":{"amount":9499,"currency":"USD"},"available":true},{"id":"p2v2","title":"Panel Ready","price":{"amount":9499,"currency":"USD"},"available":true}]',
      '["built-in","dual-refrigeration","air-purification","panel-ready"]',
      '["refrigeration"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miele-g7000-dishwasher',
      'Miele G 7000 Series Dishwasher',
      'The quietest dishwasher in its class at 38 dB. AutoDos with PowerDisk dispenses the perfect amount of detergent automatically. 3D+ cutlery tray, flexible baskets, and QuickPowerWash cleans a full load in 58 minutes. M Touch controls with WiFi connectivity. 20-year motor warranty.',
      189900,
      'USD',
      219900,
      'USD',
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Miele G 7000 Series Dishwasher in stainless steel"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Miele dishwasher interior with 3D+ cutlery tray"}]',
      '[{"id":"p3v1","title":"Stainless Steel","price":{"amount":1899,"currency":"USD"},"available":true},{"id":"p3v2","title":"Panel Ready","price":{"amount":1899,"currency":"USD"},"available":true},{"id":"p3v3","title":"Black Stainless","price":{"amount":1999,"currency":"USD"},"available":true}]',
      '["autodos","wifi","sale","quiet"]',
      '["dishwashers"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'thermador-36-wall-hood',
      'Thermador 36" Masterpiece Wall Hood',
      'Sculptural ventilation that performs as beautifully as it looks. 600 CFM blower with four-speed electronic control. Bloom™ HD LED lighting illuminates the cooktop with warm, natural light. Baffle filters are dishwasher-safe. WiFi-enabled for remote control and filter monitoring.',
      184900,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Thermador 36-inch Masterpiece Wall Hood in stainless steel"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Thermador hood LED lighting detail"}]',
      '[{"id":"p4v1","title":"Stainless Steel","price":{"amount":1849,"currency":"USD"},"available":true},{"id":"p4v2","title":"Black Stainless","price":{"amount":1949,"currency":"USD"},"available":true}]',
      '["wifi","bloom-lighting","baffle-filters"]',
      '["ventilation"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'la-marzocco-linea-micra',
      'La Marzocco Linea Micra Espresso Machine',
      'Commercial espresso quality in a compact footprint. Dual boiler with PID temperature control for simultaneous brewing and steaming. Saturated group head ensures thermal stability. Iconic Linea styling with stainless steel body and black accents. Plumb-in or pour-over.',
      390000,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop","alt":"La Marzocco Linea Micra Espresso Machine in stainless steel and black"},{"src":"https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=800&fit=crop","alt":"La Marzocco Linea Micra pulling a perfect espresso shot"}]',
      '[{"id":"p5v1","title":"Stainless / Black","price":{"amount":3900,"currency":"USD"},"available":true},{"id":"p5v2","title":"Stainless / White","price":{"amount":3900,"currency":"USD"},"available":false},{"id":"p5v3","title":"Black / Black","price":{"amount":4100,"currency":"USD"},"available":true}]',
      '["dual-boiler","pid","commercial-grade","espresso"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'vitamix-a3500-ascent',
      'Vitamix A3500 Ascent Series Blender',
      'The smartest blender Vitamix has ever made. Five program settings (Smoothies, Hot Soups, Dips & Spreads, Frozen Desserts, Self-Clean) with wireless connectivity that adjusts blend times for container size. 2.2 HP motor, hardened stainless steel blades, and a 64 oz low-profile container. 10-year warranty.',
      64900,
      'USD',
      71900,
      'USD',
      '[{"src":"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&h=800&fit=crop","alt":"Vitamix A3500 Ascent Series Blender in brushed stainless"},{"src":"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&h=800&fit=crop","alt":"Vitamix A3500 making a green smoothie"}]',
      '[{"id":"p6v1","title":"Brushed Stainless","price":{"amount":649,"currency":"USD"},"available":true},{"id":"p6v2","title":"Black Stainless","price":{"amount":649,"currency":"USD"},"available":true},{"id":"p6v3","title":"Copper","price":{"amount":699,"currency":"USD"},"available":true}]',
      '["smart","wireless","sale","10-year-warranty"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'kitchenaid-7qt-bowl-lift-mixer',
      'KitchenAid 7 Qt Bowl-Lift Stand Mixer',
      'The professional choice for serious bakers. 1.3 HP motor handles up to 14 dozen cookies in a single batch. 7-quart stainless steel bowl with comfortable handle. 11 speeds including fold and stir. Power hub fits 15+ attachments. Available in 20+ colors.',
      54900,
      'USD',
      59900,
      'USD',
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"KitchenAid 7 Qt Bowl-Lift Stand Mixer in empire red"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"KitchenAid mixer with pasta attachment"}]',
      '[{"id":"p7v1","title":"Empire Red","price":{"amount":549,"currency":"USD"},"available":true},{"id":"p7v2","title":"Onyx Black","price":{"amount":549,"currency":"USD"},"available":true},{"id":"p7v3","title":"Matte White","price":{"amount":549,"currency":"USD"},"available":true}]',
      '["bowl-lift","professional","sale","attachments"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'breville-smart-oven-air-fryer',
      'Breville Smart Oven Air Fryer Pro',
      'The countertop oven that replaces your toaster, air fryer, and dehydrator. 13 smart cooking functions with Element iQ® system that directs power where needed. Super convection reduces cooking time by 30%. 1 cubic foot capacity fits a 14 lb turkey or 9" x 13" pan.',
      44900,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Breville Smart Oven Air Fryer Pro in brushed stainless steel"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Breville Smart Oven with air fry basket"}]',
      '[{"id":"p8v1","title":"Brushed Stainless","price":{"amount":449,"currency":"USD"},"available":true},{"id":"p8v2","title":"Black Sesame","price":{"amount":449,"currency":"USD"},"available":true}]',
      '["air-fryer","convection","dehydrator","smart"]',
      '["small-appliances"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'wolf-30-induction-cooktop',
      'Wolf 30" Induction Cooktop',
      'Instant, precise heat with four induction zones and a bridging element for griddles. True simmer at 30 watts, rapid boil at 3700 watts. Touch controls with LED slider. Pan detection and safety lock. Black ceramic glass surface with stainless steel frame.',
      289900,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Wolf 30-inch Induction Cooktop with four zones"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Wolf induction cooktop touch controls"}]',
      '[{"id":"p9v1","title":"Black Glass / Stainless Frame","price":{"amount":2899,"currency":"USD"},"available":true}]',
      '["induction","bridging-element","true-simmer"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'sub-zero-24-wine-storage',
      'Sub-Zero 24" Wine Storage',
      'Preserve up to 147 bottles in two independent temperature zones (40-65°F). UV-resistant glass door protects from light damage. Vibration-free compressor. Soft-close shelves with natural cherry wood fronts. Active carbon filtration. Panel-ready or stainless steel.',
      489900,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Sub-Zero 24-inch Wine Storage with cherry wood shelves"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Sub-Zero wine storage dual temperature zones"}]',
      '[{"id":"p10v1","title":"Stainless Steel","price":{"amount":4899,"currency":"USD"},"available":true},{"id":"p10v2","title":"Panel Ready","price":{"amount":4899,"currency":"USD"},"available":true}]',
      '["dual-zone","uv-protection","cherry-wood","panel-ready"]',
      '["refrigeration"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'miele-30-steam-oven',
      'Miele 30" Combi-Steam Oven',
      'The ultimate healthy cooking appliance. Combine steam with convection for dishes that are crisp outside, juicy inside. MasterChef automatic programs for 100+ dishes. Wireless food probe. MultiSteam technology for even distribution. XL cavity with three rack levels. Pyrolytic self-cleaning.',
      549900,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Miele 30-inch Combi-Steam Oven in stainless steel"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Miele steam oven interior with food probe"}]',
      '[{"id":"p11v1","title":"Stainless Steel","price":{"amount":5499,"currency":"USD"},"available":true},{"id":"p11v2","title":"Graphite Grey","price":{"amount":5699,"currency":"USD"},"available":true}]',
      '["steam","convection","pyrolytic-clean","masterchef"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'thermador-36-freedom-induction',
      'Thermador 36" Freedom® Induction Cooktop',
      'The largest induction cooking surface on the market. Full-surface induction — place cookware anywhere, not just on zones. 4800W PowerBoost®. TeppanyakiPro™ and GrillPro™ zones for specialized cooking. Home Connect WiFi. Sleek black glass with sapphire touch controls.',
      499900,
      'USD',
      549900,
      'USD',
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Thermador 36-inch Freedom Induction Cooktop full surface"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Thermador Freedom induction with teppanyaki plate"}]',
      '[{"id":"p12v1","title":"Black Glass","price":{"amount":4999,"currency":"USD"},"available":true}]',
      '["full-surface","teppanyaki","wifi","sale","powerboost"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'bosch-800-series-dishwasher',
      'Bosch 800 Series Dishwasher',
      'Best-in-class cleaning with CrystalDry™ technology that transforms moisture into heat for 60% better drying. 42 dB — remarkably quiet. Third rack with adjustable tines. PrecisionWash® with intelligent sensors. Home Connect® app for remote monitoring. ENERGY STAR® certified.',
      109900,
      'USD',
      124900,
      'USD',
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Bosch 800 Series Dishwasher in stainless steel"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Bosch 800 Series third rack detail"}]',
      '[{"id":"p13v1","title":"Stainless Steel","price":{"amount":1099,"currency":"USD"},"available":true},{"id":"p13v2","title":"Black Stainless","price":{"amount":1149,"currency":"USD"},"available":true}]',
      '["crystaldry","third-rack","sale","energy-star"]',
      '["dishwashers"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'wolf-30-wall-oven',
      'Wolf 30" Single Wall Oven',
      'Professional performance in a built-in package. Dual convection with two fans for even heat distribution. 10 cooking modes including Gourmet Mode with preset recipes. Temperature probe. Soft-close door. Stainless steel interior with halogen lighting. Sabbath mode.',
      389900,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Wolf 30-inch Single Wall Oven in stainless steel"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Wolf wall oven interior with dual convection fans"}]',
      '[{"id":"p14v1","title":"Stainless Steel","price":{"amount":3899,"currency":"USD"},"available":true},{"id":"p14v2","title":"Black Stainless","price":{"amount":3999,"currency":"USD"},"available":true}]',
      '["dual-convection","gourmet-mode","temperature-probe"]',
      '["cooking"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'sub-zero-48-pro-french-door',
      'Sub-Zero 48" Pro French Door Refrigerator',
      'The ultimate preservation center. Dual refrigeration with three evaporators. Internal dispenser with sparkling water option. ClearSight™ LED lighting with theater-style fade-in. Split Climate™ intelligent cooling system. Stainless steel interior with hand-polished edges.',
      1499900,
      'USD',
      NULL,
      NULL,
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Sub-Zero 48-inch Pro French Door Refrigerator"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Sub-Zero Pro interior with ClearSight lighting"}]',
      '[{"id":"p15v1","title":"Stainless Steel","price":{"amount":14999,"currency":"USD"},"available":true},{"id":"p15v2","title":"Panel Ready","price":{"amount":14999,"currency":"USD"},"available":true}]',
      '["pro-series","dual-refrigeration","sparkling-water","clearsight"]',
      '["refrigeration"]',
      (unixepoch()),
      (unixepoch())
    );
INSERT OR REPLACE INTO products (id, title, description, price_amount, price_currency, compare_at_price_amount, compare_at_price_currency, images, variants, tags, collection_handles, created_at, updated_at) VALUES (
      'zephyr-36-roma-hood',
      'Zephyr 36" Roma Wall Hood',
      'European design meets American power. 650 CFM with ACT™ airflow control technology. ICON Touch® controls with 5-speed capacitive touch. Dual-level Bloom™ HD LED lighting. CleanAir function runs 10 minutes hourly. Baffle filters. Available in multiple widths.',
      129900,
      'USD',
      149900,
      'USD',
      '[{"src":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop","alt":"Zephyr 36-inch Roma Wall Hood in stainless steel"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop","alt":"Zephyr Roma hood ICON Touch controls"}]',
      '[{"id":"p16v1","title":"Stainless Steel","price":{"amount":1299,"currency":"USD"},"available":true},{"id":"p16v2","title":"Black Stainless","price":{"amount":1399,"currency":"USD"},"available":true},{"id":"p16v3","title":"Matte Black","price":{"amount":1399,"currency":"USD"},"available":true}]',
      '["act-technology","icon-touch","bloom-lighting","sale"]',
      '["ventilation"]',
      (unixepoch()),
      (unixepoch())
    );
