// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@solmate/src/mixins/ERC4626.sol";
import {ERC20} from "@solmate/src/tokens/ERC20.sol";
import {FixedPointMathLib} from "@solmate/src/utils/FixedPointMathLib.sol";
import { ISimpleFlashLoan } from "./interfaces/ISimpleFlashLoan.sol";

contract Vault is ERC4626 {
    using FixedPointMathLib for uint256;
    uint256 private fee = 9; // 0.09% max 10000
    // mailbox contract https://docs.hyperlane.xyz/docs/resources/addresses
    mapping(address => bool) public mailbox;

    ERC20 erc20;

    constructor(address _erc20, string memory _name, string memory _symbol) ERC4626(ERC20(_erc20), _name, _symbol) {
        erc20 = ERC20(payable(_erc20));
    }

    modifier onlyMailbox() {
        require(mailbox[msg.sender]);
        _;
    }

    receive() external payable virtual {}

    function setMailbox(address _mailbox) public {
        mailbox[_mailbox] = true;
    }

    function removeMailbox(address _mailbox) public {
        mailbox[_mailbox] = false;
    }

    function setFee(uint256 _fee) public virtual {
        fee = _fee;
    }

    function getFee() public view returns (uint256) {
        return fee;
    }

    function totalAssets() public view virtual override returns (uint256) {
        return address(this).balance + asset.balanceOf(address(this));
    }

    /// @notice Implemented on L1, invoked via a message from L2. Ether swept from L2 is recieved (and used in yield bearing strategies)
    function sweep() public virtual {}

    /// @notice Implemented on L2, invoked via a message from L1. Set the underlying asset (ETH) holdings for ERC4626 conversion/exchange rates
    function setTotalAssets(uint256 _totalAssets) public virtual {}

    function flashLoanSimple(address _receiverAddress, uint256 amount) public virtual {
        ISimpleFlashLoan receiver = ISimpleFlashLoan(payable(_receiverAddress));
        erc20.approve(_receiverAddress, amount);
        receiver.receiveFlashLoan(address(erc20), address(this), fee, amount);
        // repay the loan
        erc20.transferFrom(_receiverAddress, address(this), amount + (amount * fee / (10**4)));
    }
}
