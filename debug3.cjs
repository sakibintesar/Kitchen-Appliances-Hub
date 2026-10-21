const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');
content = content.replace(/\r\n/g, '\n');

// Find the Contact & Shipping section
const endIdx = content.indexOf("Contact & Shipping");
console.log('Contact & Shipping index:', endIdx);
if (endIdx >= 0) {
  console.log('Context:', JSON.stringify(content.substring(endIdx - 100, endIdx + 200)));
}