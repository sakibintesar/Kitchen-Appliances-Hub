import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { users, sessions, eq } from '../../../db/schema';
import bcrypt from 'bcryptjs';
import { encodeBase64 } from '@oslojs/encoding';
import { createNotificationManager } from '../../../lib/notifications';

function generateSessionId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return encodeBase64(bytes);
}

function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return encodeBase64(bytes);
}

function setAuthCookies(response: Response, sessionId: string, userId: number): Response {
  const headers = new Headers(response.headers);
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  headers.append('Set-Cookie', `session_id=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`);
  headers.append('Set-Cookie', `user_id=${userId}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`);
  return new Response(response.body, { ...response, headers });
}

async function sendVerificationEmail(env: any, email: string, token: string, name?: string | null) {
  const siteUrl = env.PUBLIC_SITE_URL || 'http://localhost:4321';
  const verifyUrl = `${siteUrl}/api/auth/verify-email?token=${token}`;
  
  // Use notification manager if Resend is configured
  if (env.RESEND_API_KEY) {
    const notificationManager = createNotificationManager({
      RESEND_API_KEY: env.RESEND_API_KEY,
      FROM_EMAIL: env.FROM_EMAIL || 'onboarding@resend.dev',
      PUBLIC_SITE_URL: siteUrl,
      APP_NAME: 'KitchenHub',
    });
    
    await notificationManager.sendOrderConfirmation({
      orderId: 0,
      orderNumber: 'EMAIL_VERIFICATION',
      customerName: name || email.split('@')[0],
      customerEmail: email,
      customerPhone: '',
      totalAmount: 0,
      currency: 'USD',
      items: [],
      paymentMethod: 'email_verification',
    });
  }
  
  // Fallback: log for development
  console.log(`[DEV] Email verification link for ${email}: ${verifyUrl}`);
}

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { 
    DB: D1Database; 
    RESEND_API_KEY?: string;
    FROM_EMAIL?: string;
    PUBLIC_SITE_URL?: string;
  };
  const db = getDb(env);
  
  const { email, password, name } = await request.json();
  
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  if (password.length < 8) {
    return new Response(JSON.stringify({ error: 'Password must be at least 8 characters' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // Check if user exists
  const existing = await db.select().from(users).where(eq(users.email, email)).get();
  if (existing) {
    return new Response(JSON.stringify({ error: 'Email already registered' }), { 
      status: 409,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Generate email verification token
  const emailVerifyToken = generateToken();
  const emailVerifyExpires = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours
  
  const result = await db.insert(users).values({
    email,
    passwordHash,
    name: name || null,
    emailVerified: false,
    emailVerifyToken,
    emailVerifyExpires,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
  }).run();
  
  const userId = result.meta.last_row_id as number;
  const sessionId = generateSessionId();
  const expiresAt = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  
  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  }).run();
  
  // Send verification email
  await sendVerificationEmail(env, email, emailVerifyToken, name);
  
  const response = new Response(JSON.stringify({ 
    success: true, 
    user: { id: userId, email, name: name || null, emailVerified: false },
    message: 'Registration successful. Please check your email to verify your account.'
  }), { headers: { 'Content-Type': 'application/json' } });
  
  return setAuthCookies(response, sessionId, userId);
};