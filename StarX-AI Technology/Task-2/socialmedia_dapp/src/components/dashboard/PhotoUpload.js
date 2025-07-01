import React, { useState, useRef } from "react";

const PhotoUpload = ({ onPhotoUpdate, type = "avatar", className = "" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file upload to IPFS or cloud storage
      // In a real app, you would upload to IPFS, AWS S3, or similar
      const mockUploadUrl = await simulateFileUpload(file);
      onPhotoUpdate(mockUploadUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const simulateFileUpload = (file) => {
    return new Promise((resolve) => {
      // Simulate upload delay
      setTimeout(() => {
        // For demo purposes, we'll use a mock URL
        // In production, this would be the actual uploaded file URL
        const mockUrl = `https://images.unsplash.com/photo-${Math.random()
          .toString(36)
          .substr(2, 9)}?w=${
          type === "avatar"
            ? "150&h=150&fit=crop&crop=face"
            : "800&h=300&fit=crop"
        }`;
        resolve(mockUrl);
      }, 2000);
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getButtonText = () => {
    if (isUploading) return "Uploading...";
    return type === "avatar" ? "📷" : "📸";
  };

  const getButtonClass = () => {
    const baseClass =
      "flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110";

    if (type === "avatar") {
      return `${baseClass} w-10 h-10 bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50`;
    } else {
      return `${baseClass} w-12 h-12 bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50`;
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        onClick={handleClick}
        disabled={isUploading}
        className={`${getButtonClass()} ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        title={type === "avatar" ? "Change avatar" : "Change cover photo"}
      >
        {isUploading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <span className="text-lg">{getButtonText()}</span>
        )}
      </button>

      {/* Upload Progress Indicator */}
      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
          <div className="text-white text-xs">Uploading...</div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
