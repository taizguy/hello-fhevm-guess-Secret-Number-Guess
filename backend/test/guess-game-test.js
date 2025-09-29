const { expect } = require("chai");
describe("GuessGame", function() {
  it("should deploy", async function() {
    const GuessGame = await ethers.getContractFactory("GuessGame");
    const contract = await GuessGame.deploy("0x1234");
    await contract.deployed();
    expect(await contract.owner()).to.exist;
  });
});