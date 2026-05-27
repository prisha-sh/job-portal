import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { getAiJobs } from '../../services/apicalls/jobApi';
import { useSelector } from 'react-redux';

const AiJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const userId = useSelector(state => state.auth.userId);
  const token = useSelector(state => state.auth.token);
  const cardsPerView = 5;

  useEffect(() => {
    async function getData() {
      const data = await getAiJobs(userId, token);
      console.log(data);
      if (data.success) {
        setJobs(data.data);
        console.log(data.data);
      }
    }
    
    getData();
  }, []);

  const nextJobs = () => {
    if (currentIndex < jobs.length - cardsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevJobs = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleJobs = jobs.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section
      className="relative py-16 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0f23 0%, #1b2333 60%, #0a0f23 100%)' }}
    >
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-purple-700/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-800/20 rounded-full blur-3xl animate-blob delay-2000"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-2xl animate-blob delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">
          AI based Job Suggestions
        </h1>

        {jobs.length > 0 && (
          <div className="relative">
            {/* Left Navigation Button */}
            <button
              onClick={prevJobs}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 
                bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 
                hover:bg-white/20 transition-all duration-300 ${
                currentIndex === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-110 hover:shadow-xl'
              }`}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Navigation Button */}
            <button
              onClick={nextJobs}
              disabled={currentIndex >= jobs.length - cardsPerView}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 
                bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 
                hover:bg-white/20 transition-all duration-300 ${
                currentIndex >= jobs.length - cardsPerView 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-110 hover:shadow-xl'
              }`}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Jobs Carousel Container */}
            <div className="overflow-hidden mx-16">
              <div className="ai-jobs-carousel">
                {visibleJobs.map(job => (
                  <JobCard
                    key={job.job_id}
                    jobId={job.job_id}
                    companyName={job.org}
                    companyLogo={job.org_avatar}
                    jobTitle={job.title}
                    lastDate={job.terminate_at}
                    onViewDetails={() => console.log(`View ${job.job_id}`)}
                  />
                ))}
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-10 space-x-3">
              {Array.from({ length: Math.ceil(jobs.length / cardsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                  }`}
                />
              ))}
            </div>

            
          
          </div>
        )}

        {jobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-300 text-lg">No AI job suggestions available at the moment.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .ai-jobs-carousel {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          justify-items: center;
          transition: transform 0.5s ease-in-out;
        }

        /* Mobile: 1 column */
        @media (max-width: 640px) {
          .ai-jobs-carousel {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* Small tablets: 2 columns */
        @media (min-width: 641px) and (max-width: 900px) {
          .ai-jobs-carousel {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem;
          }
        }

        /* Medium screens: 3 columns */
        @media (min-width: 901px) and (max-width: 1200px) {
          .ai-jobs-carousel {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }

        /* Large screens: 4 columns */
        @media (min-width: 1201px) and (max-width: 1400px) {
          .ai-jobs-carousel {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }

        /* Extra large screens: 5 columns */
        @media (min-width: 1401px) {
          .ai-jobs-carousel {
            grid-template-columns: repeat(5, 1fr);
            gap: 2.25rem;
          }
        }

        /* Blob animations */
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default AiJobs;
