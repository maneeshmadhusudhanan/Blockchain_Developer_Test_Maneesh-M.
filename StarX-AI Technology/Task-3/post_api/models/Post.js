const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: [true, "Post ID is required"],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [500, "Title cannot exceed 500 characters"],
    },
    userAddress: {
      type: String,
      required: [true, "User address is required"],
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      maxlength: [10000, "Content cannot exceed 10000 characters"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      trim: true,
      enum: ["technology", "business", "lifestyle", "entertainment", "other"],
      default: "other",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better query performance
postSchema.index({ postId: 1 });
postSchema.index({ userAddress: 1 });
postSchema.index({ createdAt: -1 });

// Virtual for formatted date
postSchema.virtual("formattedCreatedAt").get(function () {
  return this.createdAt.toISOString();
});

// Pre-save middleware to update the updatedAt field
postSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Post", postSchema);
