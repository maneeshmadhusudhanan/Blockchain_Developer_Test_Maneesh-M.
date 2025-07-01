import React from "react";

const Hero = ({ walletAddress, connectWallet, isConnected }) => {
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-25 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 animate-scale-in">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-glow mb-6">
              <span className="text-3xl sm:text-4xl font-display font-bold text-white">
                SX
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8 animate-slide-in-up">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white mb-6 tracking-tight">
              <span className="gradient-text">StarX</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-body font-light text-gray-300 mb-4 tracking-wide">
              The Future of
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-body font-semibold gradient-text-secondary mb-6">
              Decentralized Social Media
            </p>
            <p className="text-base sm:text-lg text-gray-400 font-body max-w-2xl mx-auto leading-relaxed">
              Connect, share, and earn in a truly decentralized social network
              powered by blockchain technology. Own your data, control your
              privacy, and be rewarded for your contributions.
            </p>
          </div>

          {/* Features */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 animate-slide-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="font-display font-semibold text-white mb-2">
                Secure
              </h3>
              <p className="text-gray-300 text-sm">
                End-to-end encryption and blockchain security
              </p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-display font-semibold text-white mb-2">
                Rewarding
              </h3>
              <p className="text-gray-300 text-sm">
                Earn tokens for creating quality content
              </p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-display font-semibold text-white mb-2">
                Decentralized
              </h3>
              <p className="text-gray-300 text-sm">
                No central authority controlling your data
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {isConnected ? (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">
                      Wallet Connected
                    </span>
                  </div>
                  <p className="text-gray-300 font-mono text-sm mb-2">
                    Address:
                  </p>
                  <p className="text-white font-mono text-sm bg-black bg-opacity-30 rounded-lg p-2">
                    {formatAddress(walletAddress)}
                  </p>
                </div>
                <p className="text-gray-400 text-sm">
                  Welcome to StarX! Start exploring the decentralized social
                  network.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={connectWallet}
                  className="btn-primary text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 font-display font-semibold animate-pulse-glow"
                >
                  🦊 Connect MetaMask
                </button>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Connect your wallet to start your journey in the decentralized
                  social media revolution
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold gradient-text mb-1">
                50K+
              </div>
              <div className="text-gray-400 text-sm font-body">
                Active Users
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold gradient-text-secondary mb-1">
                1M+
              </div>
              <div className="text-gray-400 text-sm font-body">
                Posts Created
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold gradient-text-accent mb-1">
                $2M+
              </div>
              <div className="text-gray-400 text-sm font-body">
                Total Rewards
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                99.9%
              </div>
              <div className="text-gray-400 text-sm font-body">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white opacity-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
