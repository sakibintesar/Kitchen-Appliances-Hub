const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');

// Remove payment step form and replace review step
const replacement = `<div data-step-form='3' class='hidden space-y-6'>
<div class='rounded-2xl border border-line bg-paper/90 p-5 sm:p-6'>
<h3 class='font-heading text-lg font-semibold text-ink'>Review Your Order</h3>
<p class='mt-2 text-sm text-muted'>Please review your order details before proceeding to payment.</p>
<div class='mt-4 space-y-3' id='review-items'>
<!-- Items rendered by JS -->
</div>
<div class='mt-4 rounded-xl border border-line bg-paper/50 p-4' id='review-totals'>
<!-- Totals rendered by JS -->
</div>
<div class='mt-4 rounded-xl border border-line bg-paper/50 p-4'>
<h4 class='font-heading text-base font-semibold text-ink'>Contact</h4>
<p class='mt-1 text-sm text-ink' id='review-email'></p>
<p class='text-sm text-muted' id='review-phone'></p>
</div>
<div class='mt-4 rounded-xl border border-line bg-paper/50 p-4'>
<h4 class='font-heading text-base font-semibold text-ink'>Shipping Address</h4>
<p class='mt-1 text-sm text-ink' id='review-shipping'></p>
</div>
<div class='mt-4 rounded-xl border border-line bg-paper/50 p-4'>
<h4 class='font-heading text-base font-semibold text-ink'>Shipping Method</h4>
<p class='mt-1 text-sm text-ink' id='review-shipping-method'></p>
</div>
<p class='mt-4 text-sm text-muted'>You will be redirected to Stripe to complete your payment securely.</p>
</div>
</div>`;

content = content.replace(
  /<div data-step-form='3' class='hidden space-y-6'>[\s\S]*?\{\/\* Step 4: Review \*\/}\n<div data-step-form='4' class='hidden space-y-6'>/,
  replacement
);

fs.writeFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', content);
console.log('Done');