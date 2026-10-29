/**
 * KitchenHub WhatsApp Notification Provider (Manual Mode)
 * Logs formatted WhatsApp messages to console for copy-paste to WhatsApp Business App
 * Zero cost, zero setup, works forever
 */

import type { NotificationProvider, OrderNotificationData, NotificationResult, NotificationConfig } from './index';

export function createWhatsAppProvider(config: NotificationConfig): NotificationProvider {
  const businessNumber = config.WHATSAPP_BUSINESS_NUMBER || '+8801XXXXXXXXX';
  const appName = config.APP_NAME || 'KitchenHub';
  const siteUrl = config.PUBLIC_SITE_URL || 'http://localhost:4321';

  return {
    name: 'whatsapp',
    async sendOrderConfirmation(data: OrderNotificationData): Promise<NotificationResult> {
      try {
        const formatCurrency = (amount: number, currency: string) => {
          if (currency === 'BDT') {
            return '৳' + (amount / 100).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }
          return '$' + (amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        const orderUrl = siteUrl + '/orders/' + data.orderId;
        const formattedTotal = formatCurrency(data.totalAmount, data.currency);
        const formattedItems = data.items.map(item => ({
          ...item,
          formattedPrice: formatCurrency(item.price, data.currency),
          formattedTotal: formatCurrency(item.price * item.quantity, data.currency),
        }));

        // Build WhatsApp message
        const message = buildWhatsAppMessage(appName, data, formattedItems, formattedTotal, orderUrl, businessNumber);

        // Log to console for manual copy-paste
        console.log('\n===========================================');
        console.log('📱 WHATSAPP MESSAGE (Manual Mode)');
        console.log('===========================================');
        console.log('To:', data.customerPhone);
        console.log('From:', businessNumber);
        console.log('---');
        console.log(message);
        console.log('===========================================\n');
        console.log('👆 Copy the above message and send via WhatsApp Business App');
        console.log('   Phone:', formatPhoneNumber(data.customerPhone));
        console.log('===========================================\n');

        return {
          success: true,
          provider: 'whatsapp',
          messageId: 'manual-' + Date.now(),
          skipped: false,
        };
      } catch (error) {
        console.error('[WhatsApp] Failed to generate message:', error);
        return {
          success: false,
          provider: 'whatsapp',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  };
}

function buildWhatsAppMessage(
  appName: string,
  data: OrderNotificationData,
  formattedItems: any[],
  formattedTotal: string,
  orderUrl: string,
  businessNumber: string
): string {
  let msg = `*${appName} - Order Confirmed* ✅\n\n`;
  msg += `*Order:* ${data.orderNumber}\n`;
  msg += `*Date:* ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n`;
  msg += `*Payment:* ${data.paymentMethod.replace('_', ' ')}\n\n`;
  msg += `*Items:*\n`;
  
  formattedItems.forEach(item => {
    msg += `• ${item.name} x${item.quantity} - ${item.formattedTotal}\n`;
  });
  
  msg += `\n*Total:* ${formattedTotal}\n\n`;
  
  if (data.shippingAddress) {
    msg += `*Shipping Address:*\n`;
    msg += `${data.customerName}\n`;
    msg += `${data.shippingAddress.address1}\n`;
    msg += `${data.shippingAddress.city} ${data.shippingAddress.zip}\n`;
    msg += `${data.shippingAddress.country}\n`;
    msg += `Phone: ${data.customerPhone}\n\n`;
  }
  
  msg += `*Contact:*\n`;
  msg += `Email: ${data.customerEmail}\n`;
  msg += `Phone: ${data.customerPhone}\n\n`;
  
  msg += `🔗 *View Order:* ${orderUrl}\n\n`;
  msg += `Thank you for shopping with ${appName}!`;
  
  return msg;
}

function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.slice(1);
  }
  
  if (cleaned.startsWith('880')) {
    return '+' + cleaned;
  }
  
  if (cleaned.startsWith('0')) {
    return '+880' + cleaned.slice(1);
  }
  
  return '+' + cleaned;
}