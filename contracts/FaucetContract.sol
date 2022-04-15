// SPDX-License-Identifier: MIT
// const instance = await Faucet.deployed()
// instance.addFunds()
// instance.addFunds ({from:accounts[0], value: "2000000"})

pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";
import "./Logger.sol";

contract Faucet is Owned, Logger{
    uint32 public numOfFunders;
    mapping (address => bool) private funders;
    mapping (uint => address) private lutFunders;

    modifier limitWithdraw(uint withdrawAmount) {
        require(
            withdrawAmount < 100000000000000000 ether,
            "Withdraw Amount exceeded"
        );
        _;
    }

    receive() external payable {}

    function addFunds() payable external {
        address funder = msg.sender;

        if(!funders[funder]) {
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function withdraw(uint128 withdrawAmount) external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
        
    }

    function getAllFunders() external view returns (address[] memory) {
      address[] memory _funders = new address[](numOfFunders);

        for (uint i = 0; i < numOfFunders; i++) {
          _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function getFundersAtIndex(uint8 index) external view returns(address) {
        return lutFunders[index];
    }
 
}
