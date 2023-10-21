// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract SimpleFlashLoan {
    function receiveFlashLoan(address token ,address vaultAddress, uint256 fee, uint256 borrowAmount) external {
        // Perform actions with borrowed funds

        // Make sure to repay the loan before the end of the transaction
        IERC20(token).approve(vaultAddress, borrowAmount + (borrowAmount * fee / (10^5)));
    }
}
