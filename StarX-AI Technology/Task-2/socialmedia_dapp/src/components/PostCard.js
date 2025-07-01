import React, { useState } from "react";

const PostCard = ({
  post,
  onLike,
  onDislike,
  isLiked,
  isDisliked,
  account,
  onComment,
  onBookmark,
  onShare,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState(
    post.commentsList || [
      {
        id: 1,
        author: "CryptoFan",
        authorAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        content: "Great insights! This is exactly what I was looking for.",
        timestamp: Date.now() - 1800000,
      },
      {
        id: 2,
        author: "Web3Dev",
        authorAvatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        content: "Thanks for sharing this valuable information!",
        timestamp: Date.now() - 3600000,
      },
    ]
  );

  const content = post?.content || "";
  const isLongContent = content.length > 200;
  const displayContent = showFullContent
    ? content
    : content.slice(0, 200) + (isLongContent ? "..." : "");

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim() && account) {
      const newComment = {
        id: Date.now(),
        author: "You",
        authorAvatar:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
        content: comment.trim(),
        timestamp: Date.now(),
      };

      setComments([newComment, ...comments]);
      setComment("");

      // Call parent handler if provided
      if (onComment) {
        onComment(post.id, comment.trim());
      }
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onBookmark) {
      onBookmark(post.id, !isBookmarked);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.authorName || "Anonymous"}`,
        text: post.content,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(post.content).then(() => {
        alert("Post content copied to clipboard!");
      });
    }

    if (onShare) {
      onShare(post.id);
    }
  };

  if (!post) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-start gap-3 sm:gap-4">
          <img
            src={
              post.authorAvatar ||
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face"
            }
            alt={post.authorName || "User"}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  {post.authorName || "Anonymous"}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm truncate">
                  {post.author || "Unknown"}
                </p>
              </div>
              <span className="text-gray-400 text-xs sm:text-sm">
                {formatTime(post.timestamp || Date.now())}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4 sm:p-6">
        <p className="text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>
        {isLongContent && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 transition-colors"
          >
            {showFullContent ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Post Stats */}
      <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-4 sm:gap-6">
            <span>
              👁️ {post.views || Math.floor(Math.random() * 1000)} views
            </span>
            <span>💬 {comments.length} comments</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span>👍 {post.likes || 0}</span>
            <span>👎 {post.dislikes || 0}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isLiked
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg sm:text-xl">👍</span>
              <span className="text-xs sm:text-sm">Like</span>
            </button>

            <button
              onClick={onDislike}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isDisliked
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg sm:text-xl">👎</span>
              <span className="text-xs sm:text-sm">Dislike</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300"
            >
              <span className="text-lg sm:text-xl">💬</span>
              <span className="text-xs sm:text-sm">Comment</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isBookmarked
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg sm:text-xl">🔖</span>
              <span className="hidden sm:inline text-xs sm:text-sm">
                Bookmark
              </span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300"
            >
              <span className="text-lg sm:text-xl">📤</span>
              <span className="hidden sm:inline text-xs sm:text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 p-4 sm:p-6">
          <h4 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">
            Comments ({comments.length})
          </h4>

          {/* Comment Form */}
          {account && (
            <form onSubmit={handleComment} className="mb-4">
              <div className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face"
                  alt="Your avatar"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    rows="2"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-xs sm:text-sm"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💬</div>
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.author}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800 text-sm sm:text-base">
                          {comment.author}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {formatTime(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
