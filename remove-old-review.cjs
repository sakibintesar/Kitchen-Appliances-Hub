const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');
content = content.replace(/\r\n/g, '\n');

// Remove the old review step content (Contact & Shipping and Payment Method sections)
const startIdx = content.indexOf("          </div>\n          </div>\n          <h3 class='font-heading text-lg font-semibold text-ink'>Contact & Shipping</h3>");
if (startIdx >= 0) {
  // Find the end - the form buttons section
  const endIdx = content.indexOf("        <div class='flex items-center justify-between pt-4 border-t border-line'>", startIdx);
  if (endIdx >= 0) {
    content = content.slice(0, startIdx) + content.slice(endIdx);
    console.log('Removed old review step content');
  }
}

content = content.replace(/\n/g, '\r\n');
fs.writeFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', content);
console.log('Done');