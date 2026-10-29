/**
 * KitchenHub Notification System
 * Dual-channel: Email (Resend) + WhatsApp (Manual Mode)
 * Manual WhatsApp: Logs formatted messages to console for copy-paste to WhatsApp Business App
 * Zero cost, zero setup, works forever
 */

export interface NotificationProvider {
  name: 'email' | 'whatsapp';
  sendOrderConfirmation(data: OrderNotificationData): Promise<NotificationResult>;
}

export interface OrderNotificationData {
  orderId: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  currency: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod: string;
  shippingAddress?: {
    address1: string;
    city: string;
    zip: string;
    country: string;
  };
  estimatedDelivery?: string;
}

export interface NotificationResult {
  success: boolean;
  provider: 'email' | 'whatsapp';
  messageId?: string;
  error?: string;
  skipped?: boolean;
  reason?: string;
}

export interface NotificationConfig {
  // Email (Resend)
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
  
  // WhatsApp Manual Mode
  WHATSAPP_MANUAL_MODE?: boolean;
  WHATSAPP_BUSINESS_NUMBER?: string;
  
  // App
  PUBLIC_SITE_URL: string;
  APP_NAME?: string;
}

// Import and re-export providers
export { createEmailProvider } from './email';
export { createWhatsAppProvider } from './whatsapp';

// Notification Manager - coordinates all providers
export class NotificationManager {
  private providers: NotificationProvider[] = [];
  private config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.config = config;
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize Email provider if configured
    if (this.config.RESEND_API_KEY) {
      const { createEmailProvider } = require('./email');
      this.providers.push(createEmailProvider(this.config));
      console.log('[Notifications] Email provider initialized');
    } else {
      console.log('[Notifications] Email provider skipped (no RESEND_API_KEY)');
    }

    // Initialize WhatsApp provider if configured
    if (this.config.WHATSAPP_MANUAL_MODE) {
      const { createWhatsAppProvider } = require('./whatsapp');
      this.providers.push(createWhatsAppProvider(this.config));
      console.log('[Notifications] WhatsApp (manual) provider initialized');
    }
  }

  async sendOrderConfirmation(data: OrderNotificationData): Promise<NotificationResult[]> {
    const results: NotificationResult[] = [];
    
    for (const provider of this.providers) {
      try {
        console.log(`[Notifications] Sending via ${provider.name}...`);
        const result = await provider.sendOrderConfirmation(data);
        results.push(result);
        if (result.success) {
          console.log(`[Notifications] ${provider.name} sent successfully (${result.messageId})`);
        } else {
          console.error(`[Notifications] ${provider.name} failed:`, result.error);
        }
      } catch (error) {
        console.error(`[Notifications] ${provider.name} error:`, error);
        results.push({
          success: false,
          provider: provider.name,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return results;
  }

  getProviders(): string[] {
    return this.providers.map(p => p.name);
  }
}

// Factory function
export function createNotificationManager(config: NotificationConfig): NotificationManager {
  return new NotificationManager(config);
}