import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { getPopularJobs } from '../../services/apicalls/jobApi';
import { useSelector } from 'react-redux';

const dotColors = ['#FF3B3F', '#FF9F1C', '#2EC4B6']; // vivid colors

const pulseAnimationStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  marginTop: '2rem',
};

const dotStyleBase = {
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
  animationIterationCount: 'infinite',
  animationDuration: '1.2s',
  animationName: 'pulse-dot',
};

const dotKeyframes = `
  @keyframes pulse-dot {
    0%, 80%, 100% {
      transform: scale(0.6);
      opacity: 0.7;
      box-shadow: 0 0 6px rgba(0,0,0,0.15);
    }
    40% {
      transform: scale(1.2);
      opacity: 1;
      box-shadow: 0 0 12px currentColor;
    }
  }
`;

const PopularJobsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const [popularJobs, setPopularJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function getpj() {
      setLoading(true);
      const data = await getPopularJobs(token);
      setPopularJobs(data.data);
      setLoading(false);
    }

    if (token) getpj();
  }, [token]);

  const maxIndex = popularJobs.length - cardsPerView;

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  // Visible slice
  const visibleJobs = popularJobs.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className="py-16 px-6 relative" style={{ background: '#f1f3f5' }}>
      <style>{dotKeyframes}</style>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popular Jobs</h2>
      {loading ? (
        <div style={pulseAnimationStyle} aria-label="Loading popular jobs" role="status">
          {dotColors.map((color, index) => (
            <span
              key={index}
              style={{
                ...dotStyleBase,
                backgroundColor: color,
                animationDelay: `${index * 0.2}s`,
                color: color,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)` }}
          >
            {popularJobs.map((job) => (
              <div key={job.id} className="flex-shrink-0 w-1/4 px-2">
                <JobCard
                  key={job.job_id}
                  jobId={job.job_id}
                  companyName={job.org}
                  companyLogo={job.org_avatar}
                  jobTitle={job.title}
                  lastDate={job.terminate_at}
                  onViewDetails={() => console.log(`View ${job.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularJobsSection;
