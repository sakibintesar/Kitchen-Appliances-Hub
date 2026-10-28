/**
 * WhatsApp Business API Integration
 * For order notifications, payment reminders, delivery updates
 * 
 * Uses Meta Cloud API (recommended) or On-premise API
 * Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
 */

export interface WhatsAppConfig {
  phoneNumberId: string;
  accessToken: string;
  apiVersion?: string;
  baseUrl?: string;
}

export interface WhatsAppMessage {
  messaging_product: 'whatsapp';
  to: string;
  type: 'template' | 'text' | 'image' | 'document' | 'interactive';
  template?: WhatsAppTemplateMessage;
  text?: { body: string; preview_url?: boolean };
  image?: { link: string; caption?: string };
  document?: { link: string; caption?: string; filename?: string };
  interactive?: WhatsAppInteractiveMessage;
}

export interface WhatsAppTemplateMessage {
  name: string;
  language: { code: string; policy?: 'deterministic' };
  components?: WhatsAppTemplateComponent[];
}

export interface WhatsAppTemplateComponent {
  type: 'header' | 'body' | 'footer' | 'button';
  parameters?: WhatsAppTemplateParameter[];
  sub_type?: 'url' | 'quick_reply';
  index?: string;
}

export interface WhatsAppTemplateParameter {
  type: 'text' | 'currency' | 'date_time' | 'image' | 'document' | 'video';
  text?: string;
  currency?: { fallback_value: string; code: string; amount_1000: number };
  date_time?: { fallback_value: string };
  image?: { link: string };
  document?: { link: string; filename?: string };
  video?: { link: string };
}

export interface WhatsAppInteractiveMessage {
  type: 'button' | 'list' | 'cta_url' | 'flow';
  header?: { type: 'text' | 'image' | 'document' | 'video'; text?: string; link?: string };
  body: { text: string };
  footer?: { text: string };
  action: {
    buttons?: WhatsAppButton[];
    button?: string;
    sections?: WhatsAppListSection[];
    name?: string;
    parameters?: any;
  };
}

export interface WhatsAppButton {
  type: 'reply' | 'url';
  reply?: { id: string; title: string };
  url?: { url: string; title: string };
}

export interface WhatsAppListSection {
  title: string;
  rows: Array<{ id: string; title: string; description?: string }>;
}

export interface WhatsAppResponse {
  messaging_product: 'whatsapp';
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string }>;
}

export interface WhatsAppError {
  error: {
    message: string;
    type: string;
    code: number;
    error_data?: { details: string };
    fbtrace_id: string;
  };
}

export const WHATSAPP_TEMPLATES = {
  ORDER_CONFIRMED: 'order_confirmed',
  ORDER_PAYMENT_REMINDER: 'payment_reminder',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_CANCELLED: 'order_cancelled',
  WELCOME: 'welcome',
} as const;

export class WhatsAppService {
  private config: Required<WhatsAppConfig>;

  constructor(config: WhatsAppConfig) {
    this.config = {
      phoneNumberId: config.phoneNumberId,
      accessToken: config.accessToken,
      apiVersion: config.apiVersion || 'v20.0',
      baseUrl: config.baseUrl || 'https://graph.facebook.com',
    };
  }

  private async request<T>(endpoint: string, body: any): Promise<T> {
    const url = `${this.config.baseUrl}/${this.config.apiVersion}/${this.config.phoneNumberId}/messages`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      const error = data as WhatsAppError;
      throw new Error(`WhatsApp API Error: ${error.error.message} (code: ${error.error.code})`);
    }

