const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SocialMedia contract...");

  // Get the contract factory
  const SocialMedia = await ethers.getContractFactory("SocialMedia");

  // Deploy the contract
  const socialMedia = await SocialMedia.deploy();
  await socialMedia.waitForDeployment();

  const contractAddress = await socialMedia.getAddress();
  const owner = await socialMedia.owner();

  console.log("SocialMedia deployed successfully!");
  console.log("Contract address:", contractAddress);
  console.log("Owner address:", owner);
  console.log("Network:", network.name);

  // Verify the deployment
  console.log("\nVerifying deployment...");
  const totalPosts = await socialMedia.getTotalPosts();
  console.log("Initial total posts:", totalPosts.toString());

  // Create a test post to verify functionality
  console.log("\nCreating a test post...");
  const testContent = "Welcome to StarX Social Media! 🚀";
  const tx = await socialMedia.createPost(testContent);
  await tx.wait();

  const postId = await socialMedia.getTotalPosts();
  console.log("Test post created with ID:", postId.toString());

  const [author, content, timestamp] = await socialMedia.getPost(1);
  console.log("Test post details:");
  console.log("- Author:", author);
  console.log("- Content:", content);
  console.log("- Timestamp:", timestamp.toString());

  console.log("\nDeployment completed successfully!");
  console.log("Contract is ready for use on", network.name);
}

// Handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
