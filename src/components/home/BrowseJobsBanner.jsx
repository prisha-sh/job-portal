import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const BrowseJobsBanner = () => {
  return (
    <div className="relative w-full bg-white py-3 overflow-hidden">
      {/* Subtle Diagonal Stripes */}
      <div className="absolute inset-0 opacity-10 bg-stripes"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex justify-center">
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition">
          <FaBriefcase /> Browse Jobs
        </button>
      </div>

      <style jsx>{`
        .bg-stripes {
          background-image: repeating-linear-gradient(
            45deg,
            #ffffff,
            #ffffff 10px,
            #f1f5f9 10px,
            #f1f5f9 20px
          );
        }
      `}</style>
    </div>
  );
};

export default BrowseJobsBanner;
