import React, { useState } from "react";

const ActivitySection = ({ userProfile }) => {
  const [filter, setFilter] = useState("all");

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: "post",
      title: "Created a new post",
      description: "The Future of DeFi Protocols",
      timestamp: "2 hours ago",
      icon: "📝",
      color: "blue",
      likes: 15,
      comments: 3,
    },
    {
      id: 2,
      type: "achievement",
      title: "Earned a new badge",
      description: "Content Creator - 50+ posts",
      timestamp: "4 hours ago",
      icon: "🏆",
      color: "yellow",
    },
    {
      id: 3,
      type: "follower",
      title: "New follower",
      description: "Alice Johnson started following you",
      timestamp: "6 hours ago",
      icon: "👥",
      color: "green",
    },
    {
      id: 4,
      type: "like",
      title: "Post received likes",
      description: "Your post about smart contracts got 23 likes",
      timestamp: "1 day ago",
      icon: "👍",
      color: "pink",
    },
    {
      id: 5,
      type: "comment",
      title: "New comment",
      description: "Bob Smith commented on your post",
      timestamp: "1 day ago",
      icon: "💬",
      color: "purple",
    },
    {
      id: 6,
      type: "earnings",
      title: "Earnings milestone",
      description: "You earned 0.05 ETH from your latest post",
      timestamp: "2 days ago",
      icon: "💰",
      color: "green",
    },
    {
      id: 7,
      type: "friend",
      title: "New friend",
      description: "You and Carol Davis are now friends",
      timestamp: "3 days ago",
      icon: "🤝",
      color: "blue",
    },
    {
      id: 8,
      type: "achievement",
      title: "Reached milestone",
      description: "1000+ profile views",
      timestamp: "1 week ago",
      icon: "🎯",
      color: "orange",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Early Adopter",
      description: "Joined during the first month",
      icon: "🚀",
      earned: true,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Content Creator",
      description: "Created 50+ posts",
      icon: "📝",
      earned: true,
      date: "2024-02-20",
    },
    {
      id: 3,
      title: "Community Leader",
      description: "1000+ followers",
      icon: "👑",
      earned: true,
      date: "2024-03-10",
    },
    {
      id: 4,
      title: "DeFi Expert",
      description: "Posted 20+ DeFi-related content",
      icon: "🏦",
      earned: false,
      progress: 15,
      target: 20,
    },
    {
      id: 5,
      title: "NFT Collector",
      description: "Interacted with 50+ NFT posts",
      icon: "🖼️",
      earned: false,
      progress: 32,
      target: 50,
    },
    {
      id: 6,
      title: "Smart Contract Developer",
      description: "Shared 10+ smart contract tutorials",
      icon: "⚡",
      earned: false,
      progress: 7,
      target: 10,
    },
  ];

  const filters = [
    { id: "all", label: "All Activities", icon: "📋" },
    { id: "post", label: "Posts", icon: "📝" },
    { id: "achievement", label: "Achievements", icon: "🏆" },
    { id: "social", label: "Social", icon: "👥" },
    { id: "earnings", label: "Earnings", icon: "💰" },
  ];

  const filteredActivities = mockActivities.filter(
    (activity) =>
      filter === "all" ||
      (filter === "social" &&
        ["follower", "friend", "like", "comment"].includes(activity.type)) ||
      activity.type === filter
  );

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
      pink: "bg-pink-50 text-pink-600 border-pink-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Activity Timeline
            </h2>
            <p className="text-gray-600 mt-1">
              Track your journey and achievements
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {mockActivities.length}
            </div>
            <div className="text-sm text-gray-500">Total Activities</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filter === filterOption.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{filterOption.icon}</span>
              <span>{filterOption.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Recent Activities
        </h3>
        <div className="space-y-6">
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="flex items-start space-x-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 ${getColorClasses(
                    activity.color
                  )}`}
                >
                  {activity.icon}
                </div>
                {index < filteredActivities.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                )}
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>

                      {activity.likes && activity.comments && (
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>👍 {activity.likes}</span>
                          <span>💬 {activity.comments}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 ml-4">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                achievement.earned
                  ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-md"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                    achievement.earned
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-semibold ${
                      achievement.earned ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {achievement.title}
                  </h4>
                  <p
                    className={`text-sm mt-1 ${
                      achievement.earned ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {achievement.description}
                  </p>

                  {achievement.earned ? (
                    <p className="text-xs text-gray-500 mt-2">
                      Earned {achievement.date}
                    </p>
                  ) : (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (achievement.progress / achievement.target) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl mb-2">📝</div>
          <div className="text-2xl font-bold text-gray-900">24</div>
          <div className="text-sm text-gray-600">Posts Created</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600">Achievements Earned</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-gray-900">2.4 ETH</div>
          <div className="text-sm text-gray-600">Total Earnings</div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
