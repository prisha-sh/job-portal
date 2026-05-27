import React, { useState, useEffect } from 'react';
import { 
  FaRocket, 
  FaStar, 
  FaArrowRight,
  FaLightbulb,
  FaCheckCircle,
  FaUsers
} from 'react-icons/fa';

const SectionHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden py-16 px-4" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%, #f8fafc 100%)'
    }}>
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-cyan-200/30 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Decorative Dots Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-20 gap-8 h-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" 
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Flowing Wave */}
        <svg className="absolute bottom-0 left-0 w-full h-32" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ddd6fe" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          <path 
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" 
            fill="url(#waveGradient)"
            className="animate-pulse"
          />
        </svg>

        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 transform rotate-45">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-300/20 to-purple-300/20 animate-spin-slow"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 transform -rotate-12">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-full animate-bounce"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl">
            <FaRocket className="text-3xl text-white animate-bounce" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
              How We Simplify
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Your Job Search
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            From resume upload to your dream job offer, our AI-powered platform transforms 
            the traditional hiring process into a seamless, intelligent experience.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
            {[
              { icon: FaLightbulb, text: "AI-Powered Matching", color: "from-yellow-500 to-orange-500" },
              { icon: FaUsers, text: "Direct Communication", color: "from-blue-500 to-cyan-500" },
              { icon: FaCheckCircle, text: "Instant Results", color: "from-green-500 to-emerald-500" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mr-3`}>
                    <Icon className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700 font-semibold text-sm">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { number: "10K+", label: "Success Stories", icon: FaStar },
              { number: "98%", label: "Match Accuracy", icon: FaCheckCircle },
              { number: "24/7", label: "AI Support", icon: FaRocket },
              { number: "500+", label: "Partner Companies", icon: FaUsers }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white text-lg" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className={`${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '1s' }}>
            <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 mr-3">Discover How It Works</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 left-1/4 w-8 h-8">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-75"></div>
        </div>
        <div className="absolute top-1/2 right-10 w-6 h-6">
          <div className="w-full h-full bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-10 left-10 w-4 h-4">
          <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-400 rotate-45 animate-spin-slow"></div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .grid-cols-20 {
          grid-template-columns: repeat(20, minmax(0, 1fr));
        }
      `}</style>
    </div>
  );
};

export default SectionHeader;
