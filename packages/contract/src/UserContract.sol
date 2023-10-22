// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { ByteHasher } from "./helpers/ByteHasher.sol";

contract User {
    using ByteHasher for bytes;
    address public owner;

    // https://docs.hyperlane.xyz/docs/~/changes/LJxk6XmpcGjYBq0KKOFZ/resources/addresses
    address public mailbox;

    constructor (address _mailbox, address _owner) {
        mailbox = _mailbox;
        owner = _owner;
    }

    modifier onlyMailbox() {
        require(msg.sender == mailbox);
        _;
    }

    // // handle deposit, withdraw
    // function handle(
    //     uint32 _origin,
    //     bytes32 _sender,
    //     bytes memory _body
    // ) public onlyMailbox{
    //     address sender = ByteHasher.bytes32ToAddress(_sender);
    //     PlaceStruct memory _place = abi.decode(_body,());
    // }
}
