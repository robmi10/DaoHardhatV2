// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers, deployments, network } = require("hardhat");

async function main() {
  console.log("inside main deploy");
  await deployments.fixture(["all"]);
  daoToken = await ethers.getContract("DaoToken");
  daoGovernance = await ethers.getContract("DaoGovernance");
  timeLock = await ethers.getContract("TimeLock");
  leader = await ethers.getContract("Leader");

  console.log(
    `\n
     DaoToken deployed at address --> [${daoToken.address}]
     DaoGovernance deployed at address --> [${daoGovernance.address}]
     TimeLock deployed at address --> [${timeLock.address}]
     Leader deployed at address --> [${leader.address}]
     \n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
