// Write pages.ts using require('fs') - CommonJS
const fs = require('fs');

const pagesContent = `/** 
 * All page copy lives here. One section — one object.
 */
import { SITE } from './components';

export const HOME = {
  meta: {},
  hero: {
    title: 'Craft your culinary masterpiece.',
    text: 'Professional-grade appliances from the world\\'s most respected brands. Wolf ranges, Sub-Zero refrigeration, Miele dishwashers, La Marzocco espresso — engineered for the home chef who demands excellence.',
    ctaPrimary: { label: 'Shop Cooking', href: '/collections/cooking' },
    ctaSecondary: { label: 'Explore Refrigeration', href: '/collections/refrigeration' },
    note: 'Free shipping on orders over $500. White-glove delivery & installation available.',
    image: { src: '/products/hero-wolf-range.jpg', alt: 'Wolf 36-inch Dual Fuel Range in professional kitchen setting' },
  },
  themeBar: {
    text: 'KitchenHub — Curated premium appliances for the discerning chef.',
    cta: { label: 'View All Brands', href: '/brands' },
    cta2: { label: 'Design Services', href: '/design-services' },
  },
  collections: { title: 'Shop by Collection' },
  products: { title: 'Featured Appliances', countLabel: 'products' },
  values: [
    { title: 'Professional Heritage', text: 'Brands trusted in Michelin-starred kitchens worldwide. The same performance, engineered for home.' },
    { title: 'White-Glove Delivery', text: 'Scheduled delivery, professional installation, and packaging removal. We treat your home with care.' },
    { title: 'Lifetime Support', text: 'Expert consultation, warranty registration, and dedicated service network. We\\'re here for the long haul.' },
  ],
  quote: {
    text: '\\"The Wolf range changed how I cook. The precision, the power — it\\'s restaurant quality at home. Worth every penny.\\"',
    author: 'Marcus V., Executive Chef & Homeowner',
  },
  colophon: {
    eyebrow: 'KitchenHub — Professional Kitchen Appliances',
    title: 'Your kitchen deserves the best.',
    text: 'We curate only the finest appliances from brands that define the category. No compromises, no mass-market fillers. Just professional-grade tools for the passionate home chef.',
    ctaPrimary: { label: 'Shop All Appliances', href: '/collections' },
    ctaSecondary: { label: 'Schedule a Consultation', href: '/design-services' },
    ctaThemes: { label: 'Trade Program', href: '/trade' },
    stack: [
      { strong: 'Wolf', text: '— Legendary ranges & ovens' },
      { strong: 'Sub-Zero', text: '— The gold standard in refrigeration' },
      { strong: 'Miele', text: '— German-engineered dishwashers & coffee' },
      { strong: 'La Marzocco', text: '— Commercial espresso at home' },
    ],
    env: { prefix: '', value: '', copyValue: '', copiedLabel: '' },
  },
} as const;

export const COLLECTION = {
  metaSuffix: ' — KitchenHub',
  allTag: 'All',
  sortLabel: 'Sort',
  sortOptions: [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'title', label: 'Name A–Z' },
    { value: 'newest', label: 'Newest Arrivals' },
  ],
  emptyCollection: 'No appliances in this collection yet.',
  emptyFilter: 'No appliances match your filters.',
} as const;

export const PRODUCT = {
  breadcrumbHome: 'Home',
  optionsLegend: 'Configuration',
  addToCart: 'Add to Cart',
  addedToCart: 'Added to cart',
  quantityLabel: 'Quantity',
  variantsLabel: 'Select Configuration',
  descriptionTitle: 'Details',
  specsTitle: 'Specifications',
  shippingTitle: 'Delivery & Installation',
  shippingText: 'White-glove delivery with professional installation available. Our certified technicians will install, level, and test your appliance — and remove all packaging.',
  warrantyTitle: 'Warranty',
  warrantyText: 'Manufacturer\\'s full warranty included. Extended protection plans available at checkout.',
  relatedTitle: 'You May Also Like',
  ariaAdd: (title) => \`Add \${title} to cart\`,
  ariaFav: (title) => \`Add \${title} to favorites\`,
  ariaRemove: (title) => \`Remove \${title} from favorites\`,
  backToResults: 'Back to results',
  saleBadge: 'Sale',
  outOfStock: 'Currently Unavailable',
  notifyMe: 'Notify When Available',
} as const;
`;

fs.writeFileSync('src/constants/pages.ts', pagesContent);
console.log('Pages part 1 written');