const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const encSecret = fs.readFileSync("tmp/secret.hex","utf8");
  const GuessGame = await hre.ethers.getContractFactory("GuessGame");
  const contract = await GuessGame.deploy(Buffer.from(encSecret, "hex"));
  await contract.deployed();
  console.log("GuessGame deployed to:", contract.address);
  fs.writeFileSync("tmp/contract-address.txt", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});