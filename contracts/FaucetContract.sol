// SPDX-License-Identifier: MIT
// const instance = await Faucet.deployed()

pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

    receive() external payable {}

    function addFunds() payable external {}

    function justTesting() external pure returns(uint) {
        return 666;
    }
    
    // pure, view - read-only call (no gas fee)
    // view - it indicates that the function will not alter the storage state
    // pure - more stricted, indicates that it won't even read the storage state 

    // Transactions (can generate state changes) and require gas fees

    // to talk to the node on the network we will make JSON-RPC http calls
} 