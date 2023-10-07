import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    Goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [PRIVATE_KEY as string],
    },
    Mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [PRIVATE_KEY as string],
    },
  }
};

export default config;
