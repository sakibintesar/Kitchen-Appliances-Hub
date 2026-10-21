const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');

// Remove remaining payment form content (from the first </label> after "Credit / Debit Card" up to the new review section)
const startIdx = content.indexOf("</label>\n          <label class='flex items-center gap-3 rounded-xl border border-line bg-paper p-4 cursor-pointer hover:border-ink/50 transition'>\n                  <input type='radio' name='paymentMethod' value='bkash'");
if (startIdx >= 0) {
  // Find the end - the new review section we added
  const endIdx = content.indexOf("<p class='mt-4 text-sm text-muted'>You will be redirected to Stripe to complete your payment securely.</p>", startIdx);
  if (endIdx >= 0) {
    // Find the closing </div></div> before that
    const endMarker = content.lastIndexOf("</div>\n          </div>", endIdx);
    if (endMarker >= 0) {
      content = content.slice(0, startIdx) + content.slice(endMarker + 18);
      console.log('Removed remaining payment form');
    }
  }
}

fs.writeFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', content);
console.log('Done');