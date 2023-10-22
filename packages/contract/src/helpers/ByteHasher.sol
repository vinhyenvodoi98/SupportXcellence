// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library ByteHasher {
	/// @dev Creates a keccak256 hash of a bytestring.
	/// @param value The bytestring to hash
	/// @return The hash of the specified value
	/// @dev `>> 8` makes sure that the result is included in our field
	function hashToField(bytes memory value) internal pure returns (uint256) {
		return uint256(keccak256(abi.encodePacked(value))) >> 8;
	}

	/// @dev convert address to bytes32
	/// @param _addr input address
	/// @return The bytes32 value
	/// @dev `>> 8` makes sure that the result is included in our field
	function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
	}

    /// @dev decode address from bytes
	/// @param _buf input bytes
	/// @return The address
	function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
	}
}
