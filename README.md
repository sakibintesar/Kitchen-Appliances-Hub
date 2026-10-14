# KitchenHub Store

A premium kitchen appliances webstore built with Astro + Tailwind v4. Features a curated selection of high-end kitchen appliances with a sophisticated, premium design aesthetic.

## Features

- 🎨 **Premium Design** — Warm, sophisticated color palette with elegant typography
- 🛒 **Full Ecommerce** — Cart, favorites, product pages, collections
- 📱 **Responsive** — Mobile-first, works beautifully on all devices
- 🌙 **Dark Mode** — System-aware with manual toggle
- 🔍 **Search & Filter** — Client-side product filtering and sorting
- ⚡ **Fast** — Static generation, zero client framework overhead
- 🔌 **Shopify Ready** — Switch to live Shopify data with two env vars

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/       # Reusable UI components (ProductCard, etc.)
├── constants/        # All copy/content (single source of truth)
├── data/             # Mock catalog data (KitchenHub appliances)
├── layouts/          # Base layout with header, cart, footer
├── lib/commerce/     # Data provider (mock + Shopify)
├── pages/            # Astro pages (home, products, collections)
└── styles/           # Global styles + design tokens
```

## Customization

### Colors & Theme
Edit `src/styles/global.css` — design tokens use CSS custom properties for instant theming.

### Content
All copy lives in `src/constants/` — change text without touching components.

### Products
Replace `src/data/mock-catalog.json` with your catalog, or set:
```bash
COMMERCE_PROVIDER=shopify
PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
PUBLIC_SHOPIFY_STOREFRONT_TOKEN=xxxx
```

## License

MIT