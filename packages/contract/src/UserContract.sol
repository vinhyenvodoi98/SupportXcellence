// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import {ERC20} from "@solmate/src/tokens/ERC20.sol";
import { DepositWithdrawStruct } from './helpers/Structs.sol';
import "./Vault.sol";

contract User {
    using ByteHasher for bytes;
    address public owner;

    // https://docs.hyperlane.xyz/docs/~/changes/LJxk6XmpcGjYBq0KKOFZ/resources/addresses
    address public mailbox;

    constructor (address _mailbox, address _owner) {
        mailbox = _mailbox;
        owner = _owner;
    }

    // Event
    event Received(uint32 origin, address sender, bytes body);

    modifier onlyMailbox() {
        require(msg.sender == mailbox);
        _;
    }

    // handle deposit, withdraw
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes memory _body
    ) public onlyMailbox{
        address sender = ByteHasher.bytes32ToAddress(_sender);
        emit Received(_origin, sender, _body);
        DepositWithdrawStruct memory data = abi.decode(_body,(DepositWithdrawStruct));
        if (data.functionName == 0) {
            _deposit(data.amount, data.vaultAddress, data.assetAddress);
        } else if (data.functionName == 1) {
            _withdraw(data.amount, data.vaultAddress, data.assetAddress);
        } else{
            return;
        }
    }

    function _deposit(uint256 amount, address vaultAddress, address assetAddress) private {
        ERC20(assetAddress).approve(vaultAddress, amount);
        Vault(payable(vaultAddress)).deposit(amount, address(this));
    }

    function _withdraw(uint256 amount, address vaultAddress, address assetAddress) private {
        Vault(payable(vaultAddress)).withdraw(amount, address(this), address(this));
    }
}
