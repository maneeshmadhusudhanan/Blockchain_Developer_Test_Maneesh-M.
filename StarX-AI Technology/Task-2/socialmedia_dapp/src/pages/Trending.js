import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

const Trending = ({ walletAddress, connectWallet, isConnected }) => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState("all");

  // Mock trending topics
  const mockTopics = [
    { id: "defi", name: "DeFi", count: 1250, emoji: "💰" },
    { id: "nft", name: "NFTs", count: 890, emoji: "🎨" },
    { id: "web3", name: "Web3", count: 756, emoji: "🌐" },
    { id: "dao", name: "DAOs", count: 432, emoji: "🏛️" },
    { id: "metaverse", name: "Metaverse", count: 678, emoji: "🕶️" },
    { id: "blockchain", name: "Blockchain", count: 543, emoji: "⛓️" },
  ];

  // Mock trending posts
  const mockPosts = [
    {
      id: 1,
      author: "0x1234...5678",
      content:
        "🚀 BREAKING: New DeFi protocol just launched with 500% APY! The yield farming opportunities are insane. DYOR but this could be the next big thing! #DeFi #YieldFarming #Crypto",
      timestamp: Date.now() - 1800000,
      likes: 1256,
      dislikes: 45,
      comments: 234,
      isLiked: false,
      isDisliked: false,
      authorName: "CryptoWhale",
      authorAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
      topic: "defi",
      trending: true,
    },
    {
      id: 2,
      author: "0x8765...4321",
      content:
        "🎨 Just minted my first NFT collection! 10,000 unique pieces with AI-generated art. Floor price already at 2 ETH! The future of digital art is here. #NFT #DigitalArt #AI",
      timestamp: Date.now() - 3600000,
      likes: 892,
      dislikes: 23,
      comments: 156,
      isLiked: false,
      isDisliked: false,
      authorName: "NFTArtist",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      topic: "nft",
      trending: true,
    },
    {
      id: 3,
      author: "0x9876...5432",
      content:
        "🌐 Web3 is not just a buzzword anymore! We're building the decentralized future where users own their data. Privacy, security, and freedom - that's what Web3 delivers. #Web3 #Privacy #Decentralization",
      timestamp: Date.now() - 5400000,
      likes: 678,
      dislikes: 12,
      comments: 89,
      isLiked: false,
      isDisliked: false,
      authorName: "Web3Pioneer",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      topic: "web3",
      trending: true,
    },
    {
      id: 4,
      author: "0x5432...9876",
      content:
        "🏛️ DAOs are revolutionizing governance! Our community just voted on a major protocol upgrade with 95% approval. This is democracy in action, powered by smart contracts. #DAO #Governance #DeFi",
      timestamp: Date.now() - 7200000,
      likes: 445,
      dislikes: 8,
      comments: 67,
      isLiked: false,
      isDisliked: false,
      authorName: "DAOLeader",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      topic: "dao",
      trending: true,
    },
    {
      id: 5,
      author: "0x1111...2222",
      content:
        "🕶️ The metaverse is expanding rapidly! Virtual real estate sales hit $500M this month. I just bought a plot in the most exclusive virtual district. The future is virtual! #Metaverse #VirtualRealEstate #VR",
      timestamp: Date.now() - 9000000,
      likes: 567,
      dislikes: 15,
      comments: 78,
      isLiked: false,
      isDisliked: false,
      authorName: "MetaverseExplorer",
      authorAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      topic: "metaverse",
      trending: true,
    },
  ];

  useEffect(() => {
    // Simulate loading trending posts
    const loadTrendingPosts = () => {
      setTimeout(() => {
        setTrendingPosts(mockPosts);
        setTrendingTopics(mockTopics);
        setLoading(false);
      }, 1000);
    };

    loadTrendingPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLike = (postId) => {
    setTrendingPosts(
      trendingPosts.map((post) => {
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
    setTrendingPosts(
      trendingPosts.map((post) => {
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

  const filteredPosts =
    selectedTopic === "all"
      ? trendingPosts
      : trendingPosts.filter((post) => post.topic === selectedTopic);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔥</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600 mb-6">
            Connect your wallet to see what's trending
          </p>
          <button
            onClick={connectWallet}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            🔥 Trending
          </h1>
          <p className="text-gray-600">
            See what's hot in the crypto community
          </p>
        </div>

        {/* Trending Topics */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
            Trending Topics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <button
              onClick={() => setSelectedTopic("all")}
              className={`p-3 sm:p-4 rounded-xl text-center transition-all duration-300 ${
                selectedTopic === "all"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                  : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🔥</div>
              <div className="font-semibold text-sm sm:text-base">All</div>
              <div className="text-xs sm:text-sm opacity-75">Trending</div>
            </button>
            {trendingTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`p-3 sm:p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedTopic === topic.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                    : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                  {topic.emoji}
                </div>
                <div className="font-semibold text-sm sm:text-base">
                  {topic.name}
                </div>
                <div className="text-xs sm:text-sm opacity-75">
                  {topic.count} posts
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Posts */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
            Trending Posts
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="relative">
                  {index < 3 && (
                    <div className="absolute -top-2 -left-2 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        #{index + 1} Trending
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
                </div>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No trending posts
              </h3>
              <p className="text-gray-600">Try selecting a different topic</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trending;
