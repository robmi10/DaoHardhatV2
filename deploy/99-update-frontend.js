const { ethers, network } = require("hardhat");
const fs = require("fs");
require("dotenv/config");

const FRONT_END_ADDRESSED_FILE =
  "../daofrontend/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "../daofrontend/constants/abi.json";

module.exports = async function () {
  console.log("process.env.UPDATE_FRONT_END ->", process.env.UPDATE_FRONT_END);
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating frontend...");

    updateContractAdresses();
    updateAbi();
  }
};

async function updateAbi() {
  const leader = await ethers.getContract("Leader");
  const daoGovernance = await ethers.getContract("DaoGovernance");
  const daoToken = await ethers.getContract("DaoToken");
  const timeLock = await ethers.getContract("TimeLock");

  const currentABI = [
    { daoToken: daoToken.interface.format(ethers.utils.FormatTypes.json) },
    { leader: leader.interface.format(ethers.utils.FormatTypes.json) },
    {
      daoGovernance: daoGovernance.interface.format(
        ethers.utils.FormatTypes.json
      ),
    },
    { timeLock: timeLock.interface.format(ethers.utils.FormatTypes.json) },
  ];
  fs.writeFileSync(FRONT_END_ABI_FILE, JSON.stringify(currentABI));
}

async function updateContractAdresses() {
  const leader = await ethers.getContract("Leader");
  const daoGovernance = await ethers.getContract("DaoGovernance");
  const daoToken = await ethers.getContract("DaoToken");
  const timeLock = await ethers.getContract("TimeLock");

  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSED_FILE, "utf8")
  );
  if (chainId in currentAddresses) {
    if (
      !currentAddresses[chainId].includes([
        leader.address,
        daoToken.address,
        daoGovernance.address,
        timeLock.address,
      ])
    ) {
      currentAddresses[chainId].push([
        { daoToken: daoToken.address },
        { leader: leader.address },
        { daoGovernance: daoGovernance.address },
        { timeLock: timeLock.address },
      ]);
    }
  }
  {
    currentAddresses[chainId] = [
      { daoToken: daoToken.address },
      { leader: leader.address },
      { daoGovernance: daoGovernance.address },
      { timeLock: timeLock.address },
    ];
  }

  fs.writeFileSync(FRONT_END_ADDRESSED_FILE, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"];
