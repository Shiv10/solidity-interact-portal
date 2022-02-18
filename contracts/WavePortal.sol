// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalJokes;

    event newJoke(address indexed from, uint256 timestamp, string message);

    struct Joke{
        address joker;
        string message;
        uint256 timestamp;
    }

    Joke[] jokes;

    constructor() {
        console.log("Hey this is my first smart contract!!");
    }

    function joke(string memory _message) public {
        totalJokes += 1; 
        console.log("%s has cracked a joke", msg.sender);

        jokes.push(Joke(msg.sender, _message, block.timestamp));

        emit newJoke(msg.sender, block.timestamp, _message);
    }

    function getAllJokes() public view returns (Joke[] memory) {
        return jokes;
    }

    function getTotalJokes() public view returns(uint256) {
        console.log("We have %d total jokes", totalJokes);
        return totalJokes;
    }
}
