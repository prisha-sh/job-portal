import React from 'react';
import { FaUserTie, FaUser, FaSignInAlt, FaRocket, FaMagic, FaHandshake } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const HeroIntro = () => {
  const userId = useSelector((state)=>state.auth.userId);
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center py-32 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0f23 0%, #1b2333 60%, #0a0f23 100%)',
      }}
    >
      {/* Artistic Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-700/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-2xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-4xl">
        {/* Logo & Title */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <FaMagic className="text-5xl text-gradient animate-spin-slow" />
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            JobGenius
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
          Revolutionizing Recruitment & Careers with AI-driven Precision. <br/>
          Employers source top talent effortlessly; candidates find dream roles seamlessly.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: FaRocket, title: 'Fast Matching', desc: 'Instantly match jobs and candidates with advanced AI.' },
            { icon: FaHandshake, title: 'Seamless Interaction', desc: 'Integrated chat & video interviews in one place.' },
            { icon: FaMagic, title: 'Smart Shortlisting', desc: 'Automated shortlist of top fits to save your time.' },
          ].map((f, i) => (
            <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:scale-105 transition transform duration-300">
              <f.icon className="text-4xl text-gradient mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
{
  (userId)?<div></div>:
  <div>
      {/* Signup Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          <Link to={"/employer-signup"}><button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition">
            <FaUserTie /> Recruiter Sign Up
          </button></Link>

       <Link to={"/user-signup"}> <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition">
            <FaUser /> Applicant Sign Up
          </button></Link>  
        </div>

        {/* Login Links */}
        
        <div className="flex justify-center items-center gap-6">
          <Link to={'/login'}><button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <FaSignInAlt /> Recruiter Login
          </button></Link>
          <span className="text-gray-500">|</span>
          <Link to={'/login'}><button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <FaSignInAlt /> Applicant Login
          </button></Link>
          
          
        </div>
  </div>
}
      
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-blob {
          animation: blob 8s infinite;
        }
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .text-gradient {
          background: linear-gradient(90deg, #34d399, #8b5cf6, #f472b6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default HeroIntro;
