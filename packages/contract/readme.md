```
forge script script/DeployUniswap.s.sol --private-key $PRIVATE_KEY --rpc-url https://rpc.ankr.com/eth_goerli --broadcast --legacy
```

forge verify-contract \
    --num-of-optimizations 200 \
    --watch \
    --verifier etherscan \
    --verifier-url https://api-sepolia.scrollscan.dev/api \
    --etherscan-api-key D62920783A4311EE9D6600155D570C742E \
    --compiler-version v0.8.20+commit.a1b79de6 \
    0x53c201173d3cd7c1c18efa29da167f3fb1859105 \
    PoolManager
