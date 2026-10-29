/* * Email template builders - separated to keep main file small */

import type { OrderNotificationData } from './index';

export function buildHtmlEmail(
  appName: string,
  siteUrl: string,
  data: OrderNotificationData,
  formattedItems: any[],
  formattedTotal: string,
  orderUrl: string
): string {
  const cleanSiteUrl = siteUrl.replace(/https?:\/\//, '');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ${appName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff">
    <tr>
      <td style="padding: 40px 30px; background: linear-gradient(135deg, #1a2a2e 0%, #16213e 100%); text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px">${appName}</h1>
        <p style="margin: 8px 0 0; color: #a0a0b0; font-size: 14px">Kitchen Appliances Hub</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px 30px 10px; text-align: center;">
        <div style="display: inline-block; padding: 12px 24px; background-color: #e8f5e9; border-radius: 8px; color: #2e7d32; font-weight: 600; font-size: 16px">✓ Order Confirmed</div>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 30px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">          <tr>
            <td style="padding: 20px; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <h2 style="margin: 0; color: #1a1a2e; font-size: 18px; font-weight: 600">Order Details</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px">Order Number</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a2e; font-weight: 600; font-size: 14px">${data.orderNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px">Order Date</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a2e; font-size: 14px">${new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px">Payment Method</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a2e; font-size: 14px">${data.paymentMethod}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px">Payment Status</td>
                  <td style="padding: 8px 0; text-align: right; color: #2e7d32; font-weight: 600; font-size: 14px">${data.paymentStatus}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 20px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 12px 10px; text-align: left; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; border-bottom: 1px solid #e0e0e0">Item</th>
                  <th style="padding: 12px 10px; text-align: right; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; border-bottom: 1px solid #e0e0e0">Price</th>
                  <th style="padding: 12px 10px; text-align: right; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; border-bottom: 1px solid #e0e0e0">Qty</th>
                  <th style="padding: 12px 10px; text-align: right; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; border-bottom: 1px solid #e0e0e0">Total</th>
                </tr>
                ${formattedItems.map((item: any, index: number) => `
                  <tr${index % 2 === 0 ? '' : ' style="background-color: #fafafa"'} >
                    <td style="padding: 12px 10px; color: #1a1a2e; font-size: 14px; border-bottom: 1px solid #e0e0e0">${item.name}</td>
                    <td style="padding: 12px 10px; text-align: right; color: #1a1a2e; font-size: 14px; border-bottom: 1px solid #e0e0e0">${item.price}</td>
                    <td style="padding: 12px 10px; text-align: right; color: #1a1a2e; font-size: 14px; border-bottom: 1px solid #e0e0e0">${item.quantity}</td>
                    <td style="padding: 12px 10px; text-align: right; color: #1a1a2e; font-weight: 600; font-size: 14px; border-bottom: 1px solid #e0e0e0">${item.total}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td colspan="3" style="padding: 16px 10px 8px; text-align: right; color: #666; font-size: 14px; border-top: 2px solid #e0e0e0">Subtotal</td>
                  <td style="padding: 16px 10px 8px; text-align: right; color: #1a1a2e; font-size: 14px; border-top: 2px solid #e0e0e0">${data.subtotal}</td>
                </tr>
                <tr>
                  <td colspan="3" style="padding: 8px 10px; text-align: right; color: #666; font-size: 14px">Shipping</td>
                  <td style="padding: 8px 10px; text-align: right; color: #1a1a2e; font-size: 14px">${data.shippingCost || '৳0.00'}</td>
                </tr>
                <tr>
                  <td colspan="3" style="padding: 8px 10px 16px; text-align: right; color: #666; font-size: 14px">Tax</td>
                  <td style="padding: 8px 10px 16px; text-align: right; color: #1a1a2e; font-size: 14px">${data.tax || '৳0.00'}</td>
                </tr>
                <tr>
                  <td colspan="3" style="padding: 12px 10px; text-align: right; color: #1a1a2e; font-size: 16px; font-weight: 700; border-top: 2px solid #1a1a2e">Total</td>
                  <td style="padding: 12px 10px; text-align: right; color: #1a1a2e; font-size: 16px; font-weight: 700; border-top: 2px solid #1a1a2e">${formattedTotal}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>    ${data.shippingAddress ? `
    <tr>
      <td style="padding: 0 30px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 20px; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <h2 style="margin: 0; color: #1a1a2e; font-size: 18px; font-weight: 600">Shipping Address</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #1a1a2e; font-size: 14px; line-height: 1.6;">
              <strong>${data.shippingAddress.name}</strong><br>
              ${data.shippingAddress.street}<br>
              ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postalCode}<br>
              ${data.shippingAddress.country}<br>
              ${data.shippingAddress.phone ? `Phone: ${data.shippingAddress.phone}` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ` : ''}
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #f5f5f5;">
        <a href="${orderUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #1a2a2e 0%, #16213e 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px">View Order Details</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center; color: #999; font-size: 12px; line-height: 1.6;">
        <p style="margin: 0 0 8px">Thank you for shopping with ${appName}!</p>
        <p style="margin: 0">If you have any questions, contact us at <a href="mailto:support@${cleanSiteUrl}" style="color: #1a2a2e;">support@${cleanSiteUrl}</a></p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 30px; text-align: center; color: #aaa; font-size: 11px; border-top: 1px solid #e0e0e0;">
        © ${new Date().getFullYear()} ${appName}. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>`;
  return html;
}

export function buildTextEmail(
  appName: string,
  siteUrl: string,
  data: OrderNotificationData,
  formattedItems: any[],
  formattedTotal: string,
  orderUrl: string
): string {
  let text = `Order Confirmation - ${appName}\n\n`;
  text += `Thank you for your order!\n\n`;
  text += `Order Number: ${data.orderNumber}\n`;
  text += `Order Date: ${new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n`;
  text += `Payment Method: ${data.paymentMethod}\n`;
  text += `Payment Status: ${data.paymentStatus}\n\n`;
  text += `Items:\n`;
  formattedItems.forEach((item: any) => {
    text += `- ${item.name} x ${item.quantity} @ ${item.price} = ${item.total}\n`;
  });
  text += `\nSubtotal: ${data.subtotal}\n`;
  text += `Shipping: ${data.shippingCost || '৳0.00'}\n`;
  text += `Tax: ${data.tax || '৳0.00'}\n`;
  text += `Total: ${formattedTotal}\n\n`;

  if (data.shippingAddress) {
    text += `Shipping Address:\n`;
    text += `${data.shippingAddress.name}\n`;
    text += `${data.shippingAddress.street}\n`;
    text += `${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postalCode}\n`;
    text += `${data.shippingAddress.country}\n`;
    if (data.shippingAddress.phone) text += `Phone: ${data.shippingAddress.phone}\n`;
    text += `\n`;
  }

  text += `View your order: ${orderUrl}\n\n`;
  text += `Thank you for shopping with ${appName}!\n`;
  text += `If you have any questions, contact us at support@${siteUrl.replace(/https?:\/\//, '')}\n`;

  return text;
}
