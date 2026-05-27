import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import JobCard from './JobCard';
import { getAllJobs } from '../../services/apicalls/jobApi';
import { useSelector } from 'react-redux';
const AllJobsSection = () => {
  const perPage = 12;
  const [jobs , setJobs] = useState([]);
 const reduxToken = useSelector((state) => state.auth.token);
  const localStorageToken = localStorage.getItem('token');
  const token = reduxToken || localStorageToken || null;
  useEffect(() => {
  async function getData() {
    const data = await getAllJobs(token);
    console.log(data);
    if (data.success) {
      setJobs(data.data);
    }
  }
  if (token) {
    getData();
  }
}, [token]);
  const pages = Math.max(1, Math.ceil(jobs.length / perPage));
  const [page, setPage] = useState(0);

  const start = page * perPage;
  const visibleJobs = jobs.slice(start, start + perPage);

  return (
    <section
      className="relative py-16 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0f23 0%, #1b2333 60%, #0a0f23 100%)' }}
    >
      {/* Artistic Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-purple-700/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-800/20 rounded-full blur-3xl animate-blob delay-2000"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-2xl animate-blob delay-4000"></div>

      {/* Grid of JobCards */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
          All Jobs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {visibleJobs.map(job => (
            <JobCard
              key={job.job_id}
              jobId={job.job_id}
              companyName={job.org}
              companyLogo={job.org_avatar}
              jobTitle={job.title}
              lastDate={job.terminate_at}
              onViewDetails={() => console.log(`View ${job.id}`)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-6 mt-8">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            disabled={page === 0}
            className={`flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition ${
              page === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaChevronLeft /> Previous
          </button>
          <span className="text-gray-300">
            Page {page + 1} of {pages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, pages - 1))}
            disabled={page >= pages - 1}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition ${
              page >= pages - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Blob Animation CSS */}
      <style jsx>{`
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

export default AllJobsSection;
