import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Trending from "./pages/Trending";
import About from "./pages/About";
import MyPosts from "./pages/MyPosts";
import Bookmarks from "./pages/Bookmarks";
import Dashboard from "./pages/Dashboard";
import SplashScreen from "./components/SplashScreen";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      content:
        "Just deployed my first smart contract! The future of DeFi is here. 🚀 #Blockchain #DeFi #SmartContracts",
      author: "0x1234...5678",
      authorName: "CryptoDev",
      authorAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
      timestamp: Date.now() - 3600000,
      likes: 42,
      dislikes: 2,
      comments: 8,
      isLiked: false,
      isDisliked: false,
    },
    {
      id: 2,
      content:
        "Exploring the latest NFT marketplace features. The integration possibilities are endless! 🎨 #NFTs #Web3 #Innovation",
      author: "0x8765...4321",
      authorName: "NFTArtist",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      timestamp: Date.now() - 7200000,
      likes: 28,
      dislikes: 1,
      comments: 5,
      isLiked: false,
      isDisliked: false,
    },
    {
      id: 3,
      content:
        "The potential of blockchain technology in supply chain management is revolutionary. Transparency and traceability like never before! 📦 #Blockchain #SupplyChain #Innovation",
      author: "0xabcd...efgh",
      authorName: "BlockchainBiz",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      timestamp: Date.now() - 10800000,
      likes: 35,
      dislikes: 3,
      comments: 12,
      isLiked: false,
      isDisliked: false,
    },
  ]);
  const [filterAddress, setFilterAddress] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [dislikedPosts, setDislikedPosts] = useState(new Set());
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Check if MetaMask is installed
  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const account = accounts[0];
          setWalletAddress(account);
          setIsConnected(true);

          // Set up provider and signer
          const ethProvider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          const ethSigner = ethProvider.getSigner();
          setProvider(ethProvider);
          setSigner(ethSigner);
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setWalletAddress("");
    setIsConnected(false);
    setProvider(null);
    setSigner(null);
  };

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    checkIfWalletIsConnected();
  }, []);

  // Render splash screen
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newPost = { ...post };
          if (post.isLiked) {
            newPost.likes--;
            newPost.isLiked = false;
          } else {
            newPost.likes++;
            newPost.isLiked = true;
            if (post.isDisliked) {
              newPost.dislikes--;
              newPost.isDisliked = false;
            }
          }
          return newPost;
        }
        return post;
      })
    );
  };

  const handleDislike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newPost = { ...post };
          if (post.isDisliked) {
            newPost.dislikes--;
            newPost.isDisliked = false;
          } else {
            newPost.dislikes++;
            newPost.isDisliked = true;
            if (post.isLiked) {
              newPost.likes--;
              newPost.isLiked = false;
            }
          }
          return newPost;
        }
        return post;
      })
    );
  };

  const handleCreatePost = (newPostContent) => {
    const postWithMetadata = {
      content: newPostContent,
      id: Date.now(),
      author: walletAddress,
      timestamp: Date.now(),
      likes: 0,
      dislikes: 0,
      comments: 0,
      isLiked: false,
      isDisliked: false,
      authorName: "You",
      authorAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
    };
    setPosts([postWithMetadata, ...posts]);
  };

  // Render current page
  const renderCurrentPage = () => {
    const pageProps = {
      walletAddress,
      connectWallet,
      isConnected,
      provider,
      signer,
      contract,
      posts,
      filterAddress,
      setFilterAddress,
      likedPosts,
      dislikedPosts,
      isCreatingPost,
      setIsCreatingPost,
      setPosts,
      setContract,
      setLikedPosts,
      setDislikedPosts,
      onLike: handleLike,
      onDislike: handleDislike,
      onCreatePost: handleCreatePost,
    };

    switch (currentPage) {
      case "home":
        return <Home {...pageProps} />;
      case "explore":
        return <Explore {...pageProps} />;
      case "trending":
        return <Trending {...pageProps} />;
      case "about":
        return <About {...pageProps} />;
      case "myposts":
        return <MyPosts {...pageProps} />;
      case "bookmarks":
        return <Bookmarks {...pageProps} />;
      case "dashboard":
        return <Dashboard {...pageProps} />;
      default:
        return <Home {...pageProps} />;
    }
  };

  return (
    <div className="App font-sans antialiased">
      <Layout
        walletAddress={walletAddress}
        isConnected={isConnected}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {renderCurrentPage()}
      </Layout>
    </div>
  );
}

export default App;
