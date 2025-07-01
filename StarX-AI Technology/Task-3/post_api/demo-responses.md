# API Response Demonstrations

This file shows the expected responses from the Post Metadata API endpoints.

## 1. Health Check Response

**Request:**
```bash
GET http://localhost:3000/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Post Metadata API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 2. Root Endpoint Response

**Request:**
```bash
GET http://localhost:3000/
```

**Response:**
```json
{
  "message": "Welcome to Post Metadata API",
  "version": "1.0.0",
  "endpoints": {
    "GET /health": "Health check",
    "GET /posts": "Get all posts",
    "POST /posts": "Create a new post"
  }
}
```

## 3. Successful Post Creation

**Request:**
```bash
POST http://localhost:3000/posts
Content-Type: application/json

{
  "postId": "post_001",
  "title": "Introduction to Blockchain Technology",
  "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "content": "Blockchain is a revolutionary technology that enables secure, transparent, and decentralized transactions.",
  "tags": ["blockchain", "technology", "cryptocurrency"],
  "category": "technology",
  "isPublished": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "65a4b2c3d4e5f6789012345",
    "postId": "post_001",
    "title": "Introduction to Blockchain Technology",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "content": "Blockchain is a revolutionary technology that enables secure, transparent, and decentralized transactions.",
    "tags": ["blockchain", "technology", "cryptocurrency"],
    "category": "technology",
    "isPublished": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 4. Get All Posts Response

**Request:**
```bash
GET http://localhost:3000/posts
```

**Response (200 OK):**
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
        "content": "Blockchain is a revolutionary technology that enables secure, transparent, and decentralized transactions.",
        "tags": ["blockchain", "technology", "cryptocurrency"],
        "category": "technology",
        "isPublished": true,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "_id": "65a4b2c3d4e5f6789012346",
        "postId": "post_002",
        "title": "The Future of Social Media",
        "userAddress": "0x8ba1f109551bD432803012645Hac136c772c3c7f",
        "content": "Social media platforms are evolving with new technologies like AI and blockchain integration.",
        "tags": ["social-media", "ai", "future"],
        "category": "technology",
        "isPublished": true,
        "createdAt": "2024-01-15T10:35:00.000Z",
        "updatedAt": "2024-01-15T10:35:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalPosts": 2,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

## 5. Get Specific Post Response

**Request:**
```bash
GET http://localhost:3000/posts/post_001
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Post retrieved successfully",
  "data": {
    "_id": "65a4b2c3d4e5f6789012345",
    "postId": "post_001",
    "title": "Introduction to Blockchain Technology",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "content": "Blockchain is a revolutionary technology that enables secure, transparent, and decentralized transactions.",
    "tags": ["blockchain", "technology", "cryptocurrency"],
    "category": "technology",
    "isPublished": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 6. Validation Error Responses

### Missing Required Field (Title)

**Request:**
```bash
POST http://localhost:3000/posts
Content-Type: application/json

{
  "postId": "post_003",
  "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
}
```

**Response (400 Bad Request):**
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

### Empty Title

**Request:**
```bash
POST http://localhost:3000/posts
Content-Type: application/json

{
  "postId": "post_004",
  "title": "",
  "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title must be between 1 and 500 characters",
      "value": ""
    }
  ]
}
```

### Invalid Category

**Request:**
```bash
POST http://localhost:3000/posts
Content-Type: application/json

{
  "postId": "post_005",
  "title": "Test Post",
  "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "category": "invalid_category"
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "category",
      "message": "Invalid category",
      "value": "invalid_category"
    }
  ]
}
```

## 7. Duplicate Post ID Error

**Request:**
```bash
POST http://localhost:3000/posts
Content-Type: application/json

{
  "postId": "post_001",
  "title": "Duplicate Post",
  "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
}
```

**Response (409 Conflict):**
```json
{
  "success": false,
  "message": "Post with this ID already exists",
  "postId": "post_001"
}
```

## 8. Post Not Found Error

**Request:**
```bash
GET http://localhost:3000/posts/non_existent_post
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Post not found",
  "postId": "non_existent_post"
}
```

## 9. Filtered Posts Response

**Request:**
```bash
GET http://localhost:3000/posts?category=technology&page=1&limit=5
```

**Response (200 OK):**
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

## Testing with curl Commands

```bash
# Health check
curl -X GET http://localhost:3000/health

# Create a post
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_001",
    "title": "Introduction to Blockchain Technology",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "content": "Blockchain is a revolutionary technology...",
    "tags": ["blockchain", "technology"],
    "category": "technology"
  }'

# Get all posts
curl -X GET http://localhost:3000/posts

# Get specific post
curl -X GET http://localhost:3000/posts/post_001

# Test validation error
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_002",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  }'
``` 