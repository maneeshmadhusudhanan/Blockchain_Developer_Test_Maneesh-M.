import React, { useState } from "react";

const FriendsSection = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const mockFriends = [
    {
      id: 1,
      username: "alice_crypto",
      displayName: "Alice Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "DeFi enthusiast and smart contract developer",
      mutualFriends: 12,
      isOnline: true,
      lastSeen: "2 minutes ago",
    },
    {
      id: 2,
      username: "bob_web3",
      displayName: "Bob Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "NFT artist and blockchain consultant",
      mutualFriends: 8,
      isOnline: false,
      lastSeen: "1 hour ago",
    },
    {
      id: 3,
      username: "crypto_carol",
      displayName: "Carol Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack developer specializing in Web3",
      mutualFriends: 15,
      isOnline: true,
      lastSeen: "5 minutes ago",
    },
  ];

  const mockFriendRequests = [
    {
      id: 4,
      username: "dave_eth",
      displayName: "Dave Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Ethereum developer and DeFi researcher",
      mutualFriends: 5,
      requestDate: "2 days ago",
    },
    {
      id: 5,
      username: "eve_solidity",
      displayName: "Eve Brown",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      bio: "Smart contract auditor and security expert",
      mutualFriends: 3,
      requestDate: "1 week ago",
    },
  ];

  const mockSuggestedFriends = [
    {
      id: 6,
      username: "frank_defi",
      displayName: "Frank Miller",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      bio: "DeFi protocol developer",
      mutualFriends: 7,
      commonInterests: ["DeFi", "Smart Contracts"],
    },
    {
      id: 7,
      username: "grace_nft",
      displayName: "Grace Lee",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      bio: "NFT marketplace founder",
      mutualFriends: 4,
      commonInterests: ["NFTs", "Web3"],
    },
  ];

  const tabs = [
    { id: "friends", label: "Friends", icon: "👥", count: mockFriends.length },
    {
      id: "requests",
      label: "Requests",
      icon: "📨",
      count: mockFriendRequests.length,
    },
    {
      id: "suggestions",
      label: "Suggestions",
      icon: "🔍",
      count: mockSuggestedFriends.length,
    },
  ];

  const handleAcceptRequest = (friendId) => {
    // In a real app, this would make an API call
    console.log("Accepting friend request:", friendId);
  };

  const handleRejectRequest = (friendId) => {
    // In a real app, this would make an API call
    console.log("Rejecting friend request:", friendId);
  };

  const handleAddFriend = (friendId) => {
    // In a real app, this would make an API call
    console.log("Adding friend:", friendId);
  };

  const handleRemoveFriend = (friendId) => {
    // In a real app, this would make an API call
    console.log("Removing friend:", friendId);
  };

  const renderFriendCard = (friend, type = "friend") => (
    <div
      key={friend.id}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={friend.avatar}
            alt={friend.displayName}
            className="w-16 h-16 rounded-full object-cover"
          />
          {friend.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {friend.displayName}
              </h3>
              <p className="text-sm text-gray-600">@{friend.username}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {friend.bio}
              </p>

              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>{friend.mutualFriends} mutual friends</span>
                {type === "friend" && (
                  <span
                    className={
                      friend.isOnline ? "text-green-600" : "text-gray-500"
                    }
                  >
                    {friend.isOnline ? "Online" : friend.lastSeen}
                  </span>
                )}
                {type === "request" && <span>{friend.requestDate}</span>}
              </div>

              {type === "suggestion" && friend.commonInterests && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {friend.commonInterests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2 ml-4">
              {type === "friend" && (
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}

              {type === "request" && (
                <>
                  <button
                    onClick={() => handleAcceptRequest(friend.id)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRequest(friend.id)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Decline
                  </button>
                </>
              )}

              {type === "suggestion" && (
                <button
                  onClick={() => handleAddFriend(friend.id)}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add Friend
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "friends":
        return (
          <div className="space-y-4">
            {mockFriends.map((friend) => renderFriendCard(friend, "friend"))}
          </div>
        );
      case "requests":
        return (
          <div className="space-y-4">
            {mockFriendRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No friend requests
                </h3>
                <p className="text-gray-600">You're all caught up!</p>
              </div>
            ) : (
              mockFriendRequests.map((friend) =>
                renderFriendCard(friend, "request")
              )
            )}
          </div>
        );
      case "suggestions":
        return (
          <div className="space-y-4">
            {mockSuggestedFriends.map((friend) =>
              renderFriendCard(friend, "suggestion")
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Friends</h2>
            <p className="text-gray-600 mt-1">
              Manage your connections and discover new friends
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {userProfile?.friends || 0}
            </div>
            <div className="text-sm text-gray-500">Total Friends</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
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
                {tab.count > 0 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default FriendsSection;
