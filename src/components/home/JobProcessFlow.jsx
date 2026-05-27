import React, { useState, useEffect } from 'react';
import { 
  FaUpload, 
  FaRobot, 
  FaUserCheck, 
  FaComments, 
  FaVideo, 
  FaTrophy,
  FaArrowRight,
  FaCheckCircle,
  FaMagic,
  FaLightbulb
} from 'react-icons/fa';

const JobProcessFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Upload Resume",
      subtitle: "Submit Your Profile",
      description: "Simply upload your resume and let our AI-powered system analyze your skills and experience.",
      icon: FaUpload,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      delay: 0
    },
    {
      id: 2,
      title: "AI Matching",
      subtitle: "Smart Shortlisting",
      description: "Our advanced AI algorithm matches your profile with the perfect job opportunities in seconds.",
      icon: FaRobot,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/20",
      delay: 0.2
    },
    {
      id: 3,
      title: "Get Shortlisted",
      subtitle: "Top Candidate",
      description: "Receive instant notifications when you're shortlisted for positions that match your dream job.",
      icon: FaUserCheck,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/20",
      delay: 0.4
    },
    {
      id: 4,
      title: "Online Chat",
      subtitle: "Direct Communication",
      description: "Connect directly with HR teams and hiring managers through our integrated chat system.",
      icon: FaComments,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/20",
      delay: 0.6
    },
    {
      id: 5,
      title: "Video Interview",
      subtitle: "Face-to-Face Meeting",
      description: "Attend seamless video interviews with our built-in video conferencing technology.",
      icon: FaVideo,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/20",
      delay: 0.8
    },
    {
      id: 6,
      title: "Land Your Dream Job",
      subtitle: "Success Achieved",
      description: "Complete the process and start your new career journey with your dream company!",
      icon: FaTrophy,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/20",
      delay: 1.0
    }
  ];

  // Auto-advance steps
  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="relative overflow-hidden py-20 px-4" style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)'
    }}>
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-gray-700/30 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>

        {/* Flowing Lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/>
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path 
            d="M0,200 Q200,100 400,200 T800,200 L800,250 Q600,150 400,250 T0,250 Z" 
            fill="url(#flowGradient)"
            className="animate-pulse"
          />
          <path 
            d="M0,400 Q300,300 600,400 T1200,400 L1200,450 Q900,350 600,450 T0,450 Z" 
            fill="url(#flowGradient)"
            className="animate-pulse delay-1000"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl">
            <FaMagic className="text-3xl text-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
            Understand Our
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Workflow
            </span>
          </h2>
         
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-lg">
            <div 
              className="h-full bg-gradient-to-r from-white to-yellow-400 rounded-full transition-all duration-1000 ease-out shadow-xl"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isPassed = index < activeStep;
              
              return (
                <div
                  key={step.id}
                  className={`relative group cursor-pointer transform transition-all duration-700 ${
                    isActive ? 'scale-110 z-20' : 'scale-100 hover:scale-105'
                  }`}
                  style={{ animationDelay: `${step.delay}s` }}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Card */}
                  <div className={`relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
                    isActive 
                      ? 'bg-gray-800/40 border-gray-600/50 shadow-2xl shadow-gray-900/30' 
                      : isPassed 
                      ? 'bg-gray-800/30 border-green-400/30 shadow-xl shadow-green-400/10'
                      : 'bg-gray-900/30 border-gray-700/30 shadow-lg hover:bg-gray-800/35 hover:border-gray-600/40'
                  }`}>
                    
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                    {/* Content */}
                    <div className="relative p-8 text-center">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-500 ${
                        isActive 
                          ? `bg-gradient-to-br ${step.color} shadow-2xl scale-110` 
                          : isPassed
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl'
                          : `${step.bgColor} shadow-lg group-hover:shadow-xl`
                      }`}>
                        {isPassed ? (
                          <FaCheckCircle className="text-3xl text-white" />
                        ) : (
                          <Icon className={`text-3xl transition-all duration-300 ${
                            isActive ? 'text-white animate-bounce' : 'text-white/90'
                          }`} />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : isPassed 
                          ? 'text-green-300'
                          : 'text-gray-100 group-hover:text-white'
                      }`}>
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      <p className={`text-sm font-semibold mb-4 transition-all duration-300 ${
                        isActive 
                          ? 'text-blue-200' 
                          : isPassed
                          ? 'text-green-200'
                          : 'text-gray-300 group-hover:text-blue-200'
                      }`}>
                        {step.subtitle}
                      </p>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed transition-all duration-300 ${
                        isActive 
                          ? 'text-gray-100' 
                          : isPassed
                          ? 'text-green-100'
                          : 'text-gray-400 group-hover:text-gray-200'
                      }`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow for Active Step */}
                    {isActive && (
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-6 bg-white rotate-45 shadow-xl animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {/* Connection Arrow (Mobile) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-4">
                      <FaArrowRight className="text-2xl text-blue-400 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-8 shadow-2xl animate-bounce">
            <FaLightbulb className="text-2xl text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-6">
            Why Choose Our Platform?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "95%", label: "Success Rate", color: "from-green-400 to-emerald-500" },
              { number: "2x", label: "Faster Hiring", color: "from-blue-400 to-cyan-500" },
              { number: "AI", label: "Powered Matching", color: "from-purple-400 to-pink-500" },
              { number: "24/7", label: "Support", color: "from-orange-400 to-red-500" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:bg-gray-700/40 transition-all duration-300 group-hover:scale-105">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 mr-3">Start Your Journey</span>
            <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.3); }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default JobProcessFlow;
