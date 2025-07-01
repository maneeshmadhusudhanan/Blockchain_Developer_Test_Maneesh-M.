import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API", href: "#" },
      { name: "Documentation", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Status", href: "#" },
      { name: "Community", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "Discord", icon: "🎮", href: "#" },
    { name: "GitHub", icon: "💻", href: "#" },
    { name: "Telegram", icon: "📱", href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-lg font-display font-bold text-white">
                  SX
                </span>
              </div>
              <span className="text-2xl font-display font-bold gradient-text">
                StarX
              </span>
            </div>
            <p className="text-gray-300 font-body mb-6 max-w-md leading-relaxed">
              The next generation decentralized social media platform. Connect,
              share, and earn in a truly decentralized network powered by
              blockchain technology.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  className="w-10 h-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button className="text-gray-300 hover:text-white font-body transition-colors duration-300 hover:underline">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button className="text-gray-300 hover:text-white font-body transition-colors duration-300 hover:underline">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button className="text-gray-300 hover:text-white font-body transition-colors duration-300 hover:underline">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-display font-semibold text-lg mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-300 font-body text-sm mb-4">
              Get the latest updates about StarX and the decentralized social
              media revolution.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 input-field bg-white bg-opacity-10 border-gray-600 text-white placeholder-gray-400"
              />
              <button className="btn-primary px-6 py-3 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400 font-body">
              <span>&copy; {currentYear} StarX. All rights reserved.</span>
              <span>•</span>
              <span>Powered by Blockchain</span>
            </div>

            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <button
                  key={link.name}
                  className="text-gray-400 hover:text-white font-body text-sm transition-colors duration-300 hover:underline"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-1">
        <svg
          className="w-full h-8 text-gray-800"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120V0H1200V120C1200,120 1000,80 800,80C600,80 400,120 200,120C0,120 0,120 0,120Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
