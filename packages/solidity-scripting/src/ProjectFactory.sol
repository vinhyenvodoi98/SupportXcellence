// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import { Project } from './Project.sol';

contract ProjectFactory {
  address[] public deployedContracts;

  function createContractProject() public {
    Project newContract = new Project(msg.sender);
    deployedContracts.push(address(newContract));
  }

  function getDeployedContracts() public view returns (address[] memory) {
    return deployedContracts;
  }
}