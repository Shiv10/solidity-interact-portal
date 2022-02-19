// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalJokes;
    uint256 private seed;

    event newJoke(address indexed from, uint256 timestamp, string message);
    mapping (address => uint256) public lastWavedAt;

    struct Joke{
        address joker;
        string message;
        uint256 timestamp;
    }

    Joke[] jokes;

    constructor() payable {
        console.log("Hey this is my first smart contract!!");
        seed = (block.difficulty + block.timestamp) % 100;
        console.log("random seed: ",seed);
    }

    function joke(string memory _message) public {

        require(lastWavedAt[msg.sender]+15 minutes < block.timestamp, "Wait 15 minutes");

        totalJokes += 1; 
        console.log("%s has cracked a joke", msg.sender);

        seed = (block.difficulty + block.timestamp + seed) % 100;

        jokes.push(Joke(msg.sender, _message, block.timestamp));

        if(seed<10){
            uint256 prize = 0.000001 ether;
            require(
                prize <= address(this).balance,
                "Trying to withdraw the ether form the contract"
            );
            (bool success, ) = (msg.sender).call{value: prize}("");
            require(success, "Failed to withdraw moeny from contract");
        }

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
