// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// @param owner origin owner

struct CreateUserStruct {
  address owner;
}

struct DepositWithdrawStruct {
  uint256 functionName; // 0 = deposit, 1 = withdraw
  uint256 amount;
  address vaultAddress;
  address assetAddress;
}
