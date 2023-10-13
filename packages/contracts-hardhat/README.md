# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Goerli
```
// Deploy
npx hardhat run scripts/deploy.ts --network goerli
// Verify
npx hardhat verify --network Goerli 0x23745b67dF6485C7c01Ca450c2789aFAd1ef2a2D
```

## Mumbai
```
// Deploy
npx hardhat run scripts/deploy.ts --network polygonMumbai
// Verify
npx hardhat verify --network polygonMumbai 0x009F27f08f00429D45E11eD25CAf534883BF6Cb8
```

## Scroll
```
// Deploy
npx hardhat run scripts/deploy.ts --network scrollSepolia
// Verify
npx hardhat verify --network scrollSepolia 0x71A1df7BD134AD59C926D3f05D62425D66D18B66
```

## Mantel
```
// Deploy
npx hardhat run scripts/deploy.ts --network mantleTest
// Verify
npx hardhat verify --network mantleTest 0x71A1df7BD134AD59C926D3f05D62425D66D18B66
