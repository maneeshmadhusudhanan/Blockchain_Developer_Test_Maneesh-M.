import React, { useState } from "react";

const StatsSection = ({ userProfile }) => {
  const [timeRange, setTimeRange] = useState("week");

  // Mock analytics data
  const mockAnalytics = {
    week: {
      posts: 5,
      likes: 127,
      comments: 23,
      shares: 8,
      views: 1247,
      followers: 12,
      earnings: "0.15 ETH",
      engagement: 8.7,
    },
    month: {
      posts: 24,
      likes: 567,
      comments: 89,
      shares: 34,
      views: 5678,
      followers: 45,
      earnings: "0.67 ETH",
      engagement: 9.2,
    },
    year: {
      posts: 156,
      likes: 3245,
      comments: 567,
      shares: 234,
      views: 45678,
      followers: 1200,
      earnings: "2.4 ETH",
      engagement: 7.8,
    },
  };

  const currentStats = mockAnalytics[timeRange];

  const statsCards = [
    {
      title: "Posts Created",
      value: currentStats.posts,
      icon: "📝",
      color: "blue",
      change: "+12%",
    },
    {
      title: "Total Likes",
      value: currentStats.likes,
      icon: "👍",
      color: "green",
      change: "+8%",
    },
    {
      title: "Comments Received",
      value: currentStats.comments,
      icon: "💬",
      color: "purple",
      change: "+15%",
    },
    {
      title: "Shares",
      value: currentStats.shares,
      icon: "📤",
      color: "orange",
      change: "+23%",
    },
    {
      title: "Profile Views",
      value: currentStats.views.toLocaleString(),
      icon: "👁️",
      color: "indigo",
      change: "+18%",
    },
    {
      title: "New Followers",
      value: currentStats.followers,
      icon: "👥",
      color: "pink",
      change: "+6%",
    },
    {
      title: "Earnings",
      value: currentStats.earnings,
      icon: "💰",
      color: "yellow",
      change: "+34%",
    },
    {
      title: "Engagement Rate",
      value: `${currentStats.engagement}%`,
      icon: "📊",
      color: "teal",
      change: "+2%",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "post",
      title: "New post created",
      description: "Just shared my thoughts on DeFi protocols",
      time: "2 hours ago",
      icon: "📝",
    },
    {
      id: 2,
      type: "like",
      title: "Post received 15 likes",
      description: "Your post about smart contracts is trending",
      time: "4 hours ago",
      icon: "👍",
    },
    {
      id: 3,
      type: "follower",
      title: "New follower",
      description: "Alice Johnson started following you",
      time: "6 hours ago",
      icon: "👥",
    },
    {
      id: 4,
      type: "comment",
      title: "New comment",
      description: "Bob Smith commented on your post",
      time: "1 day ago",
      icon: "💬",
    },
    {
      id: 5,
      type: "earnings",
      title: "Earnings milestone",
      description: "You earned 0.05 ETH from your latest post",
      time: "2 days ago",
      icon: "💰",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
      pink: "bg-pink-50 text-pink-600 border-pink-200",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
      teal: "bg-teal-50 text-teal-600 border-teal-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
            <p className="text-gray-600 mt-1">
              Track your performance and engagement
            </p>
          </div>
          <div className="flex space-x-2">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === range
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${getColorClasses(
                    stat.color
                  )}`}
                >
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm">
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Top Performing Posts
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "The Future of DeFi Protocols",
                likes: 45,
                comments: 12,
                views: 1247,
                date: "2 days ago",
              },
              {
                title: "Smart Contract Security Best Practices",
                likes: 38,
                comments: 8,
                views: 987,
                date: "5 days ago",
              },
              {
                title: "NFT Market Analysis",
                likes: 32,
                comments: 6,
                views: 756,
                date: "1 week ago",
              },
            ].map((post, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>👁️ {post.views}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Engagement Trends
          </h3>
          <div className="space-y-6">
            {[
              { label: "Likes", value: 85, color: "bg-green-500" },
              { label: "Comments", value: 72, color: "bg-blue-500" },
              { label: "Shares", value: 58, color: "bg-purple-500" },
              { label: "Views", value: 91, color: "bg-orange-500" },
            ].map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {metric.label}
                  </span>
                  <span className="text-sm text-gray-500">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${metric.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
