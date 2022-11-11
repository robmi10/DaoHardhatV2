const hre = require("hardhat");
const { ethers, deployments, network } = require("hardhat");
const { VOTING_PERIOD, VOTING_DELAY } = require("../helper-hardhat");
const { moveBlocks } = require("../utils/moveblock");

async function main() {
  // await moveBlocks(VOTING_PERIOD + 1);
  let newAmount = VOTING_DELAY + 1;
  console.log("moving blocks!");
  for (let i = 0; i < newAmount; i++) {
    console.log("moving blocks! -->", i);
    await network.provider.request({
      method: "hardhat_mine",
      params: [],
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
