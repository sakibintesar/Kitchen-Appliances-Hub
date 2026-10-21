const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');

// Update form submission to use Stripe
const oldFormSubmission = `form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateStep(totalSteps)) return;

  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Processing...';

  // Collect form data
  const formData = new FormData(form as HTMLFormElement);
  const email = document.getElementById('email')?.value || '';
  const firstName = document.getElementById('firstName')?.value || '';
  const lastName = document.getElementById('lastName')?.value || '';
  const name = \`\${firstName} \${lastName}\`.trim();
  const address1 = document.getElementById('address1')?.value || '';
  const address2 = document.getElementById('address2')?.value || '';
  const city = document.getElementById('city')?.value || '';
  const state = document.getElementById('state')?.value || '';
  const zip = document.getElementById('zip')?.value || '';
  const country = document.getElementById('country')?.value || '';
  const phone = document.getElementById('phone')?.value || '';
  const paymentMethod = document.querySelector('input[name=paymentMethod]:checked')?.value || 'card';
  const shippingMethod = document.querySelector('input[name=shippingMethod]:checked')?.value || 'standard';

  const shippingAddress = {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    phone,
  };

  const billingAddress = { ...shippingAddress }; // Use same for now

  // Get cart lines
  const cart = cartLines.get();
  const lines = cart.map(i => ({
    variantId: i.variantId,
    productHandle: i.productHandle,
    title: i.title,
    variantTitle: i.variantTitle,
    image: i.image,
    price: i.price,
    quantity: i.quantity,
  }));

  const subtotal = cart.reduce((s, i) => s + (i.price?.amount || 0) * (i.quantity || 1), 0);
  const shipping = calcShipping(subtotal);
  const tax = Math.round((subtotal + shipping) * TAX_RATE);
  const totalAmount = subtotal + shipping + tax;

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        shippingAddress,
        billingAddress,
        paymentMethod,
        paymentDetails: {},
        lines,
        totalAmount,
        currency: 'USD',
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Clear cart and redirect to success page
      clearCart();
      window.location.href = \`/checkout/success?order=\${data.orderId}\`;
    } else {
      throw new Error(data.error || 'Failed to create order');
    }
  } catch (error) {
    console.error('Order error:', error);
    alert('Failed to place order. Please try again.');
    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = 'Place Order';
    return;
  }
});`;

const newFormSubmission = `form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateStep(totalSteps)) return;

  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Processing...';

  // Collect form data
  const formData = new FormData(form as HTMLFormElement);
  const email = document.getElementById('email')?.value || '';
  const firstName = document.getElementById('firstName')?.value || '';
  const lastName = document.getElementById('lastName')?.value || '';
  const name = \`\${firstName} \${lastName}\`.trim();
  const address1 = document.getElementById('address1')?.value || '';
  const address2 = document.getElementById('address2')?.value || '';
  const city = document.getElementById('city')?.value || '';
  const state = document.getElementById('state')?.value || '';
  const zip = document.getElementById('zip')?.value || '';
  const country = document.getElementById('country')?.value || '';
  const phone = document.getElementById('phone')?.value || '';
  const shippingMethod = document.querySelector('input[name=shippingMethod]:checked')?.value || 'standard';

  const shippingAddress = {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    phone,
  };

  const billingAddress = { ...shippingAddress }; // Use same for now

  // Get cart lines
  const cart = cartLines.get();
  const lines = cart.map(i => ({
    variantId: i.variantId,
    productHandle: i.productHandle,
    title: i.title,
    variantTitle: i.variantTitle,
    image: i.image,
    price: i.price,
    quantity: i.quantity,
  }));

  const subtotal = cart.reduce((s, i) => s + (i.price?.amount || 0) * (i.quantity || 1), 0);
  const shipping = calcShipping(subtotal);
  const tax = Math.round((subtotal + shipping) * TAX_RATE);
  const totalAmount = subtotal + shipping + tax;

  try {
    const response = await fetch('/api/checkout/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        shippingAddress,
        billingAddress,
        shippingMethod,
        lines,
        totalAmount,
        currency: 'USD',
      }),
    });

    const data = await response.json();

    if (data.success && data.sessionUrl) {
      // Redirect to Stripe Checkout
      window.location.href = data.sessionUrl;
    } else {
      throw new Error(data.error || 'Failed to create checkout session');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Failed to start checkout. Please try again.');
    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = 'Place Order';
    return;
  }
});`;

content = content.replace(oldFormSubmission, newFormSubmission);

fs.writeFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', content);
console.log('Done part 2');