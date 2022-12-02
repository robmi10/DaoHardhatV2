const { expect, assert } = require("chai");
const { ethers, deployments, network } = require("hardhat");
const { DaoToken } = require("../deploy/01-deploy-dao");
const {
  VOTING_DELAY,
  LOCAL_CHAIN,
  REASON,
  VOTING_PERIOD,
  MIN_DELAY,
} = require("../helper-hardhat");
const { moveBlocks } = require("../utils/moveblock");
const { moveTime } = require("../utils/movetime");

describe("testDao", function () {
  let daoGovernance;
  let timeLock;
  let leader;
  let daoToken;
  beforeEach(async () => {
    await deployments.fixture(["all"]);
    console.log("first");
    daoToken = await ethers.getContract("DaoToken");
    console.log("second");
    daoGovernance = await ethers.getContract("DaoGovernance");
    timeLock = await ethers.getContract("TimeLock");
    leader = await ethers.getContract("Leader");
  });

  it("propse", async () => {
    console.log("before");
    const leaderFunc = await leader.interface.encodeFunctionData(
      "createLeader",
      ["Malcom X"]
    );
    console.log("after");

    const proposeTx = await daoGovernance.propose(
      [leader.address],
      [0],
      [leaderFunc],
      REASON
    );
    const proposeEvent = await proposeTx.wait(1);
    const proposalId = proposeEvent.events[0].args.proposalId;

    console.log({ proposalId });
    if (LOCAL_CHAIN.includes(network.name)) {
      console.log({ LOCAL_CHAIN });
      console.log({ VOTING_DELAY });

      await moveBlocks(VOTING_DELAY + 1);
    }
    console.log({ proposalId });

    const voteTx = await daoGovernance.castVoteWithReason(
      proposalId,
      1,
      "Because he is the one!"
    );
    await voteTx.wait(1);
    console.log("User Voted for propsal!");
    let proposalIdState = await daoGovernance.state(proposalId);

    expect(proposalIdState.toString()).to.equal("1");

    console.log({ proposalIdState });

    const descriptionHash = ethers.utils.id(REASON);

    await moveBlocks(VOTING_PERIOD + 1);
    const queueTx = await daoGovernance.queue(
      [leader.address],
      [0],
      [leaderFunc],
      descriptionHash
    );
    await queueTx.wait(1);
    console.log("Proposal is on queue!");

    // move time to execute the queue

    await moveTime(MIN_DELAY);

    const executeTx = await daoGovernance.execute(
      [leader.address],
      [0],
      [leaderFunc],
      descriptionHash
    );
    await executeTx.wait(1);
    console.log("Proposal is executed");

    const getLeader = await leader.getLeader();

    console.log({ getLeader });

    expect(getLeader).to.equal("Malcom X");
  });
});
