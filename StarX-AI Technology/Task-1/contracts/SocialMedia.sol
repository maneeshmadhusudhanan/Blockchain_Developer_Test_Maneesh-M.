// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SocialMedia
 * @dev A decentralized social media platform smart contract
 * @dev Allows users to create posts and view posts by all users or specific users
 */
contract SocialMedia is Ownable {
    // Struct to represent a post
    struct Post {
        uint256 postId;
        address author;
        string content;
        uint256 timestamp;
        bool exists;
    }

    // State variables
    uint256 private _postCounter;
    mapping(uint256 => Post) private _posts;
    mapping(address => uint256[]) private _userPosts;

    // Events
    event PostCreated(
        uint256 indexed postId,
        address indexed author,
        string content,
        uint256 timestamp
    );

    event PostDeleted(uint256 indexed postId, address indexed author);

    // Modifiers
    modifier postExists(uint256 postId) {
        require(_posts[postId].exists, "Post does not exist");
        _;
    }

    modifier onlyPostAuthor(uint256 postId) {
        require(
            _posts[postId].author == msg.sender,
            "Only post author can perform this action"
        );
        _;
    }

    /**
     * @dev Constructor sets the contract deployer as the owner
     */
    constructor() Ownable(msg.sender) {}

    /**
     * @dev Create a new post
     * @param content The content of the post
     * @return postId The ID of the created post
     */
    function createPost(string memory content) public returns (uint256 postId) {
        require(bytes(content).length > 0, "Post content cannot be empty");
        require(
            bytes(content).length <= 1000,
            "Post content too long (max 1000 characters)"
        );

        _postCounter++;
        postId = _postCounter;

        Post memory newPost = Post({
            postId: postId,
            author: msg.sender,
            content: content,
            timestamp: block.timestamp,
            exists: true
        });

        _posts[postId] = newPost;
        _userPosts[msg.sender].push(postId);

        emit PostCreated(postId, msg.sender, content, block.timestamp);

        return postId;
    }

    /**
     * @dev Get a specific post by ID
     * @param postId The ID of the post to retrieve
     * @return author The address of the post author
     * @return content The content of the post
     * @return timestamp The timestamp when the post was created
     */
    function getPost(
        uint256 postId
    )
        public
        view
        postExists(postId)
        returns (address author, string memory content, uint256 timestamp)
    {
        Post memory post = _posts[postId];
        return (post.author, post.content, post.timestamp);
    }

    /**
     * @dev Get all posts by a specific user
     * @param user The address of the user
     * @return postIds Array of post IDs by the user
     */
    function getPostsByUser(
        address user
    ) public view returns (uint256[] memory postIds) {
        return _userPosts[user];
    }

    /**
     * @dev Get the total number of posts
     * @return The total number of posts created
     */
    function getTotalPosts() public view returns (uint256) {
        return _postCounter;
    }

    /**
     * @dev Get multiple posts by their IDs
     * @param postIds Array of post IDs to retrieve
     * @return authors Array of post authors
     * @return contents Array of post contents
     * @return timestamps Array of post timestamps
     */
    function getMultiplePosts(
        uint256[] memory postIds
    )
        public
        view
        returns (
            address[] memory authors,
            string[] memory contents,
            uint256[] memory timestamps
        )
    {
        authors = new address[](postIds.length);
        contents = new string[](postIds.length);
        timestamps = new uint256[](postIds.length);

        for (uint256 i = 0; i < postIds.length; i++) {
            if (_posts[postIds[i]].exists) {
                Post memory post = _posts[postIds[i]];
                authors[i] = post.author;
                contents[i] = post.content;
                timestamps[i] = post.timestamp;
            }
        }

        return (authors, contents, timestamps);
    }

    /**
     * @dev Delete a post (only by the author)
     * @param postId The ID of the post to delete
     */
    function deletePost(
        uint256 postId
    ) public postExists(postId) onlyPostAuthor(postId) {
        delete _posts[postId];

        // Remove from user's post list
        uint256[] storage userPostList = _userPosts[msg.sender];
        for (uint256 i = 0; i < userPostList.length; i++) {
            if (userPostList[i] == postId) {
                userPostList[i] = userPostList[userPostList.length - 1];
                userPostList.pop();
                break;
            }
        }

        emit PostDeleted(postId, msg.sender);
    }

    /**
     * @dev Emergency function to delete any post (only owner)
     * @param postId The ID of the post to delete
     */
    function emergencyDeletePost(
        uint256 postId
    ) public onlyOwner postExists(postId) {
        address author = _posts[postId].author;
        delete _posts[postId];

        // Remove from user's post list
        uint256[] storage userPostList = _userPosts[author];
        for (uint256 i = 0; i < userPostList.length; i++) {
            if (userPostList[i] == postId) {
                userPostList[i] = userPostList[userPostList.length - 1];
                userPostList.pop();
                break;
            }
        }

        emit PostDeleted(postId, author);
    }

    /**
     * @dev Get post details in a single call
     * @param postId The ID of the post
     * @return post The complete post struct
     */
    function getPostDetails(
        uint256 postId
    ) public view postExists(postId) returns (Post memory post) {
        return _posts[postId];
    }
}
