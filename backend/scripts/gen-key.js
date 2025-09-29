const fs = require('fs');
const crypto = require('crypto');
const key = crypto.randomBytes(32);
fs.writeFileSync('.env', `KEY=${key.toString('base64')}`);
console.log("Key generated and saved to .env");