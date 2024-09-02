const fs = require('fs');
const path = require('path');

const changelogPath = path.join(__dirname, 'CHANGELOG.md');
const changelogContent = fs.readFileSync(changelogPath, 'utf8');


console.log(changelogContent);

