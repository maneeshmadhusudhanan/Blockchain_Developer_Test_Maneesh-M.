import React, { useState, useEffect } from "react";

const Explore = ({ walletAddress, connectWallet, isConnected }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      author: "0x1234...5678",
      content:
        "Just deployed my first smart contract! 🚀 The feeling of creating something that lives on the blockchain is incredible. What do you think about the future of decentralized social media? #Solidity #SmartContracts #Web3",
      timestamp: Date.now() - 3600000,
      likes: 45,
      dislikes: 2,
      comments: 12,
      category: "development",
      authorName: "CryptoDev",
      authorAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      author: "0x8765...4321",
      content:
        "Building the future of Web3 social media! Our platform will revolutionize how we interact online. Privacy, ownership, and decentralization - that's what matters. #Web3 #SocialMedia #Privacy",
      timestamp: Date.now() - 7200000,
      likes: 23,
      dislikes: 1,
      comments: 8,
      category: "web3",
      authorName: "Web3Builder",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      author: "0x9876...5432",
      content:
        "The NFT market is evolving rapidly! From art to gaming to real estate, the possibilities are endless. What's your favorite NFT use case? #NFT #DigitalArt #Blockchain",
      timestamp: Date.now() - 10800000,
      likes: 67,
      dislikes: 3,
      comments: 15,
      category: "nft",
      authorName: "NFTEnthusiast",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      author: "0x5432...9876",
      content:
        "Smart contracts are the backbone of DeFi. Understanding them is crucial for anyone in the crypto space. Let's discuss best practices! #DeFi #SmartContracts #Crypto",
      timestamp: Date.now() - 14400000,
      likes: 34,
      dislikes: 1,
      comments: 6,
      category: "defi",
      authorName: "SmartContractDev",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const categories = [
    { id: "all", name: "All Posts", icon: "🌐" },
    { id: "development", name: "Development", icon: "💻" },
    { id: "web3", name: "Web3", icon: "🔗" },
    { id: "nft", name: "NFTs", icon: "🎨" },
    { id: "defi", name: "DeFi", icon: "💰" },
    { id: "gaming", name: "Gaming", icon: "🎮" },
    { id: "trading", name: "Trading", icon: "📈" },
  ];

  useEffect(() => {
    // Simulate loading posts
    const loadPosts = () => {
      setTimeout(() => {
        setPosts(mockPosts);
        setLoading(false);
      }, 1000);
    };

    loadPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Connect your wallet to explore posts and discover amazing content.
          </p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Explore
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing content from the decentralized social network
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts, users, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {searchTerm || selectedCategory !== "all"
                ? "Search Results"
                : "Popular Posts"}
            </h2>
            <span className="text-gray-600">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}{" "}
              found
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {post.authorName}
                          </h3>
                          <p className="text-gray-500 text-xs sm:text-sm truncate">
                            {post.author}
                          </p>
                        </div>
                        <span className="text-gray-400 text-xs sm:text-sm">
                          {new Date(post.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4 sm:p-6">
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>

                {/* Post Stats */}
                <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span>👁️ {Math.floor(Math.random() * 1000)} views</span>
                      <span>💬 {post.comments} comments</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span>👍 {post.likes}</span>
                      <span>👎 {post.dislikes}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300">
                        <span className="text-lg sm:text-xl">👍</span>
                        <span className="text-xs sm:text-sm">Like</span>
                      </button>
                      <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300">
                        <span className="text-lg sm:text-xl">💬</span>
                        <span className="text-xs sm:text-sm">Comment</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300">
                      <span className="text-lg sm:text-xl">📤</span>
                      <span className="hidden sm:inline text-xs sm:text-sm">
                        Share
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or category filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
