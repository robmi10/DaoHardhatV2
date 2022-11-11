const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const { ethers } = require("hardhat");

const { MIN_DELAY } = require("../helper-hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const timeLock = await ethers.getContract("TimeLock", deployer);
  const governor = await ethers.getContract("DaoGovernance", deployer);
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();
  const proposerTx = await timeLock.grantRole(proposerRole, governor.address);
  await proposerTx.wait(1);
  console.log("inside fourth");
  const executorTx = await timeLock.grantRole(
    executorRole,
    "0x0000000000000000000000000000000000000000"
  );
  await executorTx.wait(1);
  const revokeRoleTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeRoleTx.wait(1);
};
module.exports.tags = ["all", "DaoGovernance"];
