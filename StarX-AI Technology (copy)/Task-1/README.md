# StarX Social Media DApp - Smart Contract

A decentralized social media platform built on Ethereum using Solidity smart contracts. This project allows users to create, view, and manage posts in a decentralized manner.

## 🚀 Features

- **Post Creation**: Users can create posts with content (max 1000 characters)
- **Post Retrieval**: View posts by ID or get all posts by a specific user
- **Post Management**: Authors can delete their own posts
- **Access Control**: Admin functions for emergency post deletion
- **Event Emission**: Real-time events for post creation and deletion
- **Gas Efficient**: Optimized for minimal gas consumption

## 📋 Contract Functions

### Core Functions

- `createPost(string content)` - Create a new post
- `getPost(uint256 postId)` - Get a specific post by ID
- `getPostsByUser(address user)` - Get all posts by a specific user
- `getTotalPosts()` - Get the total number of posts
- `deletePost(uint256 postId)` - Delete a post (author only)

### Admin Functions

- `emergencyDeletePost(uint256 postId)` - Emergency delete any post (owner only)

### Utility Functions

- `getMultiplePosts(uint256[] postIds)` - Get multiple posts at once
- `getPostDetails(uint256 postId)` - Get complete post details

## 🏗️ Contract Architecture

### Data Structures

```solidity
struct Post {
    uint256 postId;
    address author;
    string content;
    uint256 timestamp;
    bool exists;
}
```

### State Variables

- `_postCounter` - Tracks total number of posts
- `_posts` - Mapping of post ID to Post struct
- `_userPosts` - Mapping of user address to array of post IDs

### Events

- `PostCreated(uint256 postId, address author, string content, uint256 timestamp)`
- `PostDeleted(uint256 postId, address author)`

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hardhat

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd starx-social-media-dapp
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=your_sepolia_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test
```

The test suite includes:
- ✅ Post creation and validation
- ✅ Post retrieval and querying
- ✅ Access control and permissions
- ✅ Event emission verification
- ✅ Edge cases and error handling

### Test Coverage

- **Post Creation**: 4 test cases
- **Post Retrieval**: 5 test cases
- **Post Deletion**: 4 test cases
- **Access Control**: 3 test cases
- **Edge Cases**: 3 test cases
- **Event Emission**: 2 test cases

## 🚀 Deployment

### Local Development

1. Start local Hardhat node:
```bash
npx hardhat node
```

2. Deploy to local network:
```bash
npm run deploy:local
```

### Sepolia Testnet

1. Ensure you have Sepolia ETH in your wallet
2. Configure your environment variables
3. Deploy to Sepolia:
```bash
npm run deploy:sepolia
```

### Contract Verification

After deployment, verify your contract on Etherscan:

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## 📊 Contract Addresses

### Sepolia Testnet
- **Contract Address**: `0x...` (To be deployed)
- **Owner**: `0x...` (Deployer address)
- **Network**: Sepolia Testnet
- **Block Explorer**: [Etherscan Sepolia](https://sepolia.etherscan.io/)

## 🔧 Usage Examples

### Creating a Post
```javascript
const content = "Hello, StarX Social Media! 🚀";
const tx = await socialMedia.createPost(content);
await tx.wait();
```

### Getting a Post
```javascript
const [author, content, timestamp] = await socialMedia.getPost(1);
console.log(`Post by ${author}: ${content}`);
```

### Getting User Posts
```javascript
const userPosts = await socialMedia.getPostsByUser(userAddress);
console.log(`User has ${userPosts.length} posts`);
```

### Deleting a Post
```javascript
const tx = await socialMedia.deletePost(1);
await tx.wait();
```

## 🔒 Security Features

- **Access Control**: Uses OpenZeppelin's `Ownable` for admin functions
- **Input Validation**: Content length limits and empty content checks
- **Authorization**: Only post authors can delete their posts
- **Emergency Functions**: Owner can delete any post if needed
- **Gas Optimization**: Efficient storage patterns and function design

## 📈 Gas Optimization

- Efficient storage mapping patterns
- Minimal state changes
- Optimized function parameters
- Batch operations for multiple post retrieval

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- Post likes and reactions
- Comment system
- User profiles
- Content moderation
- Token integration
- Social features (following, feeds)

---

**Built with ❤️ for the decentralized web** 