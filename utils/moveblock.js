const { network } = require("hardhat");

const moveBlocks = async (amount) => {
  console.log("moving blocks!");
  for (let i = 0; i < amount; i++) {
    console.log("moving blocks!", i);
    await network.provider.request({
      method: "evm_mine",
      params: [],
    });
  }
};

module.exports = { moveBlocks };
