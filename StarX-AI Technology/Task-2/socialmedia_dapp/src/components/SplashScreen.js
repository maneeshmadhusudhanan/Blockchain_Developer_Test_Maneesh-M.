import React, { useState, useEffect, useMemo } from "react";

const SplashScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = useMemo(
    () => [
      { text: "Connecting to Blockchain", duration: 1500 },
      { text: "Loading Smart Contracts", duration: 1200 },
      { text: "Initializing Web3", duration: 1000 },
      { text: "Ready to Explore", duration: 800 },
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 500);
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, steps, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-25 animate-ping"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="relative">
            {/* Main Logo */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                SX
              </span>
            </div>

            {/* Orbiting Elements */}
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "3s" }}
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg"></div>
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-400 rounded-full shadow-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-400 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-2 tracking-wider">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              StarX
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-light tracking-wide">
            Decentralized Social Media
          </p>
        </div>

        {/* Loading Steps */}
        <div className="mb-8">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center justify-center space-x-3 transition-all duration-500 ${
                  index <= currentStep
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-4"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index < currentStep
                      ? "bg-green-400 scale-150"
                      : index === currentStep
                      ? "bg-blue-400 animate-pulse"
                      : "bg-gray-500"
                  }`}
                ></div>
                <span
                  className={`text-sm sm:text-base font-medium transition-all duration-300 ${
                    index <= currentStep ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step.text}
                </span>
                {index < currentStep && (
                  <svg
                    className="w-4 h-4 text-green-400 animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 mx-auto">
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
              }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-6">
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Powered by Blockchain Technology
          </p>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white opacity-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SplashScreen;
