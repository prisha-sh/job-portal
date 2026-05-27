import React, { useState, useEffect } from 'react';
import { FaSearch, FaBriefcase, FaStar, FaRocket } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { searchJobsByTitle } from '../services/apicalls/jobApi'; // Adjust path as needed
import ApplyCards from '../components/ApplyCards';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

const SearchJobs = () => {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Get token from Redux store or localStorage as fallback
  const reduxToken = useSelector((state) => state.auth.token);
  const localStorageToken = localStorage.getItem('token');
  const token = reduxToken || localStorageToken;

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    if (!token) {
      toast.error('Please login to search jobs');
      return;
    }

    setLoading(true);
    try {
      const response = await searchJobsByTitle(query, token);
      
      if (response.success) {
        setJobs(response.data);
        setHasSearched(true);
        toast.success(`Found ${response.data.length} jobs`);
      } else {
        toast.error(response.message || 'Error searching jobs');
        setJobs([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Network error occurred');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <Navbar/>
      <section
        className="relative py-20 px-6 overflow-hidden min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #0a0f23 0%, #1b2333 60%, #0a0f23 100%)'
        }}
      >
        
        {/* Animated Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-700/20 rounded-full blur-3xl animate-blob delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-2xl animate-blob delay-4000"></div>

        {/* Floating Icons */}
        <FaBriefcase className="absolute animate-float-slow text-blue-400 text-4xl left-8 top-24 opacity-20" />
        <FaStar className="absolute animate-float-slow text-cyan-400 text-3xl right-16 top-40 opacity-20 delay-1000" />
        <FaRocket className="absolute animate-float-slow text-indigo-400 text-5xl left-1/4 bottom-24 opacity-20 delay-2000" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Search Bar */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-2xl flex gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search jobs by title or keywords..."
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className={`px-6 py-3 rounded-full font-semibold text-white transition-colors ${
                  loading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-cyan-600 hover:bg-cyan-700'
                }`}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center mb-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
          )}

          {/* Results Count */}
          {hasSearched && !loading && (
            <div className="text-center mb-6">
              <p className="text-gray-300 text-lg">
                {jobs.length > 0 
                  ? `Found ${jobs.length} jobs for "${query}"` 
                  : `No jobs found for "${query}". Try different keywords.`
                }
              </p>
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length > 0 ? jobs.map((job, idx) => (
              <div
                key={job.job_id}
                className={`transform transition-all duration-700 ${
                  animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <ApplyCards
                  jobId={job.job_id}
                  companyName={job.org || "Company"} // Adjust field names as per your API response
                  companyLogo={job.org_avatar}
                  jobTitle={job.title}
                  description={job.body}
                  buttonText="Apply Now"
                  rank={job.rank} // Show search relevance rank if needed
                />
              </div>
            )) : hasSearched && !loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <FaSearch className="text-6xl text-gray-400 mb-4" />
                <p className="text-center text-gray-400 text-xl">
                  No jobs found for "{query}"
                </p>
                <p className="text-center text-gray-500 mt-2">
                  Try searching with different keywords or job titles
                </p>
              </div>
            ) : !hasSearched ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <FaBriefcase className="text-6xl text-gray-400 mb-4" />
                <p className="text-center text-gray-400 text-xl">
                  Search for your dream job
                </p>
                <p className="text-center text-gray-500 mt-2">
                  Enter keywords or job titles to find relevant opportunities
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%,100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 10s infinite;
          }
          @keyframes float {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float-slow {
            animation: float 6s ease-in-out infinite;
          }
          .delay-1000 { animation-delay: 1s; }
          .delay-2000 { animation-delay: 2s; }
          .delay-4000 { animation-delay: 4s; }
        `}</style>
      </section>
    </div>
  );
};

export default SearchJobs;
