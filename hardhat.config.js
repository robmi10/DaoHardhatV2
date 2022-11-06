require("@nomicfoundation/hardhat-toolbox");

require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("@typechain/hardhat");
require("dotenv/config");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    polygon: {
      url: process.env.API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
