import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Layout = ({
  children,
  walletAddress,
  connectWallet,
  disconnectWallet,
  isConnected,
  currentPage,
  setCurrentPage,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "explore", label: "Explore", icon: "🔍" },
    { id: "trending", label: "Trending", icon: "🔥" },
    { id: "about", label: "About", icon: "ℹ️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        isConnected={isConnected}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        navItems={navItems}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar - Desktop Only */}
        <Sidebar
          walletAddress={walletAddress}
          isConnected={isConnected}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          <main className="min-h-screen">{children}</main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
