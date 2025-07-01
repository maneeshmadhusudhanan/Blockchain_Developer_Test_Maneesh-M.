# Post Metadata API

A REST API for storing and retrieving social media post metadata, built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **POST /posts**: Store post metadata (post ID, title, user address, content, tags, category)
- **GET /posts**: Retrieve all posts with pagination, filtering, and sorting
- **GET /posts/:postId**: Retrieve a specific post by ID
- **Input Validation**: Comprehensive validation for all inputs
- **Docker Support**: Containerized application with Docker and Docker Compose
- **MongoDB Integration**: Persistent data storage with MongoDB
- **Error Handling**: Proper error handling and status codes

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Docker and Docker Compose (optional, for containerized deployment)

## 🛠️ Installation & Setup

### Option 1: Local Development

1. **Clone and navigate to the project:**
   ```bash
   cd post_api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your MongoDB connection string:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/post_metadata_db
   ```

4. **Start MongoDB (if running locally):**
   ```bash
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # Or use MongoDB Atlas (cloud)
   ```

5. **Start the application:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

### Option 2: Docker Deployment

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Or build and run with Docker:**
   ```bash
   # Build the image
   docker build -t post-metadata-api .
   
   # Run the container
   docker run -p 3000:3000 --name post-api post-metadata-api
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Health Check
- **GET** `/health`
- **Description**: Check if the API is running
- **Response**: 
  ```json
  {
    "status": "OK",
    "message": "Post Metadata API is running",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
  ```

#### 2. Create Post
- **POST** `/posts`
- **Description**: Create a new post
- **Request Body**:
  ```json
  {
    "postId": "post_001",
    "title": "Introduction to Blockchain Technology",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "content": "Blockchain is a revolutionary technology...",
    "tags": ["blockchain", "technology"],
    "category": "technology",
    "isPublished": true
  }
  ```
- **Required Fields**: `postId`, `title`, `userAddress`
- **Optional Fields**: `content`, `tags`, `category`, `isPublished`
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Post created successfully",
    "data": {
      "_id": "...",
      "postId": "post_001",
      "title": "Introduction to Blockchain Technology",
      "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      "content": "Blockchain is a revolutionary technology...",
      "tags": ["blockchain", "technology"],
      "category": "technology",
      "isPublished": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### 3. Get All Posts
- **GET** `/posts`
- **Description**: Retrieve all posts with pagination and filtering
- **Query Parameters**:
  - `page` (default: 1): Page number
  - `limit` (default: 10): Number of posts per page
  - `category`: Filter by category
  - `userAddress`: Filter by user address
  - `sortBy` (default: createdAt): Sort field
  - `sortOrder` (default: desc): Sort order (asc/desc)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Posts retrieved successfully",
    "data": {
      "posts": [...],
      "pagination": {
        "currentPage": 1,
        "totalPages": 2,
        "totalPosts": 15,
        "hasNextPage": true,
        "hasPrevPage": false
      }
    }
  }
  ```

#### 4. Get Specific Post
- **GET** `/posts/:postId`
- **Description**: Retrieve a specific post by ID
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Post retrieved successfully",
    "data": {
      "_id": "...",
      "postId": "post_001",
      "title": "Introduction to Blockchain Technology",
      "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      "content": "Blockchain is a revolutionary technology...",
      "tags": ["blockchain", "technology"],
      "category": "technology",
      "isPublished": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

### Error Responses

#### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required",
      "value": ""
    }
  ]
}
```

#### Not Found (404)
```json
{
  "success": false,
  "message": "Post not found",
  "postId": "non_existent_post"
}
```

#### Conflict (409)
```json
{
  "success": false,
  "message": "Post with this ID already exists",
  "postId": "post_001"
}
```

## 🧪 Testing

### Using the Test Script

1. **Make the test script executable:**
   ```bash
   chmod +x test-api.sh
   ```

2. **Run the tests:**
   ```bash
   ./test-api.sh
   ```

### Using curl

```bash
# Create a post
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "test_post",
    "title": "Test Post",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  }'

# Get all posts
curl -X GET http://localhost:3000/posts

# Get specific post
curl -X GET http://localhost:3000/posts/test_post
```

### Using Postman

1. Import the following collection or create requests manually:

**Create Post:**
- Method: POST
- URL: `http://localhost:3000/posts`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "postId": "post_001",
    "title": "Introduction to Blockchain Technology",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "content": "Blockchain is a revolutionary technology that enables secure, transparent, and decentralized transactions.",
    "tags": ["blockchain", "technology", "cryptocurrency"],
    "category": "technology"
  }
  ```

**Get All Posts:**
- Method: GET
- URL: `http://localhost:3000/posts`

**Get Specific Post:**
- Method: GET
- URL: `http://localhost:3000/posts/post_001`

## 📁 Project Structure

```
post_api/
├── models/
│   └── Post.js              # MongoDB schema and model
├── routes/
│   └── posts.js             # API routes and controllers
├── server.js                # Main application file
├── package.json             # Dependencies and scripts
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
├── test-api.sh              # API testing script
├── env.example              # Environment variables template
├── .dockerignore            # Docker ignore file
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/post_metadata_db` |
| `NODE_ENV` | Environment | `development` |

### MongoDB Schema

The Post model includes the following fields:

- `postId` (String, required, unique): Unique identifier for the post
- `title` (String, required): Post title (1-500 characters)
- `userAddress` (String, required): User's blockchain address
- `content` (String, optional): Post content (max 10,000 characters)
- `tags` (Array of Strings, optional): Post tags
- `category` (String, optional): Post category (technology, business, lifestyle, entertainment, other)
- `isPublished` (Boolean, optional): Publication status
- `createdAt` (Date): Creation timestamp
- `updatedAt` (Date): Last update timestamp

## 🚀 Deployment

### Production Deployment

1. **Set environment variables for production:**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   ```

2. **Build and run with Docker:**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

3. **Or deploy to cloud platforms:**
   - **Heroku**: Use the provided Dockerfile
   - **AWS ECS**: Use the Docker image
   - **Google Cloud Run**: Use the Docker image

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**StarX-AI Technology**

---

## 📸 Screenshots

### API Response Examples

**Successful Post Creation:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "65a4b2c3d4e5f6789012345",
    "postId": "post_001",
    "title": "Introduction to Blockchain Technology",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "content": "Blockchain is a revolutionary technology...",
    "tags": ["blockchain", "technology", "cryptocurrency"],
    "category": "technology",
    "isPublished": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Posts List with Pagination:**
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": {
    "posts": [
      {
        "_id": "65a4b2c3d4e5f6789012345",
        "postId": "post_001",
        "title": "Introduction to Blockchain Technology",
        "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        "category": "technology",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalPosts": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
``` 