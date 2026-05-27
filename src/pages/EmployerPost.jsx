import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import img from "../images/tech.gif"
import { getJobDetails, removeJob } from '../services/apicalls/jobApi' // Added removeJob import
import LoadingScreen from '../components/LoadingScreen'

const EmployerPost = () => {
  const { jobId } = useParams() // Get jobId from URL params
  const navigate = useNavigate() // Add navigate hook
  const [jobData, setJobData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shortlisted, setShortlisted] = useState(false)
  const [endingDrive, setEndingDrive] = useState(false) // Add state for end drive loading

  // Get token from Redux auth slice
  const reduxToken = useSelector((state) => state.auth.token)
  const localStorageToken = localStorage.getItem('token')
  const token = reduxToken || localStorageToken || null

  // Back button handler
  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  // End Drive button handler
  const handleEndDrive = async () => {
    if (!jobId || !token) {
      console.log("Missing jobId or token")
      return
    }

    setEndingDrive(true)
    try {
      console.log("Ending drive for jobId:", jobId)
      const response = await removeJob(jobId, token)
      
      if (response.success) {
        console.log("Drive ended successfully:", response.data)
        // Update local state to reflect the change
        setJobData(prev => ({ ...prev, active: false }))
      } else {
        console.error("Failed to end drive:", response)
      }
    } catch (error) {
      console.error('Error ending drive:', error)
    } finally {
      setEndingDrive(false)
    }
  }

  // Fetch job details when component mounts
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId || !token) {
        console.log("Missing jobId or token")
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        console.log("Fetching job details for jobId:", jobId)
        const response = await getJobDetails(jobId, token)
        
        if (response.success) {
          setJobData(response.data)
          console.log("Job details fetched:", response.data)
        } else {
          console.error("Failed to fetch job details:", response)
        }
      } catch (error) {
        console.error('Error fetching job details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [jobId, token])

  const handleShortlist = () => {
    setShortlisted(!shortlisted)
    if (!shortlisted) {
      navigate(`/jobs/${jobId}/applicants`)
    }
    console.log(shortlisted ? 'Removed from shortlist' : 'Added to shortlist')
  }

  // Calculate days remaining
  const calculateDaysRemaining = (lastDate) => {
    const currentDate = new Date()
    const deadline = new Date(lastDate)
    const timeDifference = deadline.getTime() - currentDate.getTime()
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24))
    return daysRemaining
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (!jobData) {
    return (
      <div className='w-full overflow-x-hidden min-h-screen'>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Job not found or failed to load.</p>
        </div>
      </div>
    )
  }

  // Extract data from fetched job details
  const companyLogo = jobData.org_avatar
  const companyName = jobData.org
  const employerName = `${jobData.employer_firstname || ''} ${jobData.employer_lastname || ''}`.trim() || 'Not specified'
  const jobTitle = jobData.title
  const jobDescription = jobData.body
  const min10thPercentage = `${jobData.min_10th_percentage}%`
  const min12thPercentage = `${jobData.min_12th_percentage}%`
  const lastDateToApply = jobData.terminate_at
  const totalApplicants = jobData.cur_applications
  const daysRemaining = calculateDaysRemaining(lastDateToApply)
  const jobImage = img // Keep using the default image

  return (
<div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800 pb-10">
      <Navbar/>
      <div className="px-4 pt-3">
        {/* Stylish Back Button */}
        <div className="max-w-[1200px] mx-auto mb-4">
          <button
            onClick={handleGoBack}
            className="flex  items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300  shadow-sm  hover:shadow-md group rounded-full hover:rounded-lg transition duration-1000  ease-in-out hover:text-white"
          >
            <FaArrowLeft className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
          </button>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 mt-3 w-full max-w-[1080px] mx-auto">
          {companyLogo && (
            <img
              src={companyLogo}
              alt={`${companyName} Logo`}
              className="w-40 h-40 object-contain rounded-lg"
            />
          )}
          <h1 className="text-5xl font-extrabold text-gray-900">{companyName}</h1>
          <p className="text-xl text-gray-600">Employer: {employerName}</p>
          <p className="text-sm text-gray-500">
            Location: {jobData.employer_city}, {jobData.employer_state}, {jobData.employer_country}
          </p>
        </div>

        <div className='flex flex-col lg:flex-row mt-8 justify-between px-15 max-w-[1200px] mx-auto'>
          <div className="flex-1 max-w-2xl bg-white rounded-xl shadow-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{jobTitle}</h2>
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{jobDescription}</p>
          </div>

          <div className='flex-shrink-0 w-full lg:w-96 space-y-6'>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
              <h3 className="text-lg font-medium text-gray-600 mb-4">
                Eligibility & Enrollment Info
              </h3>

              <div className="flex flex-col gap-2">
                {/* 10th Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min 10th Standard Percentage Required
                  </label>
                  <span className="w-full px-4 py-2 rounded-lg text-gray-900">
                    {min10thPercentage}
                  </span>
                </div>

                {/* 12th Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min 12th Standard Percentage Required
                  </label>
                  <span className="w-full px-4 py-2 rounded-lg text-gray-900">
                    {min12thPercentage}
                  </span>
                </div>

                {/* Max Applications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Applications Allowed
                  </label>
                  <span className="w-full px-4 py-2 rounded-lg text-gray-900">
                    {jobData.max_applications}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Large Image Section */}
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

              {/* Information Section */}
              <div className="p-6">
                {/* Applicants and Date Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Total Applicants */}
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">{totalApplicants}</div>
                      <div className="text-sm text-gray-600 mt-1">Total Applicants</div>
                    </div>
                  </div>

                  {/* Last Date to Apply */}
                  <div className="text-center">
                    <div className="bg-orange-50 rounded-lg p-4">
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
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    jobData.active ? (daysRemaining > 7 
                      ? 'bg-green-100 text-green-800' 
                      : daysRemaining > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    ) : 'bg-gray-100 text-gray-800'
                  }`}>
                    {jobData.active ? (daysRemaining > 0 ? 'Active' : 'Closed') : 'Inactive'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Shortlist Button */}
                  <button
                    onClick={handleShortlist}
                    disabled={!jobData.active || daysRemaining <= 0}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      !jobData.active || daysRemaining <= 0
                        ? 'bg-orange-400 text-white cursor-not-allowed'
                        : shortlisted
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                    } focus:ring-4 focus:ring-blue-300 focus:outline-none`}
                  >
                    {(jobData.active)? "View Candidates" :"Show Results"}
                  </button>

                  {/* End Drive Button */}
                 {
                  (jobData.active)? <button
                    onClick={handleEndDrive}
                    disabled={!jobData.active || endingDrive}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      !jobData.active
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : endingDrive
                          ? 'bg-red-400 text-white cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                    } focus:ring-4 focus:ring-red-300 focus:outline-none`}
                  >
                    {endingDrive ? 'Ending Drive...' : 'End Drive'}
                  </button>:<div></div>
                 }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployerPost
