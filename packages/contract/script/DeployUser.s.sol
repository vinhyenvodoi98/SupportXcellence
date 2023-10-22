// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/UserContractSender.sol";
import "../src/UserContractFactory.sol";

contract DeployScript is Script {
  function setUp() public {}

  function run() public {
    uint privateKey = vm.envUint("PRIVATE_KEY");
    // // Scroll - User Factory handler
    // https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/v3/typescript/sdk/src/consts/environments/testnet.json

    // address ScrollsepoliaMailbox = 0x3C5154a193D6e2955650f9305c8d80c18C814A68;
    // vm.createSelectFork(vm.rpcUrl("scroll-sepolia"));
    // vm.startBroadcast(privateKey);
    // address UserFactoryScroll = address(new UserFactory(ScrollsepoliaMailbox));
    // console.log(UserFactoryScroll);
    // uint32 targetChain = 534351; // optimism scroll

    // vm.stopBroadcast();

    // optimism goerli
    address OptimismGoerliMailBox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    vm.createSelectFork(vm.rpcUrl("optimism-goerli"));
    vm.startBroadcast(privateKey);
    address UserFactoryScroll = address(new UserFactory(OptimismGoerliMailBox));
    console.log(UserFactoryScroll);
    uint32 targetChain = 420; // optimism goerli

    vm.stopBroadcast();

    // // Goerli - sender
    address GoerliMailbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    address GoerliInterchainGasPaymaster = 0xF90cB82a76492614D07B82a7658917f3aC811Ac1;
    vm.createSelectFork(vm.rpcUrl("goerli"));
    vm.startBroadcast(privateKey);
    address erc20Goerli = address(new UserContractSender(GoerliMailbox, GoerliInterchainGasPaymaster, targetChain));
    console.log(erc20Goerli);

    vm.stopBroadcast();


    // // // Mantle
    // vm.createSelectFork(vm.rpcUrl("mantle-test"));
    // vm.startBroadcast(privateKey);
    // address erc20Mantle = address(new TokenERC20Test());
    // console.log(erc20Mantle);

    // vm.stopBroadcast();
  }
}
