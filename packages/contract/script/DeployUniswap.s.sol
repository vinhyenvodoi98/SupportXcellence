// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Uniswapv4.sol";
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";
import {PoolManager} from "@uniswap/v4-core/contracts/PoolManager.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolModifyPositionTest} from "@uniswap/v4-core/contracts/test/PoolModifyPositionTest.sol";
import {PoolSwapTest} from "@uniswap/v4-core/contracts/test/PoolSwapTest.sol";
import {PoolDonateTest} from "@uniswap/v4-core/contracts/test/PoolDonateTest.sol";
import {HookMiner} from "../test/utils/HookMiner.sol";

contract DeployScript is Script {
  address constant CREATE2_DEPLOYER = address(0x4e59b44847b379578588920cA78FbF26c0B4956C);

  function setUp() public {}

  function run() public {
    // 0x6B18E29A6c6931af9f8087dbe12e21E495855adA poolmanager for scroll
    IPoolManager manager = IPoolManager(payable(0x6B18E29A6c6931af9f8087dbe12e21E495855adA));

    // hook contracts must have specific flags encoded in the address
    uint160 flags = uint160(
        // Hooks.BEFORE_SWAP_FLAG | Hooks.AFTER_SWAP_FLAG
    );

    // Mine a salt that will produce a hook address with the correct flags
    (address hookAddress, bytes32 salt) = HookMiner.find(CREATE2_DEPLOYER, flags, 1000, type(Uniswapv4).creationCode, abi.encode(address(manager)));

    // Deploy the hook using CREATE2
    vm.broadcast();
    Uniswapv4 uniswapv4 = new Uniswapv4{salt: salt}(manager);
    require(address(uniswapv4) == hookAddress, "Uniswap: hook address mismatch");
  }
}
