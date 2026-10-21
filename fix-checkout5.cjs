const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');

// Find and remove the duplicate review step (step 4)
const startIdx = content.indexOf('{/* Step 4: Review */}');
if (startIdx >= 0) {
  const endIdx = content.indexOf('<h3 class=\'font-heading text-lg font-semibold text-ink\'>Contact & Shipping</h3>', startIdx);
  if (endIdx >= 0) {
    content = content.slice(0, startIdx) + content.slice(endIdx);
    console.log('Removed duplicate step 4');
  }
}

fs.writeFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', content);
console.log('Done');