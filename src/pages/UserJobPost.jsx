import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import img from "../images/tech.gif";
import { useSelector } from 'react-redux';
import { getJobDetails, applyToJob, checkIfApplied } from '../services/apicalls/jobApi'; // Added checkIfApplied import
import LoadingScreen from '../components/LoadingScreen';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const UserJobPost = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false); // Added for checking application status

  const reduxToken = useSelector((state) => state.auth.token);
  const localStorageToken = localStorage.getItem('token');
  const token = reduxToken || localStorageToken || null;

  // Get user ID from Redux store
  const userId = useSelector((state) => state.auth.userId) ||jwtDecode(useSelector((state)=>state.auth.token)).id;
 
  console.log(userId)
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!jobId || !userId || !token) {
        
        return;
      }

      setCheckingStatus(true);
      try {
        console.log("Checking if user has applied to job...");
        const response = await checkIfApplied(userId, jobId, token);
        
        // Console log the result as requested
        console.log("Check if applied API response:", response);
        
        if (response.success) {
          setApplied(response.applied);
          console.log(`User ${response.applied ? 'has already' : 'has not'} applied to this job`);
        } else {
          console.error("Failed to check application status:", response);
        }
      } catch (error) {
        console.error('Error checking application status:', error);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkApplicationStatus();
  }, [jobId, userId, token]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId || !token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await getJobDetails(jobId, token);
        if (response.success) {
          setJobData(response.data);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [jobId, token]);

  const calculateDaysRemaining = (lastDate) => {
    const now = new Date();
    const deadline = new Date(lastDate);
    const diff = deadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  // Updated handleApply function to call applyToJob API
  const handleApply = async () => {
    if (!jobData?.active || daysRemaining <= 0) {
      toast.error("This job is no longer active");
      return;
    }

    if (applied) {
      toast.info("You have already applied to this job");
      return;
    }

    setApplying(true);
    try {
      const response = await applyToJob(jobId, token);
      
      if (response.success) {
        setApplied(true);
        toast.success("Applied successfully!");
        
        // Update job data to reflect new application count
        setJobData(prev => ({
          ...prev,
          cur_applications: prev.cur_applications + 1
        }));
      } else {
        toast.error(response.message || "Failed to apply for job");
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      toast.error("Error applying to job");
    } finally {
      setApplying(false);
    }
  };

  if (loading || checkingStatus) {
    return <LoadingScreen />;
  }

  if (!jobData) {
    return (
      <div className="w-full overflow-x-hidden min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Job not found or failed to load.</p>
        </div>
      </div>
    );
  }

  const {
    org: companyName,
    org_avatar: companyLogo,
    employer_firstname,
    employer_lastname,
    title: jobTitle,
    body: jobDescription,
    min_10th_percentage,
    min_12th_percentage,
    terminate_at: lastDateToApply,
    cur_applications: totalApplicants,
    active: isJobActive,
  } = jobData;

  const employerName = `${employer_firstname || ''} ${employer_lastname || ''}`.trim();
  const daysRemaining = calculateDaysRemaining(lastDateToApply);
  const jobImage = img;

  // Check if job is active and within deadline
  const canApply = isJobActive && daysRemaining > 0 && !applied;

  return (
<div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800 pb-10">
      <Navbar />

      <div className="px-4 pt-3 max-w-[1080px] mx-auto">
        <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 mt-3">
          {companyLogo && (
            <img
              src={companyLogo}
              alt={`${companyName} Logo`}
              className="w-40 h-40 object-contain rounded-lg"
            />
          )}
          <h1 className="text-5xl font-extrabold text-gray-900">{companyName}</h1>
          <p className="text-xl text-gray-600">Employer: {employerName}</p>
        </div>

        <div className="flex flex-col lg:flex-row mt-8 justify-between max-w-[1200px] mx-auto space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{jobTitle}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {jobDescription}
            </p>
          </div>

          <div className="flex-shrink-0 w-full lg:w-96 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
              <h3 className="text-lg font-medium text-gray-600 mb-4">
                Eligibility & Enrollment Info
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min 10th Standard Percentage Required
                  </label>
                  <span className="px-4 py-2 rounded-lg text-gray-900 block">
                    {min_10th_percentage}%
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min 12th Standard Percentage Required
                  </label>
                  <span className="px-4 py-2 rounded-lg text-gray-900 block">
                    {min_12th_percentage}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 w-full">
                <img
                  src={jobImage}
                  alt={`${jobTitle} at ${companyName}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-white text-xl font-bold">{jobTitle}</h2>
                  <p className="text-white/90 text-sm">{companyName}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{totalApplicants}</div>
                    <div className="text-sm text-gray-600 mt-1">Total Applicants</div>
                  </div>

                  <div className="text-center bg-orange-50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-orange-600">
                      {new Date(lastDateToApply).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}
                    </div>
                    <div className="text-xs text-gray-500">Last Date</div>
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isJobActive && daysRemaining > 7
                      ? 'bg-green-100 text-green-800'
                      : isJobActive && daysRemaining > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {isJobActive ? (daysRemaining > 0 ? 'Active' : 'Closed') : 'Inactive'}
                  </span>
                </div>

                <button
                  onClick={handleApply}
                  disabled={!canApply || applying || applied}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none ${
                    applied
                      ? 'bg-green-500 text-white cursor-not-allowed' // Green color for already applied
                      : !canApply
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : applying
                      ? 'bg-blue-400 text-white cursor-wait'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {applying 
                    ? 'Applying...' 
                    : applied 
                      ? '✓ Already Applied' // Updated text for already applied state
                      : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserJobPost;
