// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalJokes;
    constructor() {
        console.log("Hey this is my first smart contract!!");
    }

    function joke() public {
        totalJokes += 1; 
        console.log("%s has cracked a joke", msg.sender);
    }

    function getTotalJokes() public view returns(uint256) {
        console.log("We have %d total jokes", totalJokes);
        return totalJokes;
    }
}
