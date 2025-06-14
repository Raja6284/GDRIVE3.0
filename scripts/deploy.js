// const hre = require("hardhat");

// async function main() {
//   console.log("Starting deployment...");

//   const Upload = await hre.ethers.getContractFactory("Upload");
//   console.log("Contract factory obtained.");

//   const upload = await Upload.deploy();
//   console.log("Contract deployment transaction sent.");

//   await upload.waitForDeployment();
//   console.log("Upload contract deployed to:", upload.target);
// }

// main().catch((error) => {
//   console.error("Failed to deploy:", error);
//   process.exitCode = 1;
// });



const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying from:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", hre.ethers.formatEther(balance), "ETH");

  const Upload = await hre.ethers.getContractFactory("Upload");
  console.log("Contract factory obtained.");

  const upload = await Upload.deploy();
  console.log("Contract deployment transaction sent.");

  await upload.waitForDeployment();
  console.log("Upload contract deployed to:", upload.target);
}

main().catch((error) => {
  console.error("Failed to deploy:", error);
  process.exitCode = 1;
});
