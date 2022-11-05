const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const { ethers } = require("hardhat");

const { MIN_DELAY } = require("../helper-hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get, log } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("leader first", deployer);
  const leader = await deploy("Leader", {
    from: deployer,
    args: [],
    log: true,
  });
  console.log({ deployer });
  console.log("leader second", leader.address);
};
module.exports.tags = ["all", "Leader"];
