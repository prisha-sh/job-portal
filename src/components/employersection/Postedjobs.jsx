import React, { useState, useEffect } from 'react'
import Jobcard from '../Jobcard';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { getActiveEmployerJobs, getInactiveEmployerJobs } from '../../services/apicalls/jobApi';
import LoadingScreen from '../LoadingScreen';

const Postedjobs = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [inactiveJobs, setInactiveJobs] = useState([]);
  const [activeStartIndex, setActiveStartIndex] = useState(0);
  const [inactiveStartIndex, setInactiveStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const role = useSelector((state)=>state.auth.role);
  const visibleCount = 6;

  // Get token and userId (as employerId) from Redux auth slice
  const reduxToken = useSelector((state) => state.auth.token);
  const localStorageToken = localStorage.getItem('token');
  const token = reduxToken || localStorageToken || null;
  
  // Get userId as employerId from auth slice
  const employerId = useSelector((state) => state.auth.userData.employer_id);
  console.log(employerId, "is the userId")
  
  // Add console logs for debugging

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      
      if (!token || !employerId) {
        console.log("Missing token or employerId");
        return;
      }
      
      setLoading(true);
      try {
        console.log("Calling getActiveEmployerJobs...");
        // Fetch active jobs
        const activeResponse = await getActiveEmployerJobs(employerId, token);
        console.log("Active jobs response:", activeResponse);
        if (activeResponse.success) {
          setActiveJobs(activeResponse.data);
          console.log("Active jobs set:", activeResponse.data);
        } else {
          console.error("Failed to fetch active jobs:", activeResponse);
        }

        console.log("Calling getInactiveEmployerJobs...");
        // Fetch inactive jobs
        const inactiveResponse = await getInactiveEmployerJobs(employerId, token);
        console.log("Inactive jobs response:", inactiveResponse);
        if (inactiveResponse.success) {
          setInactiveJobs(inactiveResponse.data);
          console.log("Inactive jobs set:", inactiveResponse.data);
        } else {
          console.error("Failed to fetch inactive jobs:", inactiveResponse);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token, employerId]);

  // Pagination handlers for active jobs
  const handleActiveNext = () => {
    setActiveStartIndex((prev) =>
      Math.min(prev + visibleCount, activeJobs.length - visibleCount)
    );
  };

  const handleActivePrev = () => {
    setActiveStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  // Pagination handlers for inactive jobs
  const handleInactiveNext = () => {
    setInactiveStartIndex((prev) =>
      Math.min(prev + visibleCount, inactiveJobs.length - visibleCount)
    );
  };

  const handleInactivePrev = () => {
    setInactiveStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  // Get company info from first job (if available) - removed placeholder
  const companyName = activeJobs[0]?.org || inactiveJobs[0]?.org || "Your Company";
  const companyLogoUrl = activeJobs[0]?.org_avatar || inactiveJobs[0]?.org_avatar;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className='w-full h-full relative'>
      <div className="max-w-4xl left-3 mx-auto p-6 bg-white w-[90%] mt-3  rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">All Jobs Posting</h1>
        
        <div className="flex items-center space-x-4   rounded-lg ">
          {companyLogoUrl && (
            <img
              src={companyLogoUrl}
              alt={`${companyName} Logo`}
              className="w-20 h-20 mb-2 rounded-full border-1 border-gray-900 shadow-3xl object-contain"
            />
          )}
          <span className="text-2xl ml-3 font-bold text-gray-800">{companyName}</span>
        </div>
      </div>

      {/* Active Job Postings */}
      <div className="mt-5  p-6 rounded-xl mb-5 ">
        <h1 className="text-3xl font-bold mb-6 text-center">Active Job Postings</h1>

        {activeJobs.length === 0 ? (
          <p className="text-center text-gray-500">No active jobs found.</p>
        ) : (
          <div className="flex  items-start justify-center ">
            {/* Left Button */}
            <button
              onClick={handleActivePrev}
              disabled={activeStartIndex === 0}
              className="px-4 py-4 mt-16 bg-blue-500 shadow rounded-full mr-4 hover:bg-gray-200 hover:text-black transition disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 grid-rows-2 gap-4 flex-1">
              {activeJobs
                .slice(activeStartIndex, activeStartIndex + visibleCount)
                .map((job, index) => (
                  <Jobcard
                    key={job.job_id || index + activeStartIndex}
                    jobId={job.job_id}
                    companyName={job.org}
                    companyLogo={job.org_avatar}
                    jobTitle={job.title}
                    description={job.body}
                    lastDate={job.terminate_at}
                    buttonText="View Details"
                  />
                ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleActiveNext}
              disabled={activeStartIndex + visibleCount >= activeJobs.length}
              className="px-4 py-4 bg-blue-500 mt-16 rounded-full ml-4 hover:bg-gray-200 hover:text-black transition disabled:opacity-50"
            >
              <FaArrowRight/>
            </button>
          </div>
        )}
      </div>

      {/* Completed Job Postings */}
      <div className="mt-1 p-6 rounded-xl ">
        <h1 className="text-3xl font-bold mb-6 text-center">Completed Job Postings </h1>

        {inactiveJobs.length === 0 ? (
          <p className="text-center text-gray-500">No completed jobs found.</p>
        ) : (
          <div className="flex items-start mt-5">
            {/* Left Button */}
            <button
              onClick={handleInactivePrev}
              disabled={inactiveStartIndex === 0}
              className="px-4 py-4 mt-16  bg-blue-500 shadow rounded-full mr-4 hover:bg-gray-200 hover:text-black transition disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 grid-rows-2 gap-4 flex-1">
              {inactiveJobs
                .slice(inactiveStartIndex, inactiveStartIndex + visibleCount)
                .map((job, index) => (
                  <Jobcard
                    key={job.job_id || index + inactiveStartIndex}
                    companyName={job.org}
                    jobId={job.job_id}
                    companyLogo={job.org_avatar}
                    jobTitle={job.title}
                    description={job.body}
                    lastDate={job.terminate_at}
                    buttonText="Results"
                  />
                ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleInactiveNext}
              disabled={inactiveStartIndex + visibleCount >= inactiveJobs.length}
              className="px-4 py-4 mt-16 bg-blue-500 rounded-full ml-4 hover:bg-gray-200 hover:text-black transition disabled:opacity-50"
            >
              <FaArrowRight/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Postedjobs;
