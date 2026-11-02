import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { url, body } = await request.json();
  
  try {
    console.log('Test connectivity - URL:', url);
    console.log('Test connectivity - Body:', body);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body || 'test=1',
    });
    
    const text = await response.text();
    console.log('Test connectivity - Response status:', response.status);
    console.log('Test connectivity - Response:', text);
    
    return new Response(JSON.stringify({
      success: true,
      status: response.status,
      response: text.substring(0, 1000),
    }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('Test connectivity - Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack,
    }), { headers: { 'Content-Type': 'application/json' }, status: 500 });
  }
};