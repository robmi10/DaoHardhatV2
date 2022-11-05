const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const DaoToken = await deploy("DaoToken", {
    from: deployer,
    args: [],
    log: true,
  });
  console.log("Deployed dao token at address", DaoToken.address);

  await delegate(DaoToken.address, deployer);
  console.log("Delegated");
};

const delegate = async (datoTokenAddress, delegatedAccount) => {
  const daoToken = await ethers.getContractAt("DaoToken", datoTokenAddress);

  const tx = await daoToken.delegate(delegatedAccount);
  await tx.wait(1);
  console.log("Checkpoints", await daoToken.numCheckpoints(delegatedAccount));
};
module.exports.tags = ["all", "DaoToken"];
