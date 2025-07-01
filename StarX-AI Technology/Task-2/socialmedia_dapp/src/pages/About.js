import React from "react";

const About = ({ walletAddress, connectWallet, isConnected }) => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Blockchain enthusiast with 8+ years in crypto. Former senior developer at major DeFi protocols.",
      social: "@alexchen",
    },
    {
      name: "Sarah Kim",
      role: "CTO",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack developer specializing in Web3 technologies. Expert in smart contracts and dApp development.",
      social: "@sarahkim",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Designer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "UX/UI designer passionate about creating intuitive blockchain interfaces. 5+ years in fintech design.",
      social: "@marcusrod",
    },
    {
      name: "Emma Thompson",
      role: "Community Manager",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Community builder and crypto educator. Helping users navigate the Web3 ecosystem.",
      social: "@emmathompson",
    },
  ];

  const features = [
    {
      icon: "🔐",
      title: "Decentralized",
      description:
        "Built on blockchain technology with no central authority controlling your data.",
    },
    {
      icon: "💰",
      title: "Monetization",
      description:
        "Earn rewards for creating quality content and engaging with the community.",
    },
    {
      icon: "🛡️",
      title: "Privacy First",
      description:
        "Your data belongs to you. We use zero-knowledge proofs for maximum privacy.",
    },
    {
      icon: "⚡",
      title: "Fast & Scalable",
      description:
        "Built on Layer 2 solutions for instant transactions and low fees.",
    },
    {
      icon: "🌐",
      title: "Interoperable",
      description:
        "Connect with other Web3 platforms and import your existing digital identity.",
    },
    {
      icon: "🎯",
      title: "Community Driven",
      description:
        "Governed by DAO with community voting on platform decisions.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Posts Created" },
    { number: "10M+", label: "Interactions" },
    { number: "$2M+", label: "Total Rewards" },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">ℹ️</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600 mb-6">
            Connect your wallet to learn more about our platform
          </p>
          <button
            onClick={connectWallet}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            About StarX
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            The next generation decentralized social media platform built on
            blockchain technology. We're revolutionizing how people connect,
            share, and earn in the digital world.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 shadow-lg">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              To create a truly decentralized social media platform where users
              own their data, control their privacy, and are rewarded for their
              contributions to the community.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg"
            >
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8 sm:mb-12">
            Why Choose StarX?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8 sm:mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-2 text-sm sm:text-base">
                  {member.role}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm mb-3">
                  {member.bio}
                </p>
                <p className="text-blue-500 text-xs sm:text-sm">
                  {member.social}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "Ethereum", icon: "🔷" },
              { name: "IPFS", icon: "📁" },
              { name: "Solidity", icon: "📜" },
              { name: "React", icon: "⚛️" },
              { name: "Tailwind CSS", icon: "🎨" },
              { name: "ethers.js", icon: "🔗" },
              { name: "MetaMask", icon: "🦊" },
              { name: "Web3.js", icon: "🌐" },
            ].map((tech, index) => (
              <div
                key={index}
                className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg"
              >
                <div className="text-xl sm:text-2xl mb-2">{tech.icon}</div>
                <div className="font-medium text-gray-800 text-sm sm:text-base">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 sm:p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-base sm:text-lg mb-6 opacity-90">
            Have questions or want to contribute? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base">
              Join Discord
            </button>
            <button className="bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base">
              Follow on Twitter
            </button>
            <button className="bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base">
              Read Whitepaper
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
