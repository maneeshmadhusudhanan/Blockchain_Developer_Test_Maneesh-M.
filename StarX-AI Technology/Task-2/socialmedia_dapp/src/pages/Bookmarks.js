import React, { useState } from "react";

const Bookmarks = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock bookmarks data
  const mockBookmarks = [
    {
      id: 1,
      type: "post",
      title: "The Future of DeFi Protocols",
      content:
        "Just deployed my first smart contract! The future of DeFi is here. 🚀 #Blockchain #DeFi #SmartContracts",
      author: "CryptoDev",
      authorAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
      timestamp: Date.now() - 3600000,
      category: "technology",
    },
    {
      id: 2,
      type: "post",
      title: "NFT Marketplace Features",
      content:
        "Exploring the latest NFT marketplace features. The integration possibilities are endless! 🎨 #NFTs #Web3 #Innovation",
      author: "NFTArtist",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      timestamp: Date.now() - 7200000,
      category: "art",
    },
    {
      id: 3,
      type: "post",
      title: "Blockchain in Supply Chain",
      content:
        "The potential of blockchain technology in supply chain management is revolutionary. Transparency and traceability like never before! 📦 #Blockchain #SupplyChain #Innovation",
      author: "BlockchainBiz",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      timestamp: Date.now() - 10800000,
      category: "business",
    },
  ];

  const tabs = [
    { id: "all", label: "All Bookmarks", icon: "🔖" },
    { id: "technology", label: "Technology", icon: "💻" },
    { id: "art", label: "Art & NFTs", icon: "🎨" },
    { id: "business", label: "Business", icon: "💼" },
  ];

  const filteredBookmarks = mockBookmarks.filter(
    (bookmark) => activeTab === "all" || bookmark.category === activeTab
  );

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      technology: "💻",
      art: "🎨",
      business: "💼",
      default: "📄",
    };
    return icons[category] || icons.default;
  };

  const getCategoryColor = (category) => {
    const colors = {
      technology: "bg-blue-100 text-blue-800",
      art: "bg-purple-100 text-purple-800",
      business: "bg-green-100 text-green-800",
      default: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
              <p className="text-gray-600 mt-1">
                Your saved content and favorite posts
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {mockBookmarks.length}
              </div>
              <div className="text-sm text-gray-500">Total Bookmarks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔖</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No bookmarks found
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === "all"
                ? "Start bookmarking posts to see them here!"
                : `No bookmarks in the ${activeTab} category yet.`}
            </p>
            <button
              onClick={() => setActiveTab("all")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Bookmarks
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={bookmark.authorAvatar}
                      alt={bookmark.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {bookmark.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          by {bookmark.author} •{" "}
                          {formatTime(bookmark.timestamp)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          bookmark.category
                        )}`}
                      >
                        {getCategoryIcon(bookmark.category)} {bookmark.category}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {bookmark.content.length > 200
                        ? `${bookmark.content.slice(0, 200)}...`
                        : bookmark.content}
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                        <span>👍</span>
                        <span className="text-sm">Like</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                        <span>💬</span>
                        <span className="text-sm">Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                        <span>📤</span>
                        <span className="text-sm">Share</span>
                      </button>
                      <button className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors">
                        <span>🗑️</span>
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
