// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./Vault.sol";

contract VaultFactory {
  address[] public deployedContracts;

  function createContractVault(address _erc20, string memory _name, string memory _symbol) public {
    Vault newContract = new Vault(_erc20, _name, _symbol);
    deployedContracts.push(address(newContract));
  }

  function getDeployedContracts() public view returns (address[] memory) {
    return deployedContracts;
  }
}
