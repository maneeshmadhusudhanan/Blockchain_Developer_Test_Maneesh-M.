#!/bin/bash

# API Testing Script for Post Metadata API
# This script tests all the endpoints of the API

BASE_URL="http://localhost:3000"

echo "🚀 Testing Post Metadata API"
echo "================================"

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s -X GET "${BASE_URL}/health" | jq .
echo -e "\n"

# Test 2: Root Endpoint
echo "2. Testing Root Endpoint..."
curl -s -X GET "${BASE_URL}/" | jq .
echo -e "\n"

# Test 3: Create Post 1
echo "3. Creating Post 1..."
curl -s -X POST "${BASE_URL}/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_001",
    "title": "Introduction to Blockchain Technology",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "content": "Blockchain is a revolutionary technology that enables secure, transparent, and decentralized transactions.",
    "tags": ["blockchain", "technology", "cryptocurrency"],
    "category": "technology"
  }' | jq .
echo -e "\n"

# Test 4: Create Post 2
echo "4. Creating Post 2..."
curl -s -X POST "${BASE_URL}/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_002",
    "title": "The Future of Social Media",
    "userAddress": "0x8ba1f109551bD432803012645Hac136c772c3c7f",
    "content": "Social media platforms are evolving with new technologies like AI and blockchain integration.",
    "tags": ["social-media", "ai", "future"],
    "category": "technology"
  }' | jq .
echo -e "\n"

# Test 5: Create Post 3
echo "5. Creating Post 3..."
curl -s -X POST "${BASE_URL}/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_003",
    "title": "Business Strategy in Digital Age",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "content": "Modern businesses need to adapt to digital transformation to stay competitive.",
    "tags": ["business", "strategy", "digital"],
    "category": "business"
  }' | jq .
echo -e "\n"

# Test 6: Get All Posts
echo "6. Getting All Posts..."
curl -s -X GET "${BASE_URL}/posts" | jq .
echo -e "\n"

# Test 7: Get Posts with Pagination
echo "7. Getting Posts with Pagination (page 1, limit 2)..."
curl -s -X GET "${BASE_URL}/posts?page=1&limit=2" | jq .
echo -e "\n"

# Test 8: Get Posts by Category
echo "8. Getting Posts by Category (technology)..."
curl -s -X GET "${BASE_URL}/posts?category=technology" | jq .
echo -e "\n"

# Test 9: Get Posts by User Address
echo "9. Getting Posts by User Address..."
curl -s -X GET "${BASE_URL}/posts?userAddress=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" | jq .
echo -e "\n"

# Test 10: Get Specific Post
echo "10. Getting Specific Post (post_001)..."
curl -s -X GET "${BASE_URL}/posts/post_001" | jq .
echo -e "\n"

# Test 11: Validation Error - Missing Title
echo "11. Testing Validation Error (Missing Title)..."
curl -s -X POST "${BASE_URL}/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_004",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  }' | jq .
echo -e "\n"

# Test 12: Validation Error - Empty Title
echo "12. Testing Validation Error (Empty Title)..."
curl -s -X POST "${BASE_URL}/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_005",
    "title": "",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  }' | jq .
echo -e "\n"

# Test 13: Duplicate Post ID Error
echo "13. Testing Duplicate Post ID Error..."
curl -s -X POST "${BASE_URL}/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_001",
    "title": "Duplicate Post",
    "userAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  }' | jq .
echo -e "\n"

# Test 14: Get Non-existent Post
echo "14. Testing Get Non-existent Post..."
curl -s -X GET "${BASE_URL}/posts/non_existent_post" | jq .
echo -e "\n"

echo "✅ API Testing Complete!"
echo "================================" 