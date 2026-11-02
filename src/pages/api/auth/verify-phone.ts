import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, eq } from '../../../db/schema';
import { encodeBase64 } from '@oslojs/encoding';

function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return encodeBase64(bytes);
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Free SMS Alternatives (no Twilio needed):
 * 1. Email-to-SMS Gateway - Send email to number@carrier.com (free, carrier-dependent)
 * 2. TextBelt.com - Free tier: 1 SMS/day, paid for more
 * 3. Console logging - Current fallback for development
 * 4. Vonage/Plivo - Free tiers available
 */
async function sendVerificationSms(env: any, phone: string, otp: string) {
  const message = `Your KitchenHub verification code: ${otp}. Valid for 10 minutes.`;

  // Option 1: Email-to-SMS Gateway (free, works with major carriers)
  // Format: phoneNumber@carrierDomain (e.g., 017XXXXXXXX@sms.teletalk.com.bd)
  // Note: Requires knowing user's carrier. For BD: grameenphone.com, banglalink.net, robi.com.bd, teletalk.com.bd
  if (env.SMS_EMAIL_GATEWAY_ENABLED === 'true' && env.SMS_EMAIL_GATEWAY_DOMAIN) {
    try {
      const smsEmail = phone.replace(/[^0-9]/g, '') + '@' + env.SMS_EMAIL_GATEWAY_DOMAIN;
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL || 'onboarding@resend.dev',
          to: [smsEmail],
          subject: 'KitchenHub Verification',
          text: message,
        }),
      });
      console.log('[SMS] Sent via Email-to-SMS gateway to:', smsEmail);
      return;
    } catch (error) {
      console.error('[SMS] Email-to-SMS gateway failed:', error);
    }
  }

  // Option 2: TextBelt.com (free: 1 SMS/day, no account needed for testing)
  if (env.TEXTBELT_KEY) {
    try {
      const response = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone,
          message: message,
          key: env.TEXTBELT_KEY, // 'textbelt' for free tier (1/day)
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log('[SMS] Sent via TextBelt:', result.textId);
        return;
      }
      console.error('[SMS] TextBelt error:', result.error);
    } catch (error) {
      console.error('[SMS] TextBelt failed:', error);
    }
  }

  // Option 3: Twilio (paid - keep for future)
  if (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_PHONE_NUMBER) {
    try {
      const accountSid = env.TWILIO_ACCOUNT_SID;
      const authToken = env.TWILIO_AUTH_TOKEN;
      const fromNumber = env.TWILIO_PHONE_NUMBER;
      
      // In production, use: await twilioClient.messages.create({ to: phone, from: fromNumber, body: message });
      console.log('[SMS] Would send via Twilio:', { to: phone, from: fromNumber, body: message });
      return;
    } catch (error) {
      console.error('[SMS] Twilio error:', error);
    }
  }

  // Fallback: Console logging (development)
  console.log(`[DEV] SMS verification code for ${phone}: ${otp}`);
  console.log(`[DEV] Message: ${message}`);
}

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { 
    DB: D1Database;
    PUBLIC_SITE_URL?: string;
    NODE_ENV?: string;
    RESEND_API_KEY?: string;
    FROM_EMAIL?: string;
    SMS_EMAIL_GATEWAY_ENABLED?: string;
    SMS_EMAIL_GATEWAY_DOMAIN?: string;
    TEXTBELT_KEY?: string;
    TWILIO_ACCOUNT_SID?: string;
    TWILIO_AUTH_TOKEN?: string;
    TWILIO_PHONE_NUMBER?: string;
  };
  const db = getDb(env);

  const { phone, userId } = await request.json();

  if (!phone || !userId) {
    return new Response(JSON.stringify({ error: 'Phone and userId required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate user exists
  const user = await db.select().from(users).where(eq(users.id, userId)).get();
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const otp = generateOtp();
  const otpExpires = Math.floor(Date.now() / 1000) + 10 * 60; // 10 minutes

  // Store OTP in user record (or create a separate phone_verifications table)
  await db.update(users)
    .set({
      phone,
      phoneVerifyToken: otp,
      phoneVerifyExpires: otpExpires,
      updatedAt: Math.floor(Date.now() / 1000),
    })
    .where(eq(users.id, userId))
    .run();

  // Send OTP via SMS (uses free alternatives if configured)
  await sendVerificationSms(env, phone, otp);

  return new Response(JSON.stringify({ 
    success: true, 
    message: 'Verification code sent to phone',
    // Only return OTP in development
    ...(env.NODE_ENV === 'development' && { devOtp: otp })
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

// Verify phone OTP endpoint
export const PUT: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);

  const { userId, otp } = await request.json();

  if (!userId || !otp) {
    return new Response(JSON.stringify({ error: 'userId and OTP required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await db.select().from(users).where(eq(users.id, userId)).get();
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!user.phoneVerifyToken || user.phoneVerifyToken !== otp) {
    return new Response(JSON.stringify({ error: 'Invalid verification code' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (user.phoneVerifyExpires && user.phoneVerifyExpires < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ error: 'Verification code has expired' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await db.update(users)
    .set({
      phoneVerified: true,
      phoneVerifyToken: null,
      phoneVerifyExpires: null,
      updatedAt: Math.floor(Date.now() / 1000),
    })
    .where(eq(users.id, userId))
    .run();

  return new Response(JSON.stringify({ 
    success: true, 
    message: 'Phone verified successfully' 
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};