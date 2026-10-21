import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getDb } from '../../../db';
import { orders, eq } from '../../../db/schema';

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as {
    DB: D1Database;
    STRIPE_SECRET_KEY: string;
    PUBLIC_SITE_URL: string;
  };
  const db = getDb(env);

  try {
    const body = await request.json();
    const { email, name, shippingAddress, billingAddress, lines, totalAmount, currency = 'USD' } = body;

    // Validate required fields
    if (!email || !name || !shippingAddress || !lines || !Array.isArray(lines) || lines.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!env.STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Stripe not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-09-30.endive',
    });

    // Create order in DB with pending status (before payment)
    const orderResult = await db.insert(orders).values({
      userId: null,
      sessionId: crypto.randomUUID(),
      email,
      name,
      status: 'pending_payment',
      totalAmount,
      currency,
      lines: JSON.stringify(lines),
      shippingAddress: JSON.stringify(shippingAddress),
      billingAddress: JSON.stringify(billingAddress),
      paymentIntentId: null,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    }).run();

    const orderId = orderResult.meta?.last_row_id || 0;
    const orderNumber = `#KH-${String(orderId).padStart(6, '0')}`;

    // Build line items for Stripe Checkout
    const lineItems = lines.map((line: any) => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: line.title,
          description: line.variantTitle,
          images: line.image ? [line.image.src] : [],
        },
        unit_amount: line.price?.amount || 0,
      },
      quantity: line.quantity || 1,
    }));

    // Calculate shipping and tax for Stripe
    const subtotal = lines.reduce((s: number, i: any) => s + (i.price?.amount || 0) * (i.quantity || 1), 0);
    const SHIPPING_THRESHOLD = 50000;
    const SHIPPING_COST = 1500;
    const TAX_RATE = 0.08;
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = Math.round((subtotal + shipping) * TAX_RATE);

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: 'Shipping',
            description: 'Standard shipping',
          },
          unit_amount: shipping,
        },
        quantity: 1,
      });
    }

    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: 'Tax',
            description: 'Sales tax (8%)',
          },
          unit_amount: tax,
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: email,
      success_url: `${env.PUBLIC_SITE_URL}/checkout/success?order=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.PUBLIC_SITE_URL}/checkout?canceled=true`,
      metadata: {
        orderId: String(orderId),
        orderNumber,
        email,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Add more as needed
      },
      billing_address_collection: 'required',
    });

    // Update order with Stripe session ID
    await db.update(orders)
      .set({ 
        paymentIntentId: session.id,
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .where(eq(orders.id, orderId))
      .run();

    return new Response(JSON.stringify({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
      orderId,
      orderNumber,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to create checkout session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};