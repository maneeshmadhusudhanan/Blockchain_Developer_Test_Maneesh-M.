const hre = require("hardhat");

async function main() {
  console.log("Deploying SocialMedia contract...");

  const SocialMedia = await hre.ethers.getContractFactory("SocialMedia");
  const socialMedia = await SocialMedia.deploy();

  await socialMedia.deployed();

  console.log("SocialMedia deployed to:", socialMedia.address);
  console.log("Owner:", await socialMedia.owner());
  console.log("Total posts:", await socialMedia.getTotalPosts());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
