import React from 'react';
import { FaSearch, FaBriefcase, FaStar, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router';

const JobsIntroSection = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center py-32 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 30%, #2d3748 60%, #1a202c 100%)',
      }}
    >
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-12 left-16 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-12 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 transform rotate-45 animate-spin-slow">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg"></div>
        </div>
        <div className="absolute bottom-32 left-32 transform -rotate-12 animate-bounce-slow">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400/15 to-purple-400/15 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-12 transform rotate-12 animate-pulse">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/25 to-blue-400/25"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60a5fa" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Flowing Wave Lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path 
            d="M0,200 Q300,150 600,200 T1200,200 L1200,250 Q900,200 600,250 T0,250 Z" 
            fill="url(#waveGradient)"
            className="animate-pulse"
          />
          <path 
            d="M0,400 Q400,350 800,400 T1600,400 L1600,450 Q1200,400 800,450 T0,450 Z" 
            fill="url(#waveGradient)"
            className="animate-pulse delay-1000"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Floating Icons */}
        <div className="absolute -top-8 left-0 animate-float">
          <FaBriefcase className="text-3xl text-blue-400/40" />
        </div>
        <div className="absolute -top-4 right-8 animate-float delay-1000">
          <FaStar className="text-2xl text-cyan-400/40" />
        </div>
        <div className="absolute top-12 right-0 animate-float delay-2000">
          <FaRocket className="text-4xl text-indigo-400/40" />
        </div>

        {/* Main Heading with Artistic Styling */}
        <div className="mb-8">
          <h2 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-300 mb-4 leading-tight">
            Discover Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Dream Career
            </span>
          </h2>
          
          {/* Decorative Line */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Enhanced Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Explore thousands of <span className="text-cyan-300 font-semibold">curated opportunities</span> tailored to your unique skills and aspirations—your perfect role awaits.
        </p>

        

        {/* Enhanced Search Button */}
        <div className="relative">
         <Link to={'/search-jobs'}> <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-500 hover:via-cyan-500 hover:to-indigo-500 text-white font-bold px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg overflow-hidden">
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Content */}
            <FaSearch className="text-xl relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Explore Jobs</span>
            
            {/* Sparkle Effect */}
            <div className="absolute top-1 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
          </button></Link>
          
          {/* Button Shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-cyan-600/50 rounded-full blur-lg transform translate-y-2 -z-10"></div>
        </div>

        {/* Additional CTA Text */}
        <p className="text-gray-400 text-sm mt-8">
          Join <span className="text-cyan-400 font-semibold">50,000+</span> professionals who found their dream job with us
        </p>
      </div>

      {/* Artistic Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" 
            fill="url(#waveGradient)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </section>
  );
};

export default JobsIntroSection;
