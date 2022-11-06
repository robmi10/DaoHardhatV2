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
  fs.writeFileSync(
    FRONT_END_ABI_FILE,
    leader.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAdresses() {
  const leader = await ethers.getContract("Leader");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSED_FILE, "utf8")
  );
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(leader.address)) {
      currentAddresses[chainId].push(leader.address);
    }
  }
  {
    currentAddresses[chainId] = [leader.address];
  }

  fs.writeFileSync(FRONT_END_ADDRESSED_FILE, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"];
