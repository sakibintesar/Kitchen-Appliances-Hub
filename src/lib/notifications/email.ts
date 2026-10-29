/**
 * KitchenHub Email Notification Provider
 * Uses Resend API for transactional emails
 * Full HTML template with order details, items table, shipping address
 */

import { Resend } from 'resend';
import type { NotificationProvider, OrderNotificationData, NotificationResult, NotificationConfig } from './index';

export function createEmailProvider(config: NotificationConfig): NotificationProvider {
  const resend = new Resend(config.RESEND_API_KEY);
  const fromEmail = config.FROM_EMAIL || 'onboarding@resend.dev';
  const appName = config.APP_NAME || 'KitchenHub';
  const siteUrl = config.PUBLIC_SITE_URL || 'http://localhost:4321';

  return {
    name: 'email',
    async sendOrderConfirmation(data: OrderNotificationData): Promise<NotificationResult> {
      try {
        const formatCurrency = (amount: number, currency: string) => {
          if (currency === 'BDT') {
            return '\u09F3' + (amount / 100).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

        const html = buildHtmlEmail(appName, siteUrl, data, formattedItems, formattedTotal, orderUrl);
        const text = buildTextEmail(appName, siteUrl, data, formattedItems, formattedTotal, orderUrl);

        const result = await resend.emails.send({
          from: appName + ' <' + fromEmail + '>',
          to: [data.customerEmail],
          subject: 'Order Confirmed - ' + data.orderNumber + ' | ' + appName,
          html,
          text,
        });

        if (result.error) {
          console.error('[Email] Resend error:', result.error);
          return {
            success: false,
            provider: 'email',
            error: result.error.message,
          };
        }

        console.log('[Email] Order confirmation sent:', result.data?.id);
        return {
          success: true,
          provider: 'email',
          messageId: result.data?.id,
        };
      } catch (error) {
        console.error('[Email] Failed to send order confirmation:', error);
        return {
          success: false,
          provider: 'email',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  };
}

// Helper functions are in email-helpers.ts
import { buildHtmlEmail, buildTextEmail } from './email-helpers';
