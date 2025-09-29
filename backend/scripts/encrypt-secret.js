const fs = require('fs');
const crypto = require('crypto');
const secret = process.argv[2] || "42";
const key = Buffer.from(require('dotenv').config().parsed.KEY, 'base64');
const cipher = crypto.createCipheriv('aes-256-ctr', key, Buffer.alloc(16,0));
let enc = cipher.update(secret, 'utf8', 'hex');
enc += cipher.final('hex');
fs.writeFileSync('tmp/secret.hex', enc);
console.log("Secret encrypted:", enc);