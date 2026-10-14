/**
 * All copy for the theme "shell": header, footer, drawers, search, modal, product card.
 * Change the copy here — component markup stays untouched.
 */

export const SITE = {
  name: 'KitchenHub',
  defaultTitle: 'KitchenHub — Professional Kitchen Appliances',
  defaultDescription:
    'Premium kitchen appliances from Wolf, Sub-Zero, Miele, Thermador, La Marzocco, Vitamix and more. Professional-grade ranges, built-in refrigeration, espresso machines, and countertop essentials.',
  logoDark: '/logo/kitchenhub-dark.svg',
  logoLight: '/logo/kitchenhub-light.svg',
  repoUrl: 'https://github.com',
  authorUrl: 'https://example.com',
  themesUrl: 'https://example.com',
} as const;

export const ANNOUNCEMENT = {
  text: 'Free shipping on orders over $500 — White-glove delivery available',
  linkLabel: 'Shop new arrivals →',
  linkHref: '/collections/cooking',
} as const;

export const HEADER = {
  navLinks: [
    { label: 'Cooking', href: '/collections/cooking' },
    { label: 'Refrigeration', href: '/collections/refrigeration' },
    { label: 'Dishwashers', href: '/collections/dishwashers' },
    { label: 'Ventilation', href: '/collections/ventilation' },
    { label: 'Small Appliances', href: '/collections/small-appliances' },
  ],
  aria: {
    search: 'Search products',
    account: 'Account',
    favorites: 'Favorites',
    theme: 'Toggle theme',
    cart: 'Open cart',
    menu: 'Open menu',
  },
} as const;

export const SEARCH = {
  placeholder: 'Search appliances…',
  escHint: 'Esc',
  emptyText: 'Nothing found — try "Wolf", "Sub-Zero", "Miele" or "espresso".',
} as const;

export const FOOTER = {
  tagline:
    'KitchenHub — Professional kitchen appliances for the discerning home chef. Curated selection from the world\'s finest brands.',
  columns: [
    {
      title: 'Shop by Category',
      links: [
        { label: 'Cooking', href: '/collections/cooking' },
        { label: 'Refrigeration', href: '/collections/refrigeration' },
        { label: 'Dishwashers', href: '/collections/dishwashers' },
        { label: 'Ventilation', href: '/collections/ventilation' },
        { label: 'Small Appliances', href: '/collections/small-appliances' },
      ],
    },
    {
      title: 'Brands',
      links: [
        { label: 'Wolf', href: '/collections/cooking?brand=wolf' },
        { label: 'Sub-Zero', href: '/collections/refrigeration?brand=sub-zero' },
        { label: 'Miele', href: '/collections/dishwashers?brand=miele' },
        { label: 'Thermador', href: '/collections/cooking?brand=thermador' },
        { label: 'La Marzocco', href: '/collections/small-appliances?brand=la-marzocco' },
        { label: 'Vitamix', href: '/collections/small-appliances?brand=vitamix' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contacts' },
        { label: 'FAQ', href: '/faq' },
        { label: 'White-Glove Delivery', href: '/delivery' },
        { label: 'Warranty Registration', href: '/warranty' },
      ],
    },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;

export const THANKS_MODAL = {
  emoji: '🎉',
  title: 'Thank you for your order!',
  text: 'Your premium appliances are being prepared for white-glove delivery. A confirmation with delivery scheduling will arrive in your inbox shortly.',
  starLabel: 'View your orders',
  starHref: '/account',
  keepLabel: 'Continue shopping',
  madeByLabel: 'Built with Astro',
  madeByHref: 'https://astro.build',
  moreLabel: 'Browse appliances →',
  moreHref: '/',
} as const;

export const CART = {
  ariaDrawer: 'Shopping cart',
  clearLabel: 'Clear all',
  ariaClear: 'Clear cart',
  ariaClose: 'Close cart',
  emptyLine1: 'Your cart is empty.',
  emptyLine2: 'Free shipping on orders over $500.',
  subtotalLabel: 'Subtotal',
  shippingNote: 'Shipping and taxes calculated at checkout. White-glove delivery available.',
  checkoutLabel: 'Checkout',
  checkoutPreparing: 'Preparing checkout…',
  checkoutFailedPrefix: 'Checkout failed: ',
} as const;

export const NAV_DRAWER = {
  ariaDrawer: 'Site navigation',
  ariaClose: 'Close menu',
  home: { label: 'Home', href: '/' },
  collections: [
    { label: 'Cooking', href: '/collections/cooking' },
    { label: 'Refrigeration', href: '/collections/refrigeration' },
    { label: 'Dishwashers', href: '/collections/dishwashers' },
    { label: 'Ventilation', href: '/collections/ventilation' },
    { label: 'Small Appliances', href: '/collections/small-appliances' },
  ],
  pages: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contacts' },
    { label: 'FAQ', href: '/faq' },
  ],
  footer: {
    builtWithLabel: 'Built with',
    libLabel: 'Astro',
    libHref: 'https://astro.build',
    starLabel: 'GitHub',
    starHref: 'https://github.com',
  },
} as const;

export const PRODUCT_CARD = {
  saleBadge: 'Sale',
  addToCart: 'Add to cart',
  ariaFav: (title: string) => `Add ${title} to favorites`,
  ariaAdd: (title: string) => `Add ${title} to cart`,
} as const;
