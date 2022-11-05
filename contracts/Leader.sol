//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Leader {
    string nextMission = "MIKE TYSON";
    function createLeader(string memory _leader) external {
        nextMission = _leader;
    }

    function getLeader () external view returns(string memory){
        return nextMission;
    }
} 