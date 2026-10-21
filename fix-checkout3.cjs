const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');

// Remove remaining payment step content and old review step (lines 241-260)
content = content.replace(
  /<p class='text-sm text-muted'>You'll be redirected to SSLCOMMERZ secure payment gateway to complete your purchase\.<\/p>\n<\/div>\n<\/div>\n<\/div>\n\{\/\* Step 4: Review \*\/}\n<div data-step-form='4' class='hidden space-y-6'>[\s\S]*?<div class='rounded-2xl border border-line bg-paper\/90 p-5 sm:p-6'>\n<h3 class='font-heading text-lg font-semibold text-ink'>Contact & Shipping<\/h3>/,
  ""
);

fs.writeFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', content);
console.log('Done');