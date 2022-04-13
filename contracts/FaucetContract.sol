// SPDX-License-Identifier: MIT
// const instance = await Faucet.deployed()

pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    uint public numOfFunders;
    mapping (uint => address) private funders;

    receive() external payable {}

    function addFunds() payable external {
        uint index = numOfFunders++;
    }

    function getAllFunders() external view returns(address[] memory){
        return funders;
    }
    
    function getFundersAtIndex(uint8 index) external view returns(address) {
        address[] memory _funders = getAllFunders();
        return _funders[index];
    }
}
