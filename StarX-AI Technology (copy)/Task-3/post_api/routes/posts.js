const express = require("express");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");

const router = express.Router();

// Validation middleware
const validatePost = [
  body("postId")
    .notEmpty()
    .withMessage("Post ID is required")
    .isString()
    .withMessage("Post ID must be a string")
    .trim(),
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 1, max: 500 })
    .withMessage("Title must be between 1 and 500 characters")
    .trim(),
  body("userAddress")
    .notEmpty()
    .withMessage("User address is required")
    .isString()
    .withMessage("User address must be a string")
    .trim(),
  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string")
    .isLength({ max: 10000 })
    .withMessage("Content cannot exceed 10000 characters")
    .trim(),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  body("category")
    .optional()
    .isIn(["technology", "business", "lifestyle", "entertainment", "other"])
    .withMessage("Invalid category"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be a boolean"),
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

// POST /posts - Create a new post
router.post("/", validatePost, handleValidationErrors, async (req, res) => {
  try {
    const { postId, title, userAddress, content, tags, category, isPublished } =
      req.body;

    // Check if post with the same postId already exists
    const existingPost = await Post.findOne({ postId });
    if (existingPost) {
      return res.status(409).json({
        success: false,
        message: "Post with this ID already exists",
        postId: postId,
      });
    }

    // Create new post
    const newPost = new Post({
      postId,
      title,
      userAddress,
      content: content || "",
      tags: tags || [],
      category: category || "other",
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: savedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
});

// GET /posts - Retrieve all posts
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      userAddress,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (userAddress) {
      query.userAddress = userAddress;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Execute query with pagination
    const posts = await Post.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .select("-__v");

    // Get total count for pagination
    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limitNum);

    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalPosts,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
});

// GET /posts/:postId - Get a specific post by ID
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({ postId }).select("-__v");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
        postId: postId,
      });
    }

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve post",
      error: error.message,
    });
  }
});

module.exports = router;
