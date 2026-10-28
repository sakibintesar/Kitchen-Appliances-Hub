/**
 * Provider-agnostic commerce types.
 * Every provider (mock, Shopify, Medusa) maps its API into these shapes,
 * so pages and components never import provider-specific code.
 */

export interface Money {
  amount: number;
  currency: string; // ISO 4217, e.g. "BDT", "USD"
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  title: string; // e.g. "M / Black"
  price: Money;
  available: boolean;
}

export interface Product {
  id: string;
  handle: string; // URL slug
  title: string;
  description: string;
  images: ProductImage[];
  price: Money; // min variant price
  compareAtPrice?: Money; // for "sale" badges
  variants: ProductVariant[];
  tags: string[];
  collectionHandles: string[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ProductImage;
}

export interface CartLine {
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  image?: ProductImage;
  price: Money;
  quantity: number;
}

/** Bangladesh-specific payment methods */
export type BDPaymentMethod = 
  | 'cod'           // Cash on Delivery
  | 'sslcommerz'    // SSLCommerz gateway (bKash, Nagad, Rocket, Card, Bank)
  | 'bkash'         // bKash direct
  | 'nagad'         // Nagad direct
  | 'rocket';       // Rocket direct

/** Checkout session result */
export interface CheckoutSession {
  success: boolean;
  sessionId?: string;
  sessionUrl?: string;      // For SSLCommerz redirect
  paymentUrl?: string;      // For direct bKash/Nagad deep links
  orderId: number;
  orderNumber: string;
  paymentMethod: BDPaymentMethod;
  whatsappSent?: boolean;
}

/** Contract every commerce provider implements. */
export interface CommerceProvider {
  listProducts(opts?: { collection?: string; limit?: number }): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  listCollections(): Promise<Collection[]>;
  getCollection(handle: string): Promise<Collection | null>;
  /** Returns the URL to send the buyer to for checkout. */
  checkoutUrl(lines: CartLine[]): Promise<string>;
}

/** Order status for BD market */
export type BDOrderStatus = 
  | 'pending'           // COD order placed, awaiting confirmation
  | 'pending_payment'   // MFS order placed, awaiting payment
  | 'confirmed'         // COD confirmed by admin / MFS payment received
  | 'processing'        // Order being prepared
  | 'shipped'           // Out for delivery
  | 'delivered'         // Completed
  | 'cancelled'         // Cancelled
  | 'returned';         // Returned

/** WhatsApp message templates */
export interface WhatsAppTemplate {
  name: string;
  language: string; // e.g. 'en', 'bn'
  components: WhatsAppComponent[];
}

export interface WhatsAppComponent {
  type: 'header' | 'body' | 'footer' | 'button';
  text?: string;
  parameters?: WhatsAppParameter[];
}

export interface WhatsAppParameter {
  type: 'text' | 'currency' | 'date_time';
  text?: string;
  currency?: { fallback_value: string; code: string; amount_1000: number };
  date_time?: { fallback_value: string };
}
