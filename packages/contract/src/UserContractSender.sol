// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { CreateUserStruct, DepositWithdrawStruct } from './helpers/Structs.sol';
import { IInterchainGasPaymaster } from "./interfaces/IInterchainGasPaymaster.sol";
import { IMailbox } from "./interfaces/IMailbox.sol";
import { ByteHasher } from "./helpers/ByteHasher.sol";

// goerli to Optimism goerli
contract UserContractSender {
    uint32 public targetChain;
    // recipient; // Address of the recipient contract
    address public mailbox; // Mailbox contract in current chain
    IInterchainGasPaymaster igp; // InterchainGasPaymaster contract

    constructor(address _mailbox, address _interchainGasPaymaster,uint32 _targetChain) {
        mailbox = _mailbox;
        igp = IInterchainGasPaymaster(_interchainGasPaymaster);
        targetChain = _targetChain;
    }

    function structToBytesEncoded(CreateUserStruct calldata _owner) public pure returns (bytes memory)
    {
        bytes memory data = abi.encode(_owner);
        return data;
    }

    function createUserContract(CreateUserStruct calldata _owner, address recipient) external payable {
        bytes memory encodedData=structToBytesEncoded(_owner);
        bytes32 messageId = IMailbox(mailbox).dispatch(targetChain, ByteHasher.addressToBytes32(recipient), encodedData);
        igp.payForGas{value: msg.value}(
            messageId, // The ID of the message that was just dispatched
            targetChain, // The destination domain of the message
            550000,
            msg.sender // refunds go to msg.sender, who paid the msg.value
        );
    }

    function vaultInteract(DepositWithdrawStruct calldata _data, address recipient) external payable {
        bytes memory encodedData = abi.encode(_data);
        bytes32 messageId = IMailbox(mailbox).dispatch(targetChain, ByteHasher.addressToBytes32(recipient), encodedData);
        igp.payForGas{value: msg.value}(
            messageId, // The ID of the message that was just dispatched
            targetChain, // The destination domain of the message
            550000,
            msg.sender // refunds go to msg.sender, who paid the msg.value
        );
    }

    function quoteGasPayment() public view returns(uint256) {
        uint256 gasQuote = igp.quoteGasPayment(targetChain, 550000);
        return gasQuote;
    }
}