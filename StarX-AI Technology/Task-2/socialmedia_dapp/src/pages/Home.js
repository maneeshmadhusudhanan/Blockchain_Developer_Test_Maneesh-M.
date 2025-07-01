import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

const Home = ({
  walletAddress,
  connectWallet,
  isConnected,
  posts,
  onLike,
  onDislike,
  onCreatePost,
}) => {
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filter, setFilter] = useState("all"); // all, following, trending

  useEffect(() => {
    // Simulate loading posts
    const loadPosts = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    loadPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleComment = (postId, commentText) => {
    // In a real app, this would save the comment to the blockchain
    console.log(`Comment on post ${postId}: ${commentText}`);
  };

  const handleBookmark = (postId, isBookmarked) => {
    // In a real app, this would save the bookmark to the blockchain
    console.log(
      `Bookmark ${isBookmarked ? "added" : "removed"} for post ${postId}`
    );
  };

  const handleShare = (postId) => {
    // In a real app, this would track share analytics
    console.log(`Post ${postId} shared`);
  };

  const filteredPosts = posts.filter((post) => {
    switch (filter) {
      case "following":
        // In a real app, this would filter by followed users
        return post.author === walletAddress || Math.random() > 0.5;
      case "trending":
        return post.likes > 20;
      default:
        return true;
    }
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Hero
          walletAddress={walletAddress}
          connectWallet={connectWallet}
          isConnected={isConnected}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <Hero
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        isConnected={isConnected}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            + Create Post
          </button>
          <div className="flex bg-white rounded-full p-1 shadow-lg overflow-x-auto">
            {["all", "following", "trending"].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`whitespace-nowrap px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === filterOption
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
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
                onCreatePost={(content) => {
                  onCreatePost(content);
                  setShowCreatePost(false);
                }}
                account={walletAddress}
              />
            </div>
          </div>
        )}

        {/* Posts Feed */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => onLike(post.id)}
                onDislike={() => onDislike(post.id)}
                onComment={handleComment}
                onBookmark={handleBookmark}
                onShare={handleShare}
                account={walletAddress}
                isLiked={post.isLiked}
                isDisliked={post.isDisliked}
              />
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
              {filter === "following"
                ? "Follow some users to see their posts here!"
                : "Be the first to create a post!"}
            </p>
            {filter !== "following" && (
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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

export default Home;
