# StarX AI Social Media DApp

A modern, decentralized social media platform built with React, Tailwind CSS, and blockchain technology. This DApp allows users to create posts, interact with content, manage their profiles, and connect with friends in a Web3 environment.

## 🌟 Features

### Core Social Media Features
- **Create and Share Posts**: Users can create text-based posts with rich formatting
- **Like/Dislike System**: Interactive engagement with posts
- **Comment System**: Users can comment on posts (UI ready, backend integration pending)
- **Wallet Integration**: Seamless MetaMask wallet connection
- **Responsive Design**: Modern, mobile-first UI with Tailwind CSS

### 🎯 New Dashboard Features

#### User Profile Management
- **Profile Editing**: Complete profile customization with real-time updates
- **Photo Upload**: Avatar and cover photo upload functionality
- **Personal Information**: Bio, location, website, social media links
- **Skills & Interests**: Add and manage personal skills and interests
- **Badges System**: Achievement badges for user milestones

#### Friend Management System
- **Friend Requests**: Send and accept friend requests
- **Friend List**: View and manage your friends
- **Friend Suggestions**: Discover new friends based on common interests
- **Online Status**: See which friends are currently online
- **Mutual Friends**: View mutual connections

#### Analytics & Statistics
- **Performance Metrics**: Track posts, likes, comments, shares, and views
- **Engagement Analytics**: Monitor engagement rates and trends
- **Earnings Tracking**: View earnings from content monetization
- **Time-based Filtering**: Weekly, monthly, and yearly statistics
- **Top Performing Posts**: Identify your best content

#### Activity Timeline
- **Activity Feed**: Complete timeline of user activities
- **Achievement Tracking**: Progress towards badges and milestones
- **Filtered Views**: Filter activities by type (posts, social, earnings, etc.)
- **Progress Indicators**: Visual progress bars for ongoing achievements

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd socialmedia_dapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3001`

### Wallet Connection
1. Install MetaMask browser extension
2. Click "Connect Wallet" in the application
3. Approve the connection in MetaMask
4. Start using the DApp!

## 📱 Dashboard Guide

### Accessing the Dashboard
1. Connect your wallet
2. Click on "Dashboard" in the sidebar navigation
3. Explore the four main sections: Profile, Friends, Stats, and Activity

### Profile Management
- **Edit Profile**: Click "Edit Profile" to modify your information
- **Upload Photos**: Use the camera icons to upload avatar and cover photos
- **Add Skills/Interests**: Type and press "Add" to include new items
- **Save Changes**: Click "Save Changes" to update your profile

### Friend Management
- **View Friends**: See your current friends list
- **Friend Requests**: Check and respond to pending requests
- **Add Friends**: Send friend requests to suggested users
- **Search**: Use the search bar to find specific friends

### Analytics
- **Time Range**: Switch between Week, Month, and Year views
- **Performance Cards**: View key metrics at a glance
- **Recent Activity**: Track your latest interactions
- **Engagement Trends**: Monitor your content performance

### Activity Timeline
- **Filter Activities**: Use tabs to filter by activity type
- **Achievements**: Track your progress towards badges
- **Timeline View**: See your complete activity history

## 🛠️ Technical Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS 3.4.17
- **Blockchain**: Ethers.js
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📁 Project Structure

```
socialmedia_dapp/
├── public/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── ProfileSection.js
│   │   │   ├── FriendsSection.js
│   │   │   ├── StatsSection.js
│   │   │   ├── ActivitySection.js
│   │   │   └── PhotoUpload.js
│   │   ├── CreatePost.js
│   │   ├── Footer.js
│   │   ├── Hero.js
│   │   ├── Navbar.js
│   │   ├── PostCard.js
│   │   ├── Sidebar.js
│   │   └── SplashScreen.js
│   ├── layouts/
│   │   └── Layout.js
│   ├── pages/
│   │   ├── About.js
│   │   ├── Bookmarks.js
│   │   ├── Dashboard.js
│   │   ├── Explore.js
│   │   ├── Home.js
│   │   ├── MyPosts.js
│   │   └── Trending.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🎨 UI Components

### Dashboard Components
- **ProfileSection**: Complete profile management with photo upload
- **FriendsSection**: Friend management with requests and suggestions
- **StatsSection**: Analytics and performance metrics
- **ActivitySection**: Activity timeline and achievements
- **PhotoUpload**: Image upload with validation and progress

### Core Components
- **Navbar**: Navigation with wallet connection
- **Sidebar**: Main navigation menu
- **PostCard**: Individual post display with interactions
- **CreatePost**: Post creation interface
- **Layout**: Main application layout wrapper

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

### PostCSS
PostCSS configuration is in `postcss.config.js` for processing Tailwind CSS.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to IPFS
1. Build the project
2. Upload the `build` folder to IPFS
3. Access via IPFS gateway

## 🔮 Future Enhancements

- **Smart Contract Integration**: Full blockchain integration for posts and interactions
- **IPFS Storage**: Decentralized file storage for images and content
- **Token Rewards**: Cryptocurrency rewards for content creation
- **DAO Governance**: Community governance features
- **NFT Integration**: NFT profile pictures and collectibles
- **Real-time Chat**: Direct messaging between users
- **Content Moderation**: Community-driven content moderation
- **Advanced Analytics**: More detailed analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ for the Web3 community**
