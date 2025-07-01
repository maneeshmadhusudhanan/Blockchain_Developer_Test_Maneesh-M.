const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SocialMedia", function () {
  let socialMedia;
  let owner;
  let user1;
  let user2;
  let user3;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();

    const SocialMedia = await ethers.getContractFactory("SocialMedia");
    socialMedia = await SocialMedia.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await socialMedia.owner()).to.equal(owner.address);
    });

    it("Should start with 0 total posts", async function () {
      expect(await socialMedia.getTotalPosts()).to.equal(0);
    });
  });

  describe("Post Creation", function () {
    it("Should create a post successfully", async function () {
      const content = "Hello, World!";
      const tx = await socialMedia.connect(user1).createPost(content);
      const receipt = await tx.wait();
      // Ethers v6: decode event from logs
      const iface = (await ethers.getContractFactory("SocialMedia")).interface;
      const log = receipt.logs.find(
        (l) => l.topics[0] === iface.getEvent("PostCreated").topicHash
      );
      const event = iface.decodeEventLog("PostCreated", log.data, log.topics);
      expect(event.postId).to.equal(1);
      expect(event.author).to.equal(user1.address);
      expect(event.content).to.equal(content);
      // Allow timestamp to be within 2 seconds of block.timestamp
      const block = await ethers.provider.getBlock(receipt.blockNumber);
      expect(Number(event.timestamp)).to.be.closeTo(Number(block.timestamp), 2);

      const post = await socialMedia.getPost(1);
      expect(post.author).to.equal(user1.address);
      expect(post.content).to.equal(content);
      expect(post.exists).to.be.true;
    });

    it("Should increment post ID correctly", async function () {
      await socialMedia.connect(user1).createPost("First post");
      await socialMedia.connect(user2).createPost("Second post");

      expect(await socialMedia.getTotalPosts()).to.equal(2);

      const post1 = await socialMedia.getPost(1);
      const post2 = await socialMedia.getPost(2);

      expect(post1.author).to.equal(user1.address);
      expect(post2.author).to.equal(user2.address);
    });

    it("Should reject empty content", async function () {
      await expect(
        socialMedia.connect(user1).createPost("")
      ).to.be.revertedWith("SocialMedia: content cannot be empty");
    });

    it("Should reject content that is too long", async function () {
      const longContent = "a".repeat(1001);
      await expect(
        socialMedia.connect(user1).createPost(longContent)
      ).to.be.revertedWith("SocialMedia: content too long");
    });
  });

  describe("Post Retrieval", function () {
    beforeEach(async function () {
      await socialMedia.connect(user1).createPost("User 1 post");
      await socialMedia.connect(user2).createPost("User 2 post");
      await socialMedia.connect(user1).createPost("User 1 second post");
    });

    it("Should retrieve post by ID", async function () {
      const post = await socialMedia.getPost(1);
      expect(post.author).to.equal(user1.address);
      expect(post.content).to.equal("User 1 post");
      expect(post.exists).to.be.true;
    });

    it("Should return false for non-existent post", async function () {
      const post = await socialMedia.getPost(999);
      expect(post.exists).to.be.false;
      expect(post.author).to.equal(ethers.ZeroAddress);
    });

    it("Should get user posts correctly", async function () {
      const user1Posts = await socialMedia.getUserPosts(user1.address);
      const user2Posts = await socialMedia.getUserPosts(user2.address);

      expect(user1Posts).to.deep.equal([1, 3]);
      expect(user2Posts).to.deep.equal([2]);
    });
  });

  describe("Post Deletion", function () {
    beforeEach(async function () {
      await socialMedia.connect(user1).createPost("User 1 post");
      await socialMedia.connect(user2).createPost("User 2 post");
      await socialMedia.connect(user1).createPost("User 1 second post");
    });

    it("Should allow author to delete their own post", async function () {
      await expect(socialMedia.connect(user1).deletePost(1))
        .to.emit(socialMedia, "PostDeleted")
        .withArgs(1, user1.address);

      const post = await socialMedia.getPost(1);
      expect(post.exists).to.be.false;
    });

    it("Should prevent non-author from deleting post", async function () {
      await expect(socialMedia.connect(user2).deletePost(1)).to.be.revertedWith(
        "SocialMedia: caller is not the post author"
      );
    });

    it("Should prevent deletion of non-existent post", async function () {
      await expect(
        socialMedia.connect(user1).deletePost(999)
      ).to.be.revertedWith("SocialMedia: post does not exist");
    });

    it("Should remove post from user's post array when deleted", async function () {
      await socialMedia.connect(user1).deletePost(1);

      const user1Posts = await socialMedia.getUserPosts(user1.address);
      expect(user1Posts).to.deep.equal([3]);
    });

    it("Should allow owner to emergency delete any post", async function () {
      await expect(socialMedia.connect(owner).emergencyDeletePost(2))
        .to.emit(socialMedia, "EmergencyDelete")
        .withArgs(2, owner.address)
        .and.to.emit(socialMedia, "PostDeleted")
        .withArgs(2, user2.address);

      const post = await socialMedia.getPost(2);
      expect(post.exists).to.be.false;
    });

    it("Should prevent non-owner from emergency deleting", async function () {
      await expect(
        socialMedia.connect(user1).emergencyDeletePost(2)
      ).to.be.revertedWith("SocialMedia: caller is not the owner");
    });
  });

  describe("Gas Optimization Tests", function () {
    it("Should efficiently handle multiple post deletions", async function () {
      // Create multiple posts
      for (let i = 0; i < 5; i++) {
        await socialMedia.connect(user1).createPost(`Post ${i + 1}`);
      }

      // Delete posts in reverse order to test array manipulation efficiency
      for (let i = 5; i > 0; i--) {
        await socialMedia.connect(user1).deletePost(i);
      }

      const user1Posts = await socialMedia.getUserPosts(user1.address);
      expect(user1Posts).to.deep.equal([]);
    });

    it("Should maintain correct post count after deletions", async function () {
      await socialMedia.connect(user1).createPost("Post 1");
      await socialMedia.connect(user2).createPost("Post 2");
      await socialMedia.connect(user1).createPost("Post 3");

      expect(await socialMedia.getTotalPosts()).to.equal(3);

      await socialMedia.connect(user1).deletePost(1);
      await socialMedia.connect(user2).deletePost(2);

      // Total posts should remain the same (deletion doesn't affect counter)
      expect(await socialMedia.getTotalPosts()).to.equal(3);
    });
  });

  // Helper function to get current timestamp
  async function time() {
    const blockNum = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    return block.timestamp;
  }
});
