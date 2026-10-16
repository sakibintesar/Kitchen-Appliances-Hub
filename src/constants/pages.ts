/**
 * All page copy lives here. One section — one object.
 * Fields ending in *Html are injected via set:html (they contain links/code) — edit carefully.
 */
import { SITE } from './components';

export const HOME = {
  meta: {
    // empty = defaults from SITE (Layout fills them in)
  },
  hero: {
    title: 'Craft your culinary masterpiece.',
    text: 'Professional-grade appliances from the world\'s most respected brands. Wolf ranges, Sub-Zero refrigeration, Miele dishwashers, La Marzocco espresso — engineered for the home chef who demands excellence.',
    ctaPrimary: { label: 'Shop Cooking', href: '/collections/cooking' },
    ctaSecondary: { label: 'Explore Refrigeration', href: '/collections/refrigeration' },
    note: 'Free shipping on orders over $500. White-glove delivery & installation available.',
    image: { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=1000&fit=crop', alt: 'Wolf 36-inch Dual Fuel Range in professional kitchen setting' },
  },
  themeBar: {
    text: 'KitchenHub — Curated premium appliances for the discerning chef.',
    cta: { label: 'View All Brands', href: '/brands' },
    cta2: { label: 'Design Services', href: '/design-services' },
  },
  collections: { title: 'Shop by Collection' },
  products: { title: 'Featured Appliances', countLabel: 'products' },
  values: {
    title: 'Why KitchenHub',
    items: [
      {
        title: 'Professional Heritage',
        text: 'Brands trusted in Michelin-starred kitchens worldwide. The same performance, engineered for home.',
      },
      {
        title: 'White-Glove Delivery',
        text: 'Scheduled delivery, professional installation, and packaging removal. We treat your home with care.',
      },
      {
        title: 'Lifetime Support',
        text: 'Expert consultation, warranty registration, and dedicated service network. We\'re here for the long haul.',
      },
    ],
  },
  quote: {
    text: '"The Wolf range changed how I cook. The precision, the power — it\'s restaurant quality at home. Worth every penny."',
    author: 'Marcus V., Executive Chef & Homeowner',
  },
  // Proposal Masterclass — tailored kitchen proposals by project type
  proposalMasterclass: {
    title: 'Proposal Masterclass',
    subtitle: 'Explore curated appliance proposals designed for every project type — from Michelin-starred restaurants to modern residences.',
    categories: [
      {
        id: 'restaurant',
        label: 'Fine Dining Restaurant',
        tagline: 'Michelin-grade performance for professional kitchens',
        description: 'Built for the intensity of service. Every appliance engineered for precision, speed, and reliability under the most demanding conditions.',
        heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=800&fit=crop',
        heroAlt: 'Professional restaurant kitchen with Wolf range and Sub-Zero refrigeration',
        stats: [
          { label: 'Covers per Service', value: '200+' },
          { label: 'Stations Equipped', value: '8' },
          { label: 'Uptime Guarantee', value: '99.9%' },
        ],
        appliances: [
          { name: 'Wolf 60" Gas Range', model: 'GR606CG', price: 24999, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' },
          { name: 'Sub-Zero Pro 48" Refrigerator', model: 'PRO4850', price: 18999, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop' },
          { name: 'Miele Combi-Steam Oven', model: 'DGC7840', price: 8499, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
          { name: 'Meiko Hood-Type Dishwasher', model: 'M-iQ', price: 15999, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' },
        ],
        totalInvestment: 68496,
        cta: { label: 'Request Restaurant Proposal', href: '/proposals/restaurant' },
      },
      {
        id: 'modern-home',
        label: 'Modern Luxury Residence',
        tagline: 'Architectural integration meets culinary excellence',
        description: 'Seamless design for open-concept living. Panel-ready, flush-mounted appliances that disappear into cabinetry while delivering uncompromising performance.',
        heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
        heroAlt: 'Modern luxury kitchen with integrated Sub-Zero and Wolf appliances',
        stats: [
          { label: 'Linear Feet', value: '36' },
          { label: 'Integrated Units', value: '6' },
          { label: 'Design Timeline', value: '12 wks' },
        ],
        appliances: [
          { name: 'Sub-Zero 36" Column Refrigerator', model: 'IC-36CI', price: 12999, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop' },
          { name: 'Sub-Zero 36" Column Freezer', model: 'IC-36FI', price: 12499, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' },
          { name: 'Wolf 36" Transitional Induction', model: 'TI36', price: 7999, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
          { name: 'Wolf 30" Convection Steam Oven', model: 'CSO30', price: 6499, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' },
          { name: 'Miele Futura Dishwasher', model: 'G7566', price: 2199, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
          { name: 'Zephyr 36" Insert Hood', model: 'AK8100BS', price: 2899, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' },
        ],
        totalInvestment: 45094,
        cta: { label: 'Request Modern Home Proposal', href: '/proposals/modern-home' },
      },
      {
        id: 'single-family',
        label: 'Single Family Estate',
        tagline: 'Generational quality for the heart of the home',
        description: 'Timeless appliances for the family that cooks together. Professional performance with approachable controls — built to last through generations of meals and memories.',
        heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop',
        heroAlt: 'Estate kitchen with La Marzocco espresso and Wolf range',
        stats: [
          { label: 'Appliance Zones', value: '4' },
          { label: 'Warranty Coverage', value: 'Lifetime' },
          { label: 'Energy Star Rated', value: '100%' },
        ],
        appliances: [
          { name: 'Wolf 48" Dual Fuel Range', model: 'DF486', price: 16999, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' },
          { name: 'Sub-Zero 48" French Door', model: 'PRO4850FD', price: 19999, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop' },
          { name: 'Miele Built-in Coffee System', model: 'CVA7840', price: 4999, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' },
          { name: 'La Marzocco Linea Micra', model: 'Micra', price: 3900, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
          { name: 'Thermador 36" Wall Hood', model: 'VCIN36JS', price: 1849, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' },
          { name: 'Cove 24" Dishwasher', model: 'CVE24', price: 2499, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
        ],
        totalInvestment: 50245,
        cta: { label: 'Request Estate Proposal', href: '/proposals/single-family' },
      },
    ],
  },
  // Lead capture / consultation section
  consultation: {
    eyebrow: 'Ready to Transform Your Kitchen?',
    title: 'Book Your Complimentary Design Consultation',
    description: 'Our kitchen specialists will assess your space, understand your cooking style, and curate a professional-grade appliance package tailored to your needs — at no obligation.',
    benefits: [
      'Personalized appliance specification sheet',
      'Space planning & ventilation guidance',
      'Exclusive trade pricing access',
      'Project timeline & budget estimation',
    ],
    ctaPrimary: { label: 'Schedule Free Consultation', href: '/design-services' },
    ctaSecondary: { label: 'Start with a Quick Quote', href: '/quick-quote' },
    trustBadges: [
      'No-pressure consultation',
      'Virtual or in-home options',
      'Trade pricing for qualified projects',
      'Dedicated project manager',
    ],
  },
  // Trust signals / guarantees
  guarantees: {
    title: 'The KitchenHub Promise',
    items: [
      {
        icon: 'shield',
        title: 'Price Match Guarantee',
        text: 'Find a lower authorized price — we\'ll match it plus 5% of the difference.',
      },
      {
        icon: 'truck',
        title: 'White-Glove Delivery',
        text: 'Scheduled 2-hour windows, professional install, packaging removal, and first-use walkthrough.',
      },
      {
        icon: 'wrench',
        title: 'Lifetime Support',
        text: 'Direct access to certified technicians, warranty concierge, and priority service scheduling.',
      },
      {
        icon: 'star',
        title: 'Curated Excellence',
        text: 'Every brand passes our 50-point performance audit. No mass-market fillers, ever.',
      },
    ],
  },
  // Newsletter / Lead capture section
  newsletter: {
    eyebrow: 'Stay Inspired',
    title: 'Join the KitchenHub Insider Circle',
    description: 'Receive exclusive access to new collections, design inspiration, chef collaborations, and private sale events — curated for the discerning home chef.',
    benefits: [
      'Early access to limited-edition releases',
      'Seasonal recipes from Michelin chefs',
      'Design trends & kitchen planning guides',
      'Invitation-only showroom events',
    ],
    placeholder: 'Enter your email address',
    buttonLabel: 'Subscribe',
    privacyText: 'No spam. Unsubscribe anytime. Your data is protected per our <a href="/privacy" class="underline hover:text-gold-400">Privacy Policy</a>.',
    trustBadges: [
      { label: '50K+', text: 'Subscribers' },
      { label: 'Weekly', text: 'Curated Editions' },
      { label: 'Zero', text: 'Spam Guarantee' },
    ],
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
    env: {
      prefix: '',
      value: '',
      copyValue: '',
      copiedLabel: '',
    },
  },
} as const;

export const COLLECTION = {
  metaSuffix: ` — ${SITE.name}`,
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
  warrantyText: 'Manufacturer\'s full warranty included. Extended protection plans available at checkout.',
  relatedTitle: 'You May Also Like',
  ariaAdd: (title: string) => `Add ${title} to cart`,
  ariaFav: (title: string) => `Add ${title} to favorites`,
  ariaRemove: (title: string) => `Remove ${title} from favorites`,
  backToResults: 'Back to results',
  saleBadge: 'Sale',
  outOfStock: 'Currently Unavailable',
  notifyMe: 'Notify When Available',
  accordion: [
    { title: 'Description', text: 'Premium appliance crafted for the modern kitchen. Designed for performance, durability, and timeless style.' },
    { title: 'Specifications', text: 'Detailed technical specifications available upon request. Contact our specialists for complete specification sheets.' },
    { title: 'Delivery & Installation', text: 'White-glove delivery with professional installation available. Our certified technicians will install, level, and test your appliance — and remove all packaging.' },
    { title: 'Warranty', text: "Manufacturer's full warranty included. Extended protection plans available at checkout." },
  ],
} as const;

export const CART_PAGE = {
  meta: { title: 'Cart — KitchenHub', description: 'Review your selected appliances.' },
  title: 'Shopping Cart',
  emptyTitle: 'Your cart is empty.',
  emptyText: 'Your kitchen is waiting. Browse our curated collection of premium appliances.',
  emptyCta: { label: 'Start Shopping', href: '/' },
  continueLabel: 'Continue Shopping',
  checkoutLabel: 'Proceed to Checkout',
  shippingNote: 'Shipping, taxes & installation calculated at checkout.',
} as const;

export const CHECKOUT = {
  meta: { title: 'Checkout — KitchenHub', description: 'Secure checkout for your premium appliances.' },
  title: 'Checkout',
  steps: { contact: 'Contact', shipping: 'Delivery', payment: 'Payment', review: 'Review' },
  contact: {
    title: 'Contact Information',
    emailLabel: 'Email Address',
    emailPlaceholder: 'you@example.com',
  },
  shipping: {
    title: 'Delivery & Installation',
    addressLabel: 'Delivery Address',
    addressPlaceholder: '123 Culinary Lane',
    cityLabel: 'City',
    cityPlaceholder: 'Beverly Hills',
    zipLabel: 'ZIP Code',
    zipPlaceholder: '90210',
    phoneLabel: 'Phone (for delivery coordination)',
    phonePlaceholder: '(555) 123-4567',
    installOption: 'Professional Installation (+$299)',
    installDesc: 'Certified installation, leveling, testing & packaging removal.',
    whiteGloveOption: 'White-Glove Service (+$499)',
    whiteGloveDesc: 'Premium delivery with room-of-choice placement, full installation, and old appliance removal.',
  },
  payment: {
    title: 'Payment',
    cardLabel: 'Card Details',
    nameLabel: 'Name on Card',
    namePlaceholder: 'Marcus V.',
  },
  review: {
    title: 'Review Order',
    placeOrder: 'Place Order',
    processing: 'Processing…',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
  },
  success: {
    title: 'Order Confirmed',
    text: 'Thank you for your order! Your appliances are being prepared for white-glove delivery. A confirmation email with delivery scheduling has been sent.',
    orderNumberLabel: 'Order Number',
    continueShopping: 'Continue Shopping',
  },
  error: { title: 'Something went wrong', retry: 'Try Again' },
} as const;

export const ABOUT = {
  meta: {
    title: 'About — KitchenHub',
    description: 'KitchenHub curates the world\'s finest professional kitchen appliances for the discerning home chef.',
  },
  hero: {
    title: 'Where culinary passion meets professional precision.',
    paragraphs: [
      'KitchenHub was born from a simple belief: the heart of every home deserves the tools of a professional kitchen. We\'ve spent decades building relationships with the brands that define culinary excellence — Wolf, Sub-Zero, Miele, La Marzocco, and more.',
      'Our showrooms are designed for discovery. Touch the controls, feel the weight of a Wolf knob, experience the silence of a Miele dishwasher. Our culinary specialists — trained chefs themselves — are here to guide you to the perfect appliance for your cooking style.',
    ],
    image: { src: '/about/showroom.jpg', alt: 'KitchenHub showroom with Wolf range and Sub-Zero refrigerator' },
  },
  numbers: [
    { num: '40+', label: 'years of expertise' },
    { num: '12', label: 'flagship brands' },
    { num: '50k+', label: 'kitchens transformed' },
    { num: '98%', label: 'client satisfaction' },
  ],
  values: {
    eyebrow: 'Our Promise',
    title: 'Excellence in every detail.',
    items: [
      { title: 'Curated Excellence', text: 'We only carry brands we\'d put in our own kitchens. No compromises.' },
      { title: 'Chef-Guided Service', text: 'Our specialists are trained culinary professionals who understand your craft.' },
      { title: 'White-Glove Standard', text: 'From consultation to installation, every touchpoint reflects our commitment to excellence.' },
      { title: 'Lifetime Partnership', text: 'Your relationship with KitchenHub doesn\'t end at delivery — it begins there.' },
    ],
  },
  cta: {
    title: 'Ready to transform your kitchen?',
    text: 'Visit a showroom, schedule a virtual consultation, or connect with a specialist.',
    button: { label: 'Schedule Consultation', href: '/design-services' },
  },
} as const;

export const CONTACTS = {
  meta: {
    title: 'Contact — KitchenHub',
    description: 'Connect with KitchenHub for design consultations, trade inquiries, or service support.',
  },
  title: 'Let\'s create something exceptional.',
  text: 'Whether you\'re designing a dream kitchen, specifying for a project, or need expert service — our team is ready to help.',
  cards: {
    design: {
      title: 'Design Consultation',
      lines: ['Virtual or in-showroom appointments', 'Complimentary space planning', 'Product selection guidance'],
      cta: { label: 'Schedule a Consultation', href: '/design-services' },
    },
    trade: {
      title: 'Trade & Contract',
      lines: ['Architect & designer trade program', 'Builder & developer pricing', 'Project management support'],
      cta: { label: 'Join Trade Program', href: '/trade' },
    },
    service: {
      title: 'Service & Support',
      lines: ['Certified factory-trained technicians', 'Warranty & extended protection', 'Preventive maintenance plans'],
      cta: { label: 'Request Service', href: '/service' },
    },
  },
  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Chef Marcus V.',
    emailLabel: 'Email',
    emailPlaceholder: 'marcus@restaurant.com',
    phoneLabel: 'Phone',
    phonePlaceholder: '(555) 123-4567',
    projectTypeLabel: 'Project Type',
    projectTypePlaceholder: 'Select...',
    messageLabel: 'Project Details',
    messagePlaceholder: 'Tell us about your kitchen vision, timeline, and any specific appliances you\'re considering...',
    submitLabel: 'Send Inquiry',
  },
  showrooms: {
    title: 'Visit Our Showrooms',
    locations: [
      { city: 'Los Angeles', address: '8765 Melrose Ave, West Hollywood, CA 90069', hours: 'Mon–Sat 10am–7pm, Sun 11am–5pm' },
      { city: 'New York', address: '200 5th Ave, Flatiron District, NY 10010', hours: 'Mon–Sat 10am–7pm, Sun 11am–5pm' },
      { city: 'Chicago', address: '350 N Orleans St, River North, IL 60654', hours: 'Mon–Sat 10am–6pm, Sun Closed' },
      { city: 'Miami', address: '150 NE 39th St, Design District, FL 33137', hours: 'Mon–Sat 10am–7pm, Sun 11am–5pm' },
    ],
  },
} as const;

export const FAQ_PAGE = {
  meta: {
    title: 'FAQ — KitchenHub',
    description: 'Answers to common questions about KitchenHub appliances, delivery, installation, and services.',
  },
  title: 'Frequently Asked Questions',
  introHtml:
    'Quick answers to the questions we hear most. Need more detail? <a href="/contact" class="text-gold-600 underline underline-offset-2">Contact our specialists</a>.',
  items: [
    {
      q: 'What brands does KitchenHub carry?',
      a: 'We curate only the finest professional appliance brands: Wolf, Sub-Zero, Miele, La Marzocco, Thermador, Gaggenau, Cove, and more. Every brand in our collection represents the pinnacle of its category.',
    },
    {
      q: 'Do you offer design consultation services?',
      a: 'Yes. Our culinary specialists provide complimentary design consultations — virtual or in our showrooms. We\'ll help you select appliances, plan your layout, and coordinate with your architect or contractor.',
    },
    {
      q: 'What is white-glove delivery?',
      a: 'Our white-glove service includes room-of-choice delivery, professional installation, leveling, testing, and complete packaging removal. For a premium experience, our Platinum service adds old appliance removal and extended setup.',
    },
    {
      q: 'Do you install the appliances?',
      a: 'Absolutely. Our factory-certified technicians handle installation for every appliance we sell. This ensures warranty validity and optimal performance. Installation can be scheduled at purchase or later.',
    },
    {
      q: 'What warranties are included?',
      a: 'Every appliance carries the full manufacturer\'s warranty. We also offer extended protection plans up to 10 years, covering parts, labor, and preventive maintenance — all backed by our certified service network.',
    },
    {
      q: 'Is there a trade program for professionals?',
      a: 'Yes. Architects, designers, builders, and developers receive exclusive pricing, dedicated project managers, specification support, and access to our trade-only showroom events. Apply at /trade.',
    },
    {
      q: 'Can I see appliances in person before buying?',
      a: 'Our showrooms in Los Angeles, New York, Chicago, and Miami feature fully operational display kitchens. Schedule a private appointment for a guided experience with a culinary specialist.',
    },
    {
      q: 'What payment options do you accept?',
      a: 'We accept all major credit cards, wire transfers, and offer financing through our partners with 0% APR options for qualified customers. Trade accounts receive net-30 terms.',
    },
  ],
} as const;

export const ACCOUNT = {
  meta: {
    title: 'Account — KitchenHub',
    description: 'Manage your KitchenHub account, orders, and design projects.',
  },
  tabs: { login: 'Sign In', register: 'Create Account' },
  login: {
    title: 'Welcome back',
    sub: 'Access your orders, design projects, and saved appliances.',
    submit: 'Sign In',
  },
  register: {
    title: 'Create your KitchenHub account',
    sub: 'Track orders, save favorites, and manage design consultations.',
    submit: 'Create Account',
  },
  fields: {
    nameLabel: 'Full Name',
    namePlaceholder: 'Chef Marcus V.',
    emailLabel: 'Email Address',
    emailPlaceholder: 'marcus@restaurant.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    remember: 'Remember me',
    forgot: 'Forgot password?',
  },
  pageNote: 'Connect to your preferred auth provider (Shopify Customer Accounts, Firebase, Auth.js, etc.).',
} as const;

export const FAVORITES_PAGE = {
  meta: { title: 'Saved Appliances — KitchenHub', description: 'Your saved appliances for easy comparison and future reference.' },
  title: 'Saved Appliances',
  subEmpty: 'Your curated selection, ready when you are.',
  subCount: (n: number) => `${n} ${n === 1 ? 'appliance' : 'appliances'} saved for your project.`,
  empty: {
    icon: '♡',
    title: 'Nothing saved yet',
    text: 'Tap the heart on any appliance to save it for comparison or future reference.',
    cta: { label: 'Browse Appliances', href: '/' },
  },
  ariaRemove: (title: string) => `Remove ${title} from saved appliances`,
} as const;

export const NOT_FOUND = {
  meta: { title: 'Page Not Found — KitchenHub' },
  title: 'Page not found.',
  text: 'The page you\'re looking for doesn\'t exist or has been moved. Our showroom specialists can help you find what you need.',
  ctaPrimary: { label: 'Back to KitchenHub', href: '/' },
  ctaSecondary: { label: 'Schedule a Consultation', href: '/design-services' },
} as const;

export const PRIVACY = {
  meta: {
    title: 'Privacy Policy — KitchenHub',
    description: 'How KitchenHub handles your data: what we collect, why, and your rights.',
  },
  title: 'Privacy Policy',
  updated: 'Last updated: January 2025',
  sections: [
    {
      h: 'What we collect',
      p: 'Contact information (name, email, phone, address) for consultations and orders. Project details for design services. Website analytics (aggregated, anonymized) to improve your experience. Payment data is processed by our PCI-compliant partners — we never store full card details.',
    },
    {
      h: 'How we use your data',
      p: 'To schedule consultations, process orders, coordinate delivery/installation, manage warranty registrations, and communicate about your projects. We may send occasional updates about new brands, showroom events, or design inspiration — you can unsubscribe anytime.',
    },
    {
      h: 'What we never do',
      p: 'We don\'t sell your personal data. We don\'t use third-party advertising trackers. We don\'t share your project details without consent. Your trust is our most valuable asset.',
    },
    {
      h: 'Payments',
      p: 'All payments are processed by PCI-DSS certified partners (Stripe, Shopify Payments, or bank transfer). We receive only transaction confirmation — never full card numbers or sensitive banking details.',
    },
    {
      h: 'Data retention',
      p: 'Order and project records: 7 years for warranty and tax purposes. Consultation notes: 3 years unless you request deletion. Marketing preferences: until you unsubscribe. Analytics data: 26 months (aggregated).',
    },
    {
      h: 'Your rights',
      p: 'Access, correct, or delete your data at any time. Opt out of marketing. Request data portability. Contact privacy@kitchenhub.com — we respond within 30 days (usually much faster).',
    },
    {
      h: 'Cookies & analytics',
      p: 'We use essential cookies for cart/functionality and optional analytics (Google Analytics 4, anonymized IP). No advertising cookies. Manage preferences in our cookie banner or browser settings.',
    },
  ],
} as const;

export const TERMS = {
  meta: {
    title: 'Terms of Service — KitchenHub',
    description: 'Terms and conditions for KitchenHub purchases, design services, and showroom visits.',
  },
  title: 'Terms of Service',
  updated: 'Last updated: January 2025',
  sections: [
    {
      h: 'Orders & Pricing',
      p: 'All prices are in USD and subject to change before order confirmation. Appliance availability confirmed at time of order. Custom/special-order items require 50% deposit and are non-returnable. Price matching available for identical in-stock items from authorized dealers.',
    },
    {
      h: 'Delivery & Installation',
      p: 'Standard delivery: curbside, scheduled 2-week window. White-glove: room-of-choice, installation, leveling, testing, packaging removal. Platinum: adds old appliance removal. Installation requires clear access, appropriate electrical/gas/plumbing connections. Delays due to site conditions may incur additional charges.',
    },
    {
      h: 'Returns & Refunds',
      p: 'Standard appliances: 30-day return for refund (less 15% restocking + return shipping). Appliances must be unused, in original packaging. Custom/special-order, built-in, and clearance items: final sale. Damaged/defective items: full replacement at our expense. Refunds issued to original payment method within 10 business days of receipt.',
    },
    {
      h: 'Warranty & Service',
      p: 'All appliances include full manufacturer warranty (typically 2 years parts/labor, 5 years sealed system for refrigeration). Extended plans available. Service by factory-certified technicians only — unauthorized service voids warranty. Loaner appliances available for warranty repairs exceeding 5 business days.',
    },
    {
      h: 'Design Services',
      p: 'Complimentary consultations include space planning and product selection. Detailed CAD renderings, specification packages, and contractor coordination available as paid services. Design fees credited toward appliance purchase over $25,000.',
    },
    {
      h: 'Trade Program',
      p: 'Trade pricing requires approved application. Minimum annual volume applies. Accounts subject to annual review. Trade pricing not combinable with promotional offers. Net-30 terms available with credit approval.',
    },
    {
      h: 'Limitation of Liability',
      p: 'KitchenHub\'s liability limited to purchase price of affected items. Not liable for indirect, consequential, or incidental damages (construction delays, food loss, etc.). Some jurisdictions may not allow these limitations.',
    },
    {
      h: 'Governing Law',
      p: 'These terms governed by California law. Disputes resolved in Los Angeles County courts. If any provision is unenforceable, the remainder stands.',
    },
  ],
} as const;
