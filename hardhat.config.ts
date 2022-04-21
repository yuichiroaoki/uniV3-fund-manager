import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";
import "solidity-coverage";

import "./tasks/accounts";
import "./tasks/balance";
import "./tasks/block-number";
import { HardhatUserConfig } from "hardhat/types";

if (!process.env.RPC_URL) {
  throw new Error("Please set RPC_URL environment variable");
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.RPC_URL,
        blockNumber: 26420000,
      },
    },
  },
  mocha: {
    timeout: 200000,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

module.exports = config;
