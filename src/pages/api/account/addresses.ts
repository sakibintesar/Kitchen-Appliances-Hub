import type { APIRoute } from 'astro';
import { getDb } from '@db';
import { addresses, eq } from '@db/schema';
import { desc } from 'drizzle-orm';

const VALID_COUNTRIES = ['US', 'CA', 'GB', 'AU', 'BD'];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
];

const CA_PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
];

const BD_DIVISIONS = [
  'BARISAL', 'CHITTAGONG', 'DHAKA', 'KHULNA', 'MYMENSINGH', 'RAJSHAHI', 'RANGPUR', 'SYLHET'
];

function validateAddress(data: any): { valid: boolean; error?: string } {
  const required = ['firstName', 'lastName', 'address1', 'city', 'state', 'postalCode', 'country'];
  for (const field of required) {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  if (data.firstName.length > 50) return { valid: false, error: 'First name must be 50 characters or less' };
  if (data.lastName.length > 50) return { valid: false, error: 'Last name must be 50 characters or less' };
  if (data.company && data.company.length > 100) return { valid: false, error: 'Company must be 100 characters or less' };
  if (data.address1.length > 100) return { valid: false, error: 'Address line 1 must be 100 characters or less' };
  if (data.address2 && data.address2.length > 100) return { valid: false, error: 'Address line 2 must be 100 characters or less' };
  if (data.city.length > 50) return { valid: false, error: 'City must be 50 characters or less' };

  if (!VALID_COUNTRIES.includes(data.country)) {
    return { valid: false, error: 'Invalid country' };
  }

  if (data.country === 'US' && !US_STATES.includes(data.state)) {
    return { valid: false, error: 'Invalid US state' };
  }
  if (data.country === 'CA' && !CA_PROVINCES.includes(data.state)) {
    return { valid: false, error: 'Invalid Canadian province' };
  }
  if (data.country === 'BD' && !BD_DIVISIONS.includes(data.state.toUpperCase())) {
    return { valid: false, error: 'Invalid Bangladesh division' };
  }

  const postalCode = data.postalCode.trim().toUpperCase();
  if (data.country === 'US') {
    if (!/^\d{5}(-\d{4})?$/.test(postalCode)) {
      return { valid: false, error: 'Invalid US ZIP code format (use 12345 or 12345-6789)' };
    }
  } else if (data.country === 'CA') {
    if (!/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(postalCode)) {
      return { valid: false, error: 'Invalid Canadian postal code format (use A1A 1A1)' };
    }
  } else if (data.country === 'GB') {
    if (!/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(postalCode)) {
      return { valid: false, error: 'Invalid UK postcode format' };
    }
  } else if (data.country === 'AU') {
    if (!/^\d{4}$/.test(postalCode)) {
      return { valid: false, error: 'Invalid Australian postcode format (use 1234)' };
    }
  } else if (data.country === 'BD') {
    if (!/^\d{4}$/.test(postalCode)) {
      return { valid: false, error: 'Invalid Bangladesh postal code format (use 1212)' };
    }
  }

  return { valid: true };
}

export const GET: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);

  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/session_id=([^;]+)/);

  if (!match) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const sessionRes = await env.DB.prepare(
    'SELECT user_id, expires_at FROM sessions WHERE id = ?'
  ).bind(match[1]).first();

  if (!sessionRes || sessionRes.expires_at < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = sessionRes.user_id;

  const userAddresses = await db.select()
    .from(addresses)
    .where(eq(addresses.userId, userId))
    .orderBy(desc(addresses.isDefault), desc(addresses.updatedAt))
    .all();

  return new Response(JSON.stringify({ addresses: userAddresses }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ locals, request }) => {
  const env = locals.env as { DB: D1Database };
  const db = getDb(env);

  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/session_id=([^;]+)/);

  if (!match) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const sessionRes = await env.DB.prepare(
    'SELECT user_id, expires_at FROM sessions WHERE id = ?'
  ).bind(match[1]).first();

  if (!sessionRes || sessionRes.expires_at < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = sessionRes.user_id;

  const data = await request.json();

  const validation = validateAddress(data);
  if (!validation.valid) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // If this is set as default, unset other defaults
  if (data.isDefault) {
    await db.update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  const [newAddress] = await db.insert(addresses).values({
    userId,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    company: data.company?.trim() || null,
    address1: data.address1.trim(),
    address2: data.address2?.trim() || null,
    city: data.city.trim(),
    state: data.state.trim(),
    postalCode: data.postalCode.trim().toUpperCase(),
    country: data.country,
    isDefault: data.isDefault || false,
  }).returning();

  return new Response(JSON.stringify({ success: true, address: newAddress }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};