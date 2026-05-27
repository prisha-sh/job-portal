import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserJobs } from '../services/apicalls/jobApi'
import ApplyCards from './ApplyCards'
import LoadingScreen from './LoadingScreen'

const Myapplications = () => {
  const [userJobs, setUserJobs] = useState([])
  const [loading, setLoading] = useState(true)

  // Get token and userId from Redux auth slice
  const reduxToken = useSelector((state) => state.auth.token)
  const localStorageToken = localStorage.getItem('token')
  const token = reduxToken || localStorageToken || null
  
  // Get userId from auth slice
  const userId = useSelector((state) => state.auth.userId)

  // Fetch user jobs data
  useEffect(() => {
    const fetchUserJobs = async () => {
      if (!userId || !token) {
        console.log("Missing userId or token")
        setLoading(false)
        return
      }
      
      setLoading(true)
      try {
        console.log("Fetching user jobs for userId:", userId)
        const response = await getUserJobs(userId, token)
        
        if (response.success) {
          setUserJobs(response.data)
          console.log("User jobs fetched:", response.data)
        } else {
          console.error("Failed to fetch user jobs:", response)
        }
      } catch (error) {
        console.error('Error fetching user jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserJobs()
  }, [userId, token])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className=''>
      <h1 className="text-4xl font-bold text-center mt-4 mb-15 w-[70%]">
        Active applications ({userJobs.length})
      </h1>
      
      {userJobs.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>No applications found.</p>
        </div>
      ) : (
        <div className='grid grid-rows-4 grid-cols-3 gap- justify-center items-center gap-3 p-1 m-2 mr-20'>
          {userJobs.map((application, index) => (
            <ApplyCards
              key={application.application_id || index}
              applicationId={application.application_id}
              jobId={application.job_id}
              companyName={application.org}
              companyLogo={application.org_avatar}
              jobTitle={application.title}
              applicationStatus={application.status}
              lastDate={application.terminate_at}
              isActive={application.active}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Myapplications
