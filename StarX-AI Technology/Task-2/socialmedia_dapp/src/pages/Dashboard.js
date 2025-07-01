import React, { useState, useEffect } from "react";
import ProfileSection from "../components/dashboard/ProfileSection";
import FriendsSection from "../components/dashboard/FriendsSection";
import StatsSection from "../components/dashboard/StatsSection";
import ActivitySection from "../components/dashboard/ActivitySection";

const Dashboard = ({ walletAddress, isConnected, connectWallet }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user profile data
  const mockProfile = {
    id: 1,
    walletAddress: walletAddress,
    username: "CryptoUser",
    displayName: "John Doe",
    bio: "Passionate about blockchain technology and decentralized applications. Building the future of Web3!",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
    coverPhoto:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=300&fit=crop",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    twitter: "@johndoe",
    github: "johndoe",
    joinedDate: "2024-01-15",
    posts: 24,
    followers: 1200,
    following: 856,
    friends: 45,
    earnings: "2.4 ETH",
    reputation: 95,
    badges: ["Early Adopter", "Content Creator", "Community Leader"],
    interests: ["Blockchain", "DeFi", "NFTs", "Smart Contracts", "Web3"],
    skills: ["Solidity", "React", "Node.js", "Ethereum", "IPFS"],
  };

  useEffect(() => {
    // Simulate loading user profile
    const loadProfile = () => {
      setTimeout(() => {
        setUserProfile(mockProfile);
        setIsLoading(false);
      }, 1000);
    };

    if (isConnected && walletAddress) {
      loadProfile();
    } else {
      setIsLoading(false);
    }
  }, [isConnected, walletAddress, mockProfile]);

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "friends", label: "Friends", icon: "👥" },
    { id: "stats", label: "Stats", icon: "📊" },
    { id: "activity", label: "Activity", icon: "📈" },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Connect your wallet to access your dashboard
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSection
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        );
      case "friends":
        return <FriendsSection userProfile={userProfile} />;
      case "stats":
        return <StatsSection userProfile={userProfile} />;
      case "activity":
        return <ActivitySection userProfile={userProfile} />;
      default:
        return (
          <ProfileSection
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Manage your profile and connections
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Connected Wallet</p>
                <p className="text-sm font-mono text-gray-900">
                  {walletAddress
                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(
                        -4
                      )}`
                    : ""}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
