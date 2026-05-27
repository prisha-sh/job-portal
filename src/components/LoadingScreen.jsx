import React from 'react';
import { FaBriefcase, FaStar, FaRocket } from 'react-icons/fa';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Dark, vibrant gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #080a0f 0%, #0f121b 35%, #1f2a3d 70%, #202638 100%)',
        }}
      />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-16 w-96 h-96 bg-blue-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-12 w-80 h-80 bg-indigo-800/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-800/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Centered icons with increased speed and bluish-purple hue */}
      <div className="relative z-10 flex items-center justify-center h-full space-x-8">
        <FaBriefcase className="text-5xl text-white/90 drop-shadow-[0_0_8px_rgba(75,0,130,0.8)] animate-float-fast" />
        <FaStar className="text-4xl text-white/90 drop-shadow-[0_0_8px_rgba(75,0,130,0.8)] animate-float-fast delay-500" />
        <FaRocket className="text-6xl text-white/90 drop-shadow-[0_0_8px_rgba(75,0,130,0.8)] animate-float-fast delay-1000" />
      </div>

      {/* Pulsating dots */}
      <div className="relative z-10 flex items-center justify-center mt-8 space-x-4">
        <span className="loading-dot bg-blue-300"></span>
        <span className="loading-dot bg-purple-300 animation-delay-150"></span>
        <span className="loading-dot bg-indigo-300 animation-delay-300"></span>
      </div>

      <style jsx>{`
        .loading-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(15deg); }
        }
        .animate-float-fast {
          animation: float-fast 1.2s ease-in-out infinite;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