    return data as T;
  }

  async sendTemplate(
    to: string,
    templateName: string,
    languageCode: string,
    components?: WhatsAppTemplateComponent[]
  ): Promise<WhatsAppResponse> {
    const message: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to: this.formatPhoneNumber(to),
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode, policy: 'deterministic' },
        components,
      },
    };

    return this.request<WhatsAppResponse>('messages', message);
  }

  async sendText(to: string, body: string): Promise<WhatsAppResponse> {
    const message: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to: this.formatPhoneNumber(to),
      type: 'text',
      text: { body, preview_url: true },
    };

    return this.request<WhatsAppResponse>('messages', message);
  }

  async sendOrderConfirmation(params: {
    to: string;
    orderNumber: string;
    customerName: string;
    totalAmount: number;
    currency: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    paymentMethod: 'cod' | 'sslcommerz' | 'bkash' | 'nagad' | 'rocket';
    paymentUrl?: string;
    estimatedDelivery?: string;
    trackingUrl?: string;
  }): Promise<WhatsAppResponse> {
    const currency = params.currency || 'BDT';
    const amountDisplay = (params.totalAmount / 100).toLocaleString('en-BD', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    });

    // Build items summary with prices
    const itemsSummary = params.items
      .map(item => `${item.name} × ${item.quantity} — ${(item.price / 100).toLocaleString('en-BD', { style: 'currency', currency, minimumFractionDigits: 2 })}`)
      .join('\n');

    const components: WhatsAppTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: params.customerName },
          { type: 'text', text: params.orderNumber },
          { type: 'text', text: amountDisplay },
          { type: 'text', text: itemsSummary },
          { type: 'text', text: params.estimatedDelivery || '2-3 business days' },
        ],
      },
    ];

    // Add payment button for non-COD orders
    if (params.paymentMethod !== 'cod' && params.paymentUrl) {
      components.push({
        type: 'button',
        sub_type: 'url',
        index: '0',
        parameters: [{ type: 'text', text: params.paymentUrl }],
      });
    }

    // Add tracking button if tracking URL is provided
    if (params.trackingUrl) {
      const buttonIndex = components.length === 1 ? '0' : '1';
      components.push({
        type: 'button',
        sub_type: 'url',
        index: buttonIndex,
        parameters: [{ type: 'text', text: params.trackingUrl }],
      });
    }

    return this.sendTemplate(
      params.to,
      WHATSAPP_TEMPLATES.ORDER_CONFIRMED,
      'en',
      components
    );
  }

  async sendPaymentReminder(params: {
    to: string;
    orderNumber: string;
    customerName: string;
    totalAmount: number;
    currency: string;
    paymentUrl: string;
    expiresAt: Date;
  }): Promise<WhatsAppResponse> {
    const amountDisplay = (params.totalAmount / 100).toLocaleString('en-BD', {
      style: 'currency',
      currency: params.currency,
      minimumFractionDigits: 2,
    });

    const components: WhatsAppTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: params.customerName },
          { type: 'text', text: params.orderNumber },
          { type: 'text', text: amountDisplay },
          { type: 'text', text: params.expiresAt.toLocaleString('en-BD') },
        ],
      },
      {
        type: 'button',
        sub_type: 'url',
        index: '0',
        parameters: [{ type: 'text', text: params.paymentUrl }],
      },
    ];

    return this.sendTemplate(
      params.to,
      WHATSAPP_TEMPLATES.ORDER_PAYMENT_REMINDER,
      'en',
      components
    );
  }

  async sendShippedNotification(params: {
    to: string;
    orderNumber: string;
    customerName: string;
    trackingNumber: string;
    courier: string;
    trackingUrl: string;
  }): Promise<WhatsAppResponse> {
    const components: WhatsAppTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: params.customerName },
          { type: 'text', text: params.orderNumber },
          { type: 'text', text: params.courier },
          { type: 'text', text: params.trackingNumber },
        ],
      },
      {
        type: 'button',
        sub_type: 'url',
        index: '0',
        parameters: [{ type: 'text', text: params.trackingUrl }],
      },
    ];

    return this.sendTemplate(
      params.to,
      WHATSAPP_TEMPLATES.ORDER_SHIPPED,
      'en',
      components
    );
  }

  async sendDeliveredNotification(params: {
    to: string;
    orderNumber: string;
    customerName: string;
  }): Promise<WhatsAppResponse> {
    const components: WhatsAppTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: params.customerName },
          { type: 'text', text: params.orderNumber },
        ],
      },
    ];

    return this.sendTemplate(
      params.to,
      WHATSAPP_TEMPLATES.ORDER_DELIVERED,
      'en',
      components
    );
  }

  formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.slice(1);
    }
    
    if (cleaned.startsWith('880')) {
      return cleaned;
    }
    
    if (cleaned.startsWith('0')) {
      return '880' + cleaned.slice(1);
    }
    
    return cleaned;
  }

  static verifyWebhookSignature(
    payload: string,
    signature: string,
    appSecret: string
  ): boolean {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }
}

export function createWhatsAppService(env: {
  WHATSAPP_PHONE_NUMBER_ID: string;
  WHATSAPP_ACCESS_TOKEN: string;
  WHATSAPP_API_VERSION?: string;
}): WhatsAppService {
  return new WhatsAppService({
    phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID,
    accessToken: env.WHATSAPP_ACCESS_TOKEN,
    apiVersion: env.WHATSAPP_API_VERSION,
  });
}