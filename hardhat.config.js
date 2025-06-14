require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // or use Alchemy
      accounts: [process.env.PRIVATE_KEY], // Make sure this private key is from the 0.3 ETH account
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
