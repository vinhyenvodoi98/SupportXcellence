// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Project is Ownable {
  constructor(address _owner)
    Ownable(_owner)
  {}
}
