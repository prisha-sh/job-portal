import React, { useState, useEffect } from 'react';
import { 
  FaEdit, 
  FaUsers, 
  FaRobot, 
  FaComments, 
  FaVideo, 
  FaHandshake,
  FaArrowRight,
  FaCheckCircle,
  FaBriefcase,
  FaCrown,
  FaStar
} from 'react-icons/fa';

const EmployerProcessFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Create Job Post",
      subtitle: "Define Your Needs",
      description: "Create detailed job postings with specific requirements and let our platform understand exactly what you're looking for.",
      icon: FaEdit,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/20",
      delay: 0
    },
    {
      id: 2,
      title: "View Applicants",
      subtitle: "See Interest",
      description: "Monitor real-time applications and get detailed analytics on candidate engagement and profile quality.",
      icon: FaUsers,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      delay: 0.2
    },
    {
      id: 3,
      title: "AI Shortlisting",
      subtitle: "Smart Selection",
      description: "Let our advanced AI analyze resumes against your job requirements and automatically shortlist the best matches.",
      icon: FaRobot,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/20",
      delay: 0.4
    },
    {
      id: 4,
      title: "Direct Chat",
      subtitle: "Connect Instantly",
      description: "Engage with shortlisted candidates through our integrated messaging system for quick screening and communication.",
      icon: FaComments,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/20",
      delay: 0.6
    },
    {
      id: 5,
      title: "Video Interviews",
      subtitle: "Face-to-Face Assessment",
      description: "Conduct professional video interviews with built-in recording, screen sharing, and collaborative assessment tools.",
      icon: FaVideo,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/20",
      delay: 0.8
    },
    {
      id: 6,
      title: "Complete Hiring",
      subtitle: "Make Your Choice",
      description: "Finalize your hiring decision with integrated offer management, onboarding tools, and candidate tracking.",
      icon: FaHandshake,
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
    }, 3500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="relative overflow-hidden py-20 px-4" style={{ 
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f1a 100%)'
    }}>
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs with different colors */}
        <div className="absolute top-16 right-10 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 left-20 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 right-1/3 w-72 h-72 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Hexagonal Grid Pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="50" height="43.3" patternUnits="userSpaceOnUse">
                <polygon points="25,0 45,12.5 45,32.5 25,45 5,32.5 5,12.5" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)" className="animate-pulse"/>
          </svg>
        </div>

        {/* Flowing Lines - Different Pattern */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="employerFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0"/>
              <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.4"/>
              <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path 
            d="M0,150 Q150,75 300,150 T600,150 Q750,225 900,150 T1200,150 L1200,200 Q1050,275 900,200 T600,200 Q450,125 300,200 T0,200 Z" 
            fill="url(#employerFlowGradient)"
            className="animate-pulse"
          />
          <path 
            d="M0,350 Q200,275 400,350 T800,350 Q1000,425 1200,350 L1200,400 Q1000,475 800,400 T400,400 Q200,325 0,400 Z" 
            fill="url(#employerFlowGradient)"
            className="animate-pulse delay-1500"
            opacity="0.7"
          />
        </svg>

        {/* Diamond Shapes */}
        <div className="absolute top-1/4 left-1/4 transform rotate-45 animate-spin-slow">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 border border-emerald-400/20"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 transform -rotate-12 animate-bounce">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 border border-purple-400/20"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mb-8 shadow-2xl">
            <FaBriefcase className="text-3xl text-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent mb-6">
            Empower Your
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Hiring Process
            </span>
          </h2>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto leading-relaxed">
            From job posting to perfect hire - our AI-driven platform revolutionizes 
            how employers find, assess, and hire top talent with intelligent automation.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Lines - Curved */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-2">
            <svg className="w-full h-8" preserveAspectRatio="none">
              <path 
                d="M0,16 Q200,8 400,16 T800,16 Q1000,8 1200,16" 
                stroke="url(#employerFlowGradient)" 
                strokeWidth="3" 
                fill="none"
                className="animate-pulse"
              />
            </svg>
            <div 
              className="absolute top-0 h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-full transition-all duration-1000 ease-out shadow-xl"
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
                  <div className={`relative overflow-hidden rounded-3xl backdrop-blur-xl border-2 transition-all duration-500 mt-2 ${
                    isActive 
                      ? 'bg-gray-800/50 border-emerald-400/60 shadow-2xl shadow-emerald-500/20' 
                      : isPassed 
                      ? 'bg-gray-800/40 border-cyan-400/40 shadow-xl shadow-cyan-400/10'
                      : 'bg-gray-900/40 border-gray-600/40 shadow-lg hover:bg-gray-800/45 hover:border-gray-500/50'
                  }`}>
                    
                    {/* Animated Background Pattern */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500`}>
                      <div className={`w-full h-full bg-gradient-to-br ${step.color}`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
                    </div>
                    
                    

                    {/* Content */}
                    <div className="relative p-8 text-center">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-500 ${
                        isActive 
                          ? `bg-gradient-to-br ${step.color} shadow-2xl scale-110 animate-pulse` 
                          : isPassed
                          ? 'bg-gradient-to-br from-cyan-500 to-emerald-600 shadow-xl'
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
                          ? 'text-cyan-300'
                          : 'text-gray-100 group-hover:text-white'
                      }`}>
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      <p className={`text-sm font-semibold mb-4 transition-all duration-300 ${
                        isActive 
                          ? 'text-emerald-200' 
                          : isPassed
                          ? 'text-cyan-200'
                          : 'text-gray-300 group-hover:text-emerald-200'
                      }`}>
                        {step.subtitle}
                      </p>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed transition-all duration-300 ${
                        isActive 
                          ? 'text-gray-100' 
                          : isPassed
                          ? 'text-cyan-100'
                          : 'text-gray-400 group-hover:text-gray-200'
                      }`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Double Arrow for Active Step */}
                    {isActive && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 bg-emerald-400 rotate-45 shadow-xl animate-bounce"></div>
                          <div className="w-4 h-4 bg-cyan-400 rotate-45 shadow-xl animate-bounce delay-200"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Connection Arrow (Mobile) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-4">
                      <FaArrowRight className="text-2xl text-emerald-400 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mb-8 shadow-2xl animate-bounce">
            <FaStar className="text-2xl text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-6">
            Trusted by Top Employers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "5000+", label: "Companies", color: "from-emerald-400 to-teal-500" },
              { number: "3x", label: "Faster Hiring", color: "from-cyan-400 to-blue-500" },
              { number: "92%", label: "Perfect Matches", color: "from-purple-400 to-pink-500" },
              { number: "AI", label: "Powered Insights", color: "from-orange-400 to-yellow-500" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-600/40 hover:bg-gray-700/50 hover:border-emerald-400/30 transition-all duration-300 group-hover:scale-105">
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
          <button className="group relative inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 mr-3">Start Hiring Smarter</span>
            <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default EmployerProcessFlow;
