// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { IInterchainGasPaymaster } from "./interfaces/IInterchainGasPaymaster.sol";
import { IMailbox } from "./interfaces/IMailbox.sol";
import { ByteHasher } from "./helpers/ByteHasher.sol";

contract User {
    uint32 public chainId;
    address public recipient; // Address of the recipient contract
    address public mailbox; // Mailbox contract in current chain
    IInterchainGasPaymaster igp; // InterchainGasPaymaster contract

    constructor(address _recipient, address _mailbox, address _interchainGasPaymaster, uint32 _chainId) {
        recipient = _recipient;
        mailbox = _mailbox;
        igp = IInterchainGasPaymaster(_interchainGasPaymaster);
        chainId = _chainId;
    }

    function structToBytesEncoded(uint256 _amount, address _receiver) public pure returns (bytes memory)
    {
        bytes memory data = abi.encode(_amount, _receiver);
        return data;
    }

    function deposit(uint256 _amount, address _receiver) external payable {
        bytes memory encodedData = structToBytesEncoded(_amount, _receiver);
        bytes32 messageId = IMailbox(mailbox).dispatch(chainId, ByteHasher.addressToBytes32(recipient), encodedData);
        igp.payForGas{value: msg.value}(
            messageId, // The ID of the message that was just dispatched
            chainId, // The destination domain of the message
            550000,
            msg.sender // refunds go to msg.sender, who paid the msg.value
        );
    }
}
