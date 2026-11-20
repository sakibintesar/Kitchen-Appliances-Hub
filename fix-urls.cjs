const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\sakib\\Kitchen-Appliances-Hub\\src\\data\\mock-catalog.json', 'utf8');
const fixed = content.replace(/kitchenhub\/(miyako|kiam|prestige)\/kitchenhub\/\1\//g, 'kitchenhub/$1/');
fs.writeFileSync('C:\\Users\\sakib\\Kitchen-Appliances-Hub\\src\\data\\mock-catalog.json', fixed);
console.log('Fixed duplicate paths');