const {ethers} = require("hardhat");
async function main() {
    const Chai = await ethers.getContractFactory("Chai")
    const chai = await Chai.deploy();
    await chai.deployed();
    console.log(chai.address)
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  