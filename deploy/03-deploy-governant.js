const { ethers } = require("hardhat");

const {
  QUORUM_PERCENTAGE,
  VOTING_DELAY,
  VOTING_PERIOD,
} = require("../helper-hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get, log } = deployments;

  const { deployer } = await getNamedAccounts();
  const daoToken = await get("DaoToken");
  const timeLock = await get("TimeLock");
  log("Deploying daoGovernance");
  const DaoGovernance = await deploy("DaoGovernance", {
    from: deployer,
    args: [
      daoToken.address,
      timeLock.address,
      QUORUM_PERCENTAGE,
      VOTING_PERIOD,
      VOTING_DELAY,
    ],
    log: true,
  });

  console.log("Deploy daoGovernance at address", DaoGovernance.address);
};

module.exports.tags = ["all", "DaoGovernance"];
