import React, { useState } from "react";

const Sidebar = ({
  walletAddress,
  isConnected,
  currentPage,
  setCurrentPage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: "home", name: "Home", icon: "🏠", description: "Your feed" },
    {
      id: "explore",
      name: "Explore",
      icon: "🔍",
      description: "Discover content",
    },
    { id: "trending", name: "Trending", icon: "🔥", description: "What's hot" },
    {
      id: "dashboard",
      name: "Dashboard",
      icon: "📊",
      description: "Your profile",
    },
    {
      id: "myposts",
      name: "My Posts",
      icon: "📝",
      description: "Your content",
    },
    {
      id: "bookmarks",
      name: "Bookmarks",
      icon: "🔖",
      description: "Saved posts",
    },
    { id: "about", name: "About", icon: "ℹ️", description: "Learn more" },
  ];

  const stats = [
    { label: "Posts", value: "24", icon: "📝" },
    { label: "Followers", value: "1.2K", icon: "👥" },
    { label: "Following", value: "856", icon: "👤" },
    { label: "Earnings", value: "2.4 ETH", icon: "💰" },
  ];

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div
      className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } fixed left-0 top-16 h-full z-40 hidden lg:block`}
    >
      <div className="p-4">
        {/* Collapse Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          >
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* User Profile */}
        {isConnected && (
          <div className={`mb-6 ${isCollapsed ? "text-center" : ""}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {walletAddress ? walletAddress.slice(2, 4).toUpperCase() : "U"}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    Your Profile
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {formatAddress(walletAddress)}
                  </p>
                </div>
              )}
            </div>

            {/* Stats */}
            {!isCollapsed && (
              <div className="grid grid-cols-2 gap-2">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-2 text-center"
                  >
                    <div className="text-lg mb-1">{stat.icon}</div>
                    <div className="text-xs font-semibold text-gray-800">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all duration-300 group ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
              title={isCollapsed ? item.name : ""}
            >
              <span className="text-lg sm:text-xl">{item.icon}</span>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className="text-sm sm:text-base">{item.name}</div>
                  <div
                    className={`text-xs ${
                      currentPage === item.id
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300">
                <span className="text-lg">⚡</span>
                <span>Create Post</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300">
                <span className="text-lg">🔗</span>
                <span>Share Profile</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300">
                <span className="text-lg">⚙️</span>
                <span>Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        {!isCollapsed && (
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">StarX Social Media</p>
              <p className="text-xs text-gray-400">Powered by Blockchain</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
