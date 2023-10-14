// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/VaultFactory.sol";

contract DeployScript is Script {
  function setUp() public {}

  function run() public {
    uint privateKey = vm.envUint("PRIVATE_KEY");
    // // Goerli
    vm.createSelectFork(vm.rpcUrl("goerli"));
    vm.startBroadcast(privateKey);
    address factoryGoerli = address(new VaultFactory());
    console.log(factoryGoerli);

    vm.stopBroadcast();

    // // Scroll
    vm.createSelectFork(vm.rpcUrl("scroll-sepolia"));
    vm.startBroadcast(privateKey);
    address factoryScroll = address(new VaultFactory());
    console.log(factoryScroll);

    vm.stopBroadcast();

    // // Mantle
    vm.createSelectFork(vm.rpcUrl("mantle-test"));
    vm.startBroadcast(privateKey);
    address factoryMantle = address(new VaultFactory());
    console.log(factoryMantle);

    vm.stopBroadcast();
  }
}
