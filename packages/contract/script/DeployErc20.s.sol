// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/TokenERC20Test.sol";

contract DeployScript is Script {
  function setUp() public {}

  function run() public {
    uint privateKey = vm.envUint("PRIVATE_KEY");
    // // Goerli
    vm.createSelectFork(vm.rpcUrl("goerli"));
    vm.startBroadcast(privateKey);
    address erc20Goerli = address(new TokenERC20Test());
    console.log(erc20Goerli);

    vm.stopBroadcast();

    // // Scroll
    vm.createSelectFork(vm.rpcUrl("scroll-sepolia"));
    vm.startBroadcast(privateKey);
    address erc20Scroll = address(new TokenERC20Test());
    console.log(erc20Scroll);

    vm.stopBroadcast();

    // // Mantle
    vm.createSelectFork(vm.rpcUrl("mantle-test"));
    vm.startBroadcast(privateKey);
    address erc20Mantle = address(new TokenERC20Test());
    console.log(erc20Mantle);

    vm.stopBroadcast();
  }
}
