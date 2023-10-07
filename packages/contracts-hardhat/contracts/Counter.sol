// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract Counter {
    uint256 private count; // Private variable to store the count

    constructor() {
        count = 0; // Initialize the count to 0
    }

    function getCount() public view returns (uint256) {
        return count; // Get the current count value
    }

    function increment() public {
        count += 2; // Increment the count by 1
    }

    function decrement() public {
        count -= 1; // Decrement the count by 1
    }
}
