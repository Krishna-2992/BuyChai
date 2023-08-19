const {ethers} = require("hardhat");

async function getBalances(address){
  const balanceBigInt = await ethers.provider.getBalance(address)
  return ethers.utils.formatEther(balanceBigInt)
}

async function consoleBalances(addresses){
  let counter = 0;
  for(let address of addresses){
    console.log(`Address ${counter++} balance:`, await getBalances(address))
  }
}

async function consoleMemos(memos){
  for(let memo of memos){
    const timeStamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(`At ${timeStamp}, name: ${name}, from: ${from}, with message: ${message}`);
  }
}

async function main() {
  const [owner, from1, from2, from3] = await ethers.getSigners();
  const Chai = await ethers.getContractFactory("Chai")
  const chai = await Chai.deploy();
  await chai.deployed();
  console.log("Address of contract deployed: ", chai.address);
  const addresses = [owner.address, from1.address, from2.address]
  console.log('before buying chai')
  consoleBalances(addresses)

  const amount = ethers.utils.parseEther('15')
  await chai.connect(from1).buyChai("from1", "very nice chai", {value: amount})
  await chai.connect(from2).buyChai("from2", "very nice course", {value: amount})

  console.log('after buying chai')
  consoleBalances(addresses);

  const memos = await chai.connect(owner).getMemos();
  consoleMemos(memos)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
