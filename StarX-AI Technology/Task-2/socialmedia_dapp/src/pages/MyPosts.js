import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

const MyPosts = ({ walletAddress, connectWallet, isConnected }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filter, setFilter] = useState("all"); // all, published, drafts
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalViews: 0,
    totalEarnings: 0,
  });

  // Mock user posts data
  const mockUserPosts = [
    {
      id: 1,
      author: walletAddress,
      content:
        "Just deployed my first smart contract! The feeling of creating something that lives on the blockchain is incredible. #Solidity #SmartContracts #Web3",
      timestamp: Date.now() - 3600000,
      likes: 45,
      dislikes: 2,
      comments: 12,
      isLiked: false,
      isDisliked: false,
      authorName: "You",
      authorAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
      status: "published",
      views: 234,
      earnings: 0.05,
    },
    {
      id: 2,
      author: walletAddress,
      content:
        "Working on a new DeFi protocol. The yield farming mechanics are getting complex but exciting! Anyone interested in beta testing?",
      timestamp: Date.now() - 7200000,
      likes: 23,
      dislikes: 1,
      comments: 8,
      isLiked: false,
      isDisliked: false,
      authorName: "You",
      authorAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
      status: "published",
      views: 156,
      earnings: 0.03,
    },
    {
      id: 3,
      author: walletAddress,
      content:
        "Draft: My thoughts on the future of decentralized social media...",
      timestamp: Date.now() - 10800000,
      likes: 0,
      dislikes: 0,
      comments: 0,
      isLiked: false,
      isDisliked: false,
      authorName: "You",
      authorAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
      status: "draft",
      views: 0,
      earnings: 0,
    },
  ];

  useEffect(() => {
    // Simulate loading user posts
    const loadUserPosts = () => {
      setTimeout(() => {
        setPosts(mockUserPosts);
        setLoading(false);
      }, 1000);
    };

    loadUserPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isConnected && walletAddress) {
      // Calculate stats
      const publishedPosts = posts.filter(
        (post) => post.status === "published"
      );
      const totalLikes = publishedPosts.reduce(
        (sum, post) => sum + post.likes,
        0
      );
      const totalViews = publishedPosts.reduce(
        (sum, post) => sum + post.views,
        0
      );
      const totalEarnings = publishedPosts.reduce(
        (sum, post) => sum + post.earnings,
        0
      );

      setStats({
        totalPosts: posts.length,
        totalLikes,
        totalViews,
        totalEarnings,
      });
    }
  }, [isConnected, walletAddress, posts]);

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
          const newDislikes = post.isDisliked
            ? post.dislikes - 1
            : post.dislikes;
          return {
            ...post,
            likes: newLikes,
            dislikes: newDislikes,
            isLiked: !post.isLiked,
            isDisliked: false,
          };
        }
        return post;
      })
    );
  };

  const handleDislike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newDislikes = post.isDisliked
            ? post.dislikes - 1
            : post.dislikes + 1;
          const newLikes = post.isLiked ? post.likes - 1 : post.likes;
          return {
            ...post,
            dislikes: newDislikes,
            likes: newLikes,
            isDisliked: !post.isDisliked,
            isLiked: false,
          };
        }
        return post;
      })
    );
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handlePublishDraft = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, status: "published" };
        }
        return post;
      })
    );
  };

  const filteredPosts = posts.filter((post) => {
    switch (filter) {
      case "published":
        return post.status === "published";
      case "drafts":
        return post.status === "draft";
      default:
        return true;
    }
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600 mb-6">
            Connect your wallet to view and manage your posts
          </p>
          <button
            onClick={connectWallet}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            My Posts
          </h1>
          <p className="text-gray-600">
            Manage and track your content performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
            <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">
              {stats.totalPosts}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
            <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
              {stats.totalLikes}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Total Likes</div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
              {stats.totalViews}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
              {stats.totalEarnings.toFixed(2)} ETH
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Total Earnings
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            + Create New Post
          </button>
          <div className="flex bg-white rounded-full p-1 shadow-lg overflow-x-auto">
            {["all", "published", "drafts"].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`whitespace-nowrap px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === filterOption
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Create New Post
                </h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <CreatePost
                account={walletAddress}
                onCreatePost={(content) => {
                  const newPost = {
                    id: Date.now(),
                    author: walletAddress,
                    content: content,
                    timestamp: Date.now(),
                    likes: 0,
                    dislikes: 0,
                    comments: 0,
                    isLiked: false,
                    isDisliked: false,
                    authorName: "You",
                    authorAvatar:
                      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
                    status: "published",
                    views: 0,
                    earnings: 0,
                  };
                  setPosts([newPost, ...posts]);
                  setShowCreatePost(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="relative">
                {post.status === "draft" && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                      Draft
                    </div>
                  </div>
                )}
                <PostCard
                  post={post}
                  onLike={() => handleLike(post.id)}
                  onDislike={() => handleDislike(post.id)}
                  isLiked={post.isLiked}
                  isDisliked={post.isDisliked}
                  account={walletAddress}
                  onComment={(postId, commentText) => {
                    console.log(`Comment on post ${postId}: ${commentText}`);
                  }}
                  onBookmark={(postId, isBookmarked) => {
                    console.log(
                      `Bookmark ${
                        isBookmarked ? "added" : "removed"
                      } for post ${postId}`
                    );
                  }}
                  onShare={(postId) => {
                    console.log(`Post ${postId} shared`);
                  }}
                />
                {/* Post Actions */}
                <div className="bg-white rounded-b-xl p-3 sm:p-4 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600">
                      <span>Views: {post.views}</span>
                      {post.status === "published" && (
                        <span>Earnings: {post.earnings.toFixed(3)} ETH</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {post.status === "draft" && (
                        <button
                          onClick={() => handlePublishDraft(post.id)}
                          className="bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors duration-300"
                        >
                          Publish
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === "drafts"
                ? "You have no drafts"
                : "Start creating your first post!"}
            </p>
            {filter !== "drafts" && (
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Your First Post
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
