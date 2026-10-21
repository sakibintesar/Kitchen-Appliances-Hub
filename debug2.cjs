const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', 'utf8');

// Find the start of step 3 form
const startIdx = content.indexOf("<div data-step-form='3' class='hidden space-y-6'>");
console.log('Start index:', startIdx);
if (startIdx >= 0) {
  console.log('Content at start:', JSON.stringify(content.substring(startIdx, startIdx + 150)));
}

fs.writeFileSync('C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\checkout.astro', content);