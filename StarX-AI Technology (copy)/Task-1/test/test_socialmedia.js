const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SocialMedia", function () {
  let socialMedia;
  let owner;
  let user1;
  let user2;
  let user3;

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2, user3] = await ethers.getSigners();

    // Deploy the contract
    const SocialMedia = await ethers.getContractFactory("SocialMedia");
    socialMedia = await SocialMedia.deploy();
    await socialMedia.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await socialMedia.owner()).to.equal(owner.address);
    });

    it("Should start with 0 posts", async function () {
      expect(await socialMedia.getTotalPosts()).to.equal(0);
    });
  });

  describe("Post Creation", function () {
    it("Should create a post successfully", async function () {
      const content = "Hello, StarX Social Media!";

      await expect(socialMedia.connect(user1).createPost(content))
        .to.emit(socialMedia, "PostCreated")
        .withArgs(1, user1.address, content, anyUint());

      expect(await socialMedia.getTotalPosts()).to.equal(1);

      const [author, postContent, timestamp] = await socialMedia.getPost(1);
      expect(author).to.equal(user1.address);
      expect(postContent).to.equal(content);
      expect(timestamp).to.be.gt(0);
    });

    it("Should increment post counter correctly", async function () {
      await socialMedia.connect(user1).createPost("First post");
      await socialMedia.connect(user2).createPost("Second post");
      await socialMedia.connect(user1).createPost("Third post");

      expect(await socialMedia.getTotalPosts()).to.equal(3);
    });

    it("Should reject empty content", async function () {
      await expect(
        socialMedia.connect(user1).createPost("")
      ).to.be.revertedWith("Post content cannot be empty");
    });

    it("Should reject content that is too long", async function () {
      const longContent = "A".repeat(1001);
      await expect(
        socialMedia.connect(user1).createPost(longContent)
      ).to.be.revertedWith("Post content too long (max 1000 characters)");
    });
  });

  describe("Post Retrieval", function () {
    beforeEach(async function () {
      await socialMedia.connect(user1).createPost("User 1 post 1");
      await socialMedia.connect(user2).createPost("User 2 post 1");
      await socialMedia.connect(user1).createPost("User 1 post 2");
      await socialMedia.connect(user3).createPost("User 3 post 1");
    });

    it("Should retrieve a specific post correctly", async function () {
      const [author, content, timestamp] = await socialMedia.getPost(2);
      expect(author).to.equal(user2.address);
      expect(content).to.equal("User 2 post 1");
      expect(timestamp).to.be.gt(0);
    });

    it("Should get all posts by a specific user", async function () {
      const user1Posts = await socialMedia.getPostsByUser(user1.address);
      expect(user1Posts).to.have.length(2);
      expect(user1Posts[0]).to.equal(1);
      expect(user1Posts[1]).to.equal(3);
    });

    it("Should return empty array for user with no posts", async function () {
      const [newUser] = await ethers.getSigners();
      const newUserPosts = await socialMedia.getPostsByUser(newUser.address);
      expect(newUserPosts).to.have.length(0);
    });

    it("Should get multiple posts by IDs", async function () {
      const postIds = [1, 2, 3];
      const [authors, contents, timestamps] =
        await socialMedia.getMultiplePosts(postIds);

      expect(authors).to.have.length(3);
      expect(contents).to.have.length(3);
      expect(timestamps).to.have.length(3);

      expect(authors[0]).to.equal(user1.address);
      expect(authors[1]).to.equal(user2.address);
      expect(authors[2]).to.equal(user1.address);

      expect(contents[0]).to.equal("User 1 post 1");
      expect(contents[1]).to.equal("User 2 post 1");
      expect(contents[2]).to.equal("User 1 post 2");
    });

    it("Should get complete post details", async function () {
      const postDetails = await socialMedia.getPostDetails(1);
      expect(postDetails.postId).to.equal(1);
      expect(postDetails.author).to.equal(user1.address);
      expect(postDetails.content).to.equal("User 1 post 1");
      expect(postDetails.timestamp).to.be.gt(0);
      expect(postDetails.exists).to.be.true;
    });
  });

  describe("Post Deletion", function () {
    beforeEach(async function () {
      await socialMedia.connect(user1).createPost("Post to delete");
      await socialMedia.connect(user2).createPost("Another post");
    });

    it("Should allow post author to delete their post", async function () {
      await expect(socialMedia.connect(user1).deletePost(1))
        .to.emit(socialMedia, "PostDeleted")
        .withArgs(1, user1.address);

      await expect(socialMedia.getPost(1)).to.be.revertedWith(
        "Post does not exist"
      );
    });

    it("Should prevent non-author from deleting post", async function () {
      await expect(socialMedia.connect(user2).deletePost(1)).to.be.revertedWith(
        "Only post author can perform this action"
      );
    });

    it("Should prevent deletion of non-existent post", async function () {
      await expect(
        socialMedia.connect(user1).deletePost(999)
      ).to.be.revertedWith("Post does not exist");
    });

    it("Should remove post from user's post list when deleted", async function () {
      const user1PostsBefore = await socialMedia.getPostsByUser(user1.address);
      expect(user1PostsBefore).to.have.length(1);

      await socialMedia.connect(user1).deletePost(1);

      const user1PostsAfter = await socialMedia.getPostsByUser(user1.address);
      expect(user1PostsAfter).to.have.length(0);
    });
  });

  describe("Access Control", function () {
    beforeEach(async function () {
      await socialMedia.connect(user1).createPost("Test post");
    });

    it("Should allow owner to emergency delete any post", async function () {
      await expect(socialMedia.connect(owner).emergencyDeletePost(1))
        .to.emit(socialMedia, "PostDeleted")
        .withArgs(1, user1.address);

      await expect(socialMedia.getPost(1)).to.be.revertedWith(
        "Post does not exist"
      );
    });

    it("Should prevent non-owner from emergency deleting posts", async function () {
      await expect(
        socialMedia.connect(user2).emergencyDeletePost(1)
      ).to.be.revertedWithCustomError(
        socialMedia,
        "OwnableUnauthorizedAccount"
      );
    });

    it("Should prevent emergency deletion of non-existent post", async function () {
      await expect(
        socialMedia.connect(owner).emergencyDeletePost(999)
      ).to.be.revertedWith("Post does not exist");
    });
  });

  describe("Edge Cases", function () {
    it("Should handle maximum content length", async function () {
      const maxContent = "A".repeat(1000);
      await expect(socialMedia.connect(user1).createPost(maxContent)).to.emit(
        socialMedia,
        "PostCreated"
      );
    });

    it("Should handle special characters in content", async function () {
      const specialContent = "Hello! @#$%^&*()_+-=[]{}|;':\",./<>?";
      await expect(
        socialMedia.connect(user1).createPost(specialContent)
      ).to.emit(socialMedia, "PostCreated");
    });

    it("Should handle unicode characters", async function () {
      const unicodeContent = "Hello 世界! 🌍 🚀";
      await expect(
        socialMedia.connect(user1).createPost(unicodeContent)
      ).to.emit(socialMedia, "PostCreated");
    });
  });

  describe("Event Emission", function () {
    it("Should emit PostCreated event with correct parameters", async function () {
      const content = "Test post content";
      const tx = await socialMedia.connect(user1).createPost(content);
      const receipt = await tx.wait();

      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "PostCreated"
      );

      expect(event).to.not.be.undefined;
      expect(event.args.postId).to.equal(1);
      expect(event.args.author).to.equal(user1.address);
      expect(event.args.content).to.equal(content);
      expect(event.args.timestamp).to.be.gt(0);
    });

    it("Should emit PostDeleted event with correct parameters", async function () {
      await socialMedia.connect(user1).createPost("Post to delete");

      const tx = await socialMedia.connect(user1).deletePost(1);
      const receipt = await tx.wait();

      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "PostDeleted"
      );

      expect(event).to.not.be.undefined;
      expect(event.args.postId).to.equal(1);
      expect(event.args.author).to.equal(user1.address);
    });
  });
});

// Helper function to get current timestamp
async function time() {
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  return block.timestamp;
}

// Helper matcher for any uint
function anyUint() {
  return (value) => typeof value === "bigint" || typeof value === "number";
}
