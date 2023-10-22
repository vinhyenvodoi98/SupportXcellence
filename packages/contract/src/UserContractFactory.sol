// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./UserContract.sol";
import { ByteHasher } from "./helpers/ByteHasher.sol";
import { CreateUserStruct } from './helpers/Structs.sol';

contract UserFactory {
    using ByteHasher for bytes;
    mapping(address => address) public user;
    mapping(address => bool) public isHaveUser;
    address public mailbox;

    // Event
    event Received(uint32 origin, address sender, bytes body);

    constructor(
        address _mailbox
    ) {
        mailbox = _mailbox;
    }

    modifier onlyMailbox() {
        require(msg.sender == mailbox);
        _;
    }

    // create User contract
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes memory _body // don't need
    ) public onlyMailbox {
        address sender = ByteHasher.bytes32ToAddress(_sender);
        emit Received(_origin, sender, _body);
        CreateUserStruct memory data = abi.decode(_body,(CreateUserStruct));
        User newContract = new User(mailbox, data.owner);
        user[data.owner] = address(newContract);
    }
}
