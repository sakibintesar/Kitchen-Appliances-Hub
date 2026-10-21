const fs = require('fs');
const file = 'C:\\Users\\sakib\\.cline\\data\\workspaces\\chat\\Kitchen-Appliances-Hub\\src\\pages\\account.astro';
let content = fs.readFileSync(file, 'utf8');

const idx = content.indexOf('Welcome! Redirecting...');
console.log('Found at:', idx);

if (idx >= 0) {
    const before = content.substring(0, idx);
    const after = content.substring(idx);
    const replacement = '`Welcome${mode === \'register\' ? \' to KitchenHub\' : \' back\'}! Redirecting...`';
    console.log('Replacement:', replacement);
    const newAfter = after.replace('Welcome! Redirecting...', replacement);
    console.log('New after (first 100):', newAfter.substring(0, 100));
    content = before + newAfter;
    fs.writeFileSync(file, content, 'utf8');
    console.log('Done');
    
    // Verify
    const verify = fs.readFileSync(file, 'utf8');
    const verifyIdx = verify.indexOf('Redirecting...');
    console.log('Verified:', verify.substring(verifyIdx - 50, verifyIdx + 60));
} else {
    console.log('NOT FOUND');
}