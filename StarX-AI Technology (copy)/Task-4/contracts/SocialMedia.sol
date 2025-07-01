// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SocialMedia
 * @dev Gas-optimized social media smart contract
 * @author Optimized for Task 4
 */
contract SocialMedia {
    // Events
    event PostCreated(uint256 indexed postId, address indexed author, string content, uint256 timestamp);
    event PostDeleted(uint256 indexed postId, address indexed author);
    event EmergencyDelete(uint256 indexed postId, address indexed deletedBy);

    // Gas optimization: Packed struct to save storage slots
    struct Post {
        uint128 postId;      // Reduced from uint256 - 2^128 posts is sufficient
        uint64 timestamp;    // Reduced from uint256 - timestamp fits in uint64 until year 2554
        address author;      // 20 bytes
        string content;      // Dynamic type
        // Removed 'exists' field - we can check if author != address(0)
    }

    // State variables
    uint256 private _nextPostId = 1;
    address private immutable _owner;
    
    // Mappings
    mapping(uint256 => Post) private _posts;
    mapping(address => uint256[]) private _userPosts;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == _owner, "SocialMedia: caller is not the owner");
        _;
    }

    modifier postExists(uint256 postId) {
        require(_posts[postId].author != address(0), "SocialMedia: post does not exist");
        _;
    }

    modifier onlyPostAuthor(uint256 postId) {
        require(_posts[postId].author == msg.sender, "SocialMedia: caller is not the post author");
        _;
    }

    // Constructor
    constructor() {
        _owner = msg.sender;
    }

    /**
     * @dev Creates a new post
     * @param content The content of the post
     * @return postId The ID of the created post
     */
    function createPost(string calldata content) external returns (uint256 postId) {
        require(bytes(content).length > 0, "SocialMedia: content cannot be empty");
        require(bytes(content).length <= 1000, "SocialMedia: content too long");

        postId = _nextPostId++;
        
        // Gas optimization: Create post struct directly
        _posts[postId] = Post({
            postId: uint128(postId),
            timestamp: uint64(block.timestamp),
            author: msg.sender,
            content: content
        });

        // Gas optimization: Push to array without checking length first
        _userPosts[msg.sender].push(postId);

        emit PostCreated(postId, msg.sender, content, block.timestamp);
    }

    /**
     * @dev Gets a post by ID
     * @param postId The ID of the post to retrieve
     * @return author The author of the post
     * @return content The content of the post
     * @return timestamp The timestamp when the post was created
     * @return exists Whether the post exists
     */
    function getPost(uint256 postId) external view returns (
        address author,
        string memory content,
        uint256 timestamp,
        bool exists
    ) {
        Post storage post = _posts[postId];
        exists = post.author != address(0);
        
        if (exists) {
            author = post.author;
            content = post.content;
            timestamp = post.timestamp;
        }
    }

    /**
     * @dev Gets all posts by a user
     * @param user The address of the user
     * @return postIds Array of post IDs by the user
     */
    function getUserPosts(address user) external view returns (uint256[] memory postIds) {
        return _userPosts[user];
    }

    /**
     * @dev Deletes a post (only by the author)
     * @param postId The ID of the post to delete
     */
    function deletePost(uint256 postId) external postExists(postId) onlyPostAuthor(postId) {
        _deletePostInternal(postId);
    }

    /**
     * @dev Emergency delete function (only owner)
     * @param postId The ID of the post to delete
     */
    function emergencyDeletePost(uint256 postId) external onlyOwner postExists(postId) {
        _deletePostInternal(postId);
        emit EmergencyDelete(postId, _owner);
    }

    /**
     * @dev Internal function to delete a post
     * @param postId The ID of the post to delete
     */
    function _deletePostInternal(uint256 postId) private {
        address author = _posts[postId].author;
        
        // Gas optimization: Clear the post by setting author to address(0)
        // This is cheaper than using delete keyword for the entire struct
        _posts[postId].author = address(0);
        
        // Gas optimization: Remove from user's post array efficiently
        uint256[] storage userPosts = _userPosts[author];
        uint256 userPostsLength = userPosts.length;
        
        // Find and remove the post ID from the array
        for (uint256 i = 0; i < userPostsLength; i++) {
            if (userPosts[i] == postId) {
                // Gas optimization: If it's the last element, just pop
                if (i == userPostsLength - 1) {
                    userPosts.pop();
                } else {
                    // Replace with the last element and pop (cheaper than shifting array)
                    userPosts[i] = userPosts[userPostsLength - 1];
                    userPosts.pop();
                }
                break;
            }
        }

        emit PostDeleted(postId, author);
    }

    /**
     * @dev Gets the total number of posts
     * @return The total number of posts created
     */
    function getTotalPosts() external view returns (uint256) {
        return _nextPostId - 1;
    }

    /**
     * @dev Gets the owner of the contract
     * @return The owner address
     */
    function owner() external view returns (address) {
        return _owner;
    }
} 