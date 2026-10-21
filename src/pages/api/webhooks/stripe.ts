import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getDb } from '../../../db';
import { orders, eq } from '../../../db/schema';

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as {
    DB: D1Database;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
  };
  const db = getDb(env);

  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: 'Stripe not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-09-30.endive',
  });

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response(JSON.stringify({ error: 'Missing stripe-signature header' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response(JSON.stringify({ error: 'Webhook signature verification failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        // Update order status to paid
        await db.update(orders)
          .set({
            status: 'paid',
            paymentIntentId: session.payment_intent as string,
            updatedAt: Math.floor(Date.now() / 1000),
          })
          .where(eq(orders.id, parseInt(orderId)))
          .run();
        
        console.log(`Order ${orderId} marked as paid via webhook`);
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        // Update order status to expired
        await db.update(orders)
          .set({
            status: 'expired',
            updatedAt: Math.floor(Date.now() / 1000),
          })
          .where(eq(orders.id, parseInt(orderId)))
          .run();
        
        console.log(`Order ${orderId} marked as expired via webhook`);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Find order by payment intent ID
      const order = await db.select()
        .from(orders)
        .where(eq(orders.paymentIntentId, paymentIntent.id))
        .get();

      if (order) {
        await db.update(orders)
          .set({
            status: 'payment_failed',
            updatedAt: Math.floor(Date.now() / 1000),
          })
          .where(eq(orders.id, order.id))
          .run();
        
        console.log(`Order ${order.id} marked as payment_failed via webhook`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};