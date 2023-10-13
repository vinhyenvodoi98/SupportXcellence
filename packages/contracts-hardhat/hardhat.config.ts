import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GOERLY_ETHERSCAN = process.env.GOERLY_ETHERSCAN;
const MUMBAI_ETHERSCAN = process.env.MUMBAI_ETHERSCAN;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [PRIVATE_KEY as string],
      chainId: 5,
    },
    mumbai: {
      url: "https://polygon-testnet.public.blastapi.io",
      accounts: [PRIVATE_KEY as string],
      chainId: 80001,
    },
    scrollSepolia:{
      url: "https://rpc.ankr.com/scroll_sepolia_testnet",
      accounts: [PRIVATE_KEY as string],
      chainId: 534351,
    },
    mantleTest:{
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [PRIVATE_KEY as string],
      chainId: 5001,
    }
  },
  etherscan: {
    apiKey: {
      goerli: GOERLY_ETHERSCAN as string,
      polygonMumbai: MUMBAI_ETHERSCAN as string,
      scrollSepolia: GOERLY_ETHERSCAN as string,
      mantleTest: GOERLY_ETHERSCAN as string,
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
      {
        network: "mantleTest",
        chainId: 5001,
        urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz"
        }
      }
    ],
  }
};

export default config;
