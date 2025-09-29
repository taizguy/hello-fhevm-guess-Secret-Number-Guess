// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GuessGame {
    address public owner;
    bytes public encryptedSecret;

    event GuessSubmitted(address indexed player, bytes guessCipher);
    event ResultPublished(address indexed player, bytes resultCipher);

    constructor(bytes memory _encryptedSecret) {
        owner = msg.sender;
        encryptedSecret = _encryptedSecret;
    }

    function submitEncryptedGuess(bytes calldata guessCipher) external {
        emit GuessSubmitted(msg.sender, guessCipher);
    }

    function publishEncryptedResult(address player, bytes calldata resultCipher) external {
        require(msg.sender == owner, "only owner");
        emit ResultPublished(player, resultCipher);
    }
}