// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./UserContract.sol";

contract UserFactory {
  mapping(address => address) public user;
  mapping(address => bool) public isHaveUser;

  // create Contract n
  function handle(address _recipient, address _mailbox, address _interchainGasPaymaster, uint32 _chainId) public {
    User newContract = new User(_recipient, _mailbox, _interchainGasPaymaster, _chainId);
    user[msg.sender] = address(newContract);
  }
}
