const { ethers } = require("hardhat");

const { MIN_DELAY } = require("../helper-hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const TimeLock = await deploy("TimeLock", {
    from: deployer,
    args: [3600, [], []],
    log: true,
  });

  console.log("Deploy TimeLock at address", TimeLock.address);
};
module.exports.tags = ["all", "TimeLock"];
