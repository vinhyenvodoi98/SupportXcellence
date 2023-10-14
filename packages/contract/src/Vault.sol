// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC20} from "@solmate/src/tokens/ERC20.sol";
import "@solmate/src/mixins/ERC4626.sol";
import {FixedPointMathLib} from "@solmate/src/utils/FixedPointMathLib.sol";

contract Vault is ERC4626 {
    using FixedPointMathLib for uint256;

    ERC20 erc20;

    constructor(address _erc20, string memory _name, string memory _symbol) ERC4626(ERC20(_erc20), _name, _symbol) {
        erc20 = ERC20(payable(_erc20));
    }

    receive() external payable virtual {}

    function totalAssets() public view virtual override returns (uint256) {
        return address(this).balance + asset.balanceOf(address(this));
    }

    /// @notice Implemented on L1, invoked via a message from L2. Ether swept from L2 is recieved (and used in yield bearing strategies)
    function sweep() public virtual {}

    /// @notice Implemented on L2, invoked via a message from L1. Set the underlying asset (ETH) holdings for ERC4626 conversion/exchange rates
    function setTotalAssets(uint256 _totalAssets) public virtual {}
}
