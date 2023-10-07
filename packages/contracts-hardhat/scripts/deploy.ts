import { ethers } from "hardhat";
import fs from "fs";
require('dotenv').config()

async function main() {
  const counter = await ethers.deployContract("Counter", [], {});

  await counter.waitForDeployment();

  console.log(
    `deployed to ${counter.target}`
  );

  const contractAddress = {
    address: counter.target
  }

  // Save the updated array to the JSON file
  fs.writeFileSync('contract-address.json', JSON.stringify(contractAddress, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
