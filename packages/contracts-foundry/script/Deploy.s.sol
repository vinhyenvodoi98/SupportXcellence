// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import '../src/ProjectFactory.sol';

contract DeployScript is Script {
  function setUp() public {}

  function run() public {
    uint privateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(privateKey);

    vm.createSelectFork(vm.rpcUrl("goerli"));
    ProjectFactory factory = new ProjectFactory();

    vm.stopBroadcast();
  }
}