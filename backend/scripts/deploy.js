// const hre = require("hardhat");
// const fs = require("fs");

// async function main() {
//   const encSecret = fs.readFileSync("tmp/secret.hex","utf8");
//   const GuessGame = await hre.ethers.getContractFactory("GuessGame");
//   const contract = await GuessGame.deploy(Buffer.from(encSecret, "hex"));
//   await contract.deployed();
//   console.log("GuessGame deployed to:", contract.address);
//   fs.writeFileSync("tmp/contract-address.txt", contract.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// backend/scripts/deploy-fixed.js
const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

async function main() {
  // Read the encrypted secret
  const secretPath = path.join(__dirname, '..', 'tmp', 'secret.hex');
  if (!fs.existsSync(secretPath)) {
    throw new Error('tmp/secret.hex missing. Run node scripts/encrypt-secret.js first.');
  }
  let secretHex = fs.readFileSync(secretPath, 'utf8').trim();
  if (!secretHex.startsWith('0x')) secretHex = '0x' + secretHex;

  // Deploy GuessGame
  const GuessGame = await hre.ethers.getContractFactory('GuessGame');
  console.log('Deploying GuessGame with encrypted secret...');
  const contract = await GuessGame.deploy(secretHex);
  await contract.deployed();

  console.log('✅ Deployed GuessGame to:', contract.address);

  // Save contract address for frontend
  const outPath = path.join(__dirname, '..', 'tmp', 'contract-address.txt');
  fs.writeFileSync(outPath, contract.address);
  console.log('📄 Wrote contract address to', outPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

