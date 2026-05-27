import { apiConnector } from "../apiConnector.js";
import { jobEndPoints } from "../apis.js";

import toast from "react-hot-toast";

const {CREATE_JOB_API,
     GET_ALL_JOBS_API,
     GET_AI_JOBS_API,
     GET_EMPLOYER_JOBS_API,
     GET_JOB_DETAILS,
     GET_USER_JOBS_API,
      APPLY_JOB_API,
      SEARCH_JOB_API,
      SHOW_APPLICANTS_API,
      END_DRIVE_API,
      CHECK_STATUS_API,
      DISQUALIFY_API
 }= jobEndPoints;

export async function createJob(
    title,
    body,
    terminate_at,
    max_applications,
    min_10th,
    min_12th,
    token // Add token as parameter
) {
    try {
        const requestBody = {
            title,
            body,
            terminate_at,
            max_applications,
            min_10th,
            min_12th
        };

        const response = await apiConnector("POST", CREATE_JOB_API, requestBody, {
            Authorization: `Bearer ${token}`,
        });
        
        toast.success("Job posted successfully");
        return {
            success: true,
            message: response.data.message,
            data: response.data
        };
    } catch (error) {
        console.error("Error creating job:", error);
        toast.error("Error in posting job");
        return {
            success: false,
            message: error.response?.data?.message || "Error creating job post",
            error: error.response?.data || error.message
        };
    }
}

export async function getPopularJobs(token) {
  try {
    const response = await apiConnector("GET", `${GET_ALL_JOBS_API}?sort=popular`, null, {
      Authorization: `Bearer ${token}`,
    });
    return {
      success: true,
      data: response.data.slice(0,20)
    };
  } catch (error) {
    console.error("Error fetching popular jobs:", error);
    toast.error("Error fetching popular jobs");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching popular jobs",
      error: error.response?.data || error.message
    };
  }
}

export async function getRecentJobs(token) {
  console.log("the token is", token);
  try {
    const response = await apiConnector("GET", `${GET_ALL_JOBS_API}?sort=recent`, null, {
      Authorization: `Bearer ${token}`,
    });
    return {
      success: true,
      data: response.data.slice(0,20),
    };
  } catch (error) {
    console.error("Error fetching recent jobs:", error);
    toast.error("Error fetching recent jobs");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching recent jobs",
      error: error.response?.data || error.message
    };
  }
}


export async function getAllJobs(token) {
    console.log("the token is", token);
  try {
   const response = await apiConnector("GET", GET_ALL_JOBS_API, null, {
  Authorization: `Bearer ${token}`,
});
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    toast.error("Error fetching jobs");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching jobs",
      error: error.response?.data || error.message
    };
  }
}

export async function getActiveEmployerJobs(employerId, token) {
  console.log("the token is", token);
  console.log("employerId is", employerId);
  
  try {
    const url = `${GET_EMPLOYER_JOBS_API}/${employerId}?active=true`;

    const response = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${token}`,
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching active employer jobs:", error);
    toast.error("Error fetching active employer jobs");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching active employer jobs",
      error: error.response?.data || error.message
    };
  }
}

// Function to get inactive jobs for an employer
export async function getInactiveEmployerJobs(employerId, token) {
  console.log("the token is", token);
  console.log("employerId is", employerId);
  
  try {
    const url = `${GET_EMPLOYER_JOBS_API}/${employerId}?active=false`;

    const response = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${token}`,
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching inactive employer jobs:", error);
    toast.error("Error fetching inactive employer jobs");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching inactive employer jobs",
      error: error.response?.data || error.message
    };
  }
}

export async function getJobDetails(jobId, token) {
  console.log("the token is", token);
  console.log("jobId is", jobId);
  
  try {
    const response = await apiConnector("GET", `${GET_JOB_DETAILS}/${jobId}`, null, {
      Authorization: `Bearer ${token}`,
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching job details:", error);
    toast.error("Error fetching job details");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching job details",
      error: error.response?.data || error.message
    };
  }
}

export async function getUserJobs(userId, token) {
  console.log("the token is", token);
  console.log("userId is", userId);
  
  try {
    const response = await apiConnector("GET", `${GET_USER_JOBS_API}/${userId}`, null, {
      Authorization: `Bearer ${token}`,
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching user jobs:", error);
    toast.error("Error fetching user jobs");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching user jobs",
      error: error.response?.data || error.message
    };
  }
}


export async function applyToJob(jobId, token) {
  console.log("the token is", token);
  console.log("jobId is", jobId);
  
  try {
    const response = await apiConnector("POST", APPLY_JOB_API, {
      job_id: jobId
    }, {
      Authorization: `Bearer ${token}`,
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Applied successfully"
    };
  } catch (error) {
    console.error("Error applying to job:", error);
    toast.error("Error applying to job");
    return {
      success: false,
      message: error.response?.data?.message || "Error applying to job",
      error: error.response?.data || error.message
    };
  }
}

export async function searchJobsByTitle(title, token) {
  console.log("the token is", token);
  console.log("search title is", title);
  
  try {
    const response = await apiConnector("GET", `${SEARCH_JOB_API}/${encodeURIComponent(title)}`, null, {
      Authorization: `Bearer ${token}`,
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error searching jobs:", error);
    toast.error("Error searching jobs");
    return {
      success: false,
      message: error.response?.data?.message || "Error searching jobs",
      error: error.response?.data || error.message
    };
  }
}

export async function fetchJobApplicants(jobId, token) {
  try {
    const url = `${SHOW_APPLICANTS_API}/${jobId}`;
    const response = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${token}`,
    });
    toast.success("Applicants fetched successfully.");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching applicants:", error);
    toast.error("Error fetching applicants");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching applicants",
      error: error.response?.data || error.message,
    };
  }
}
export async function removeJob(jobId, token) {
  console.log("the token is", token);
  console.log("jobId is", jobId);
  
  try {
    const response = await apiConnector("PATCH", `${END_DRIVE_API}/${jobId}`, null, {
      Authorization: `Bearer ${token}`,
    });
    
    toast.success("Job removed successfully");
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Job removed successfully"
    };
  } catch (error) {
    console.error("Error removing job:", error);
    toast.error("Error removing job");
    return {
      success: false,
      message: error.response?.data?.message || "Error removing job",
      error: error.response?.data || error.message
    };
  }
}
export async function checkIfApplied(userId, jobId, token) {
  console.log("the token is", token);
  console.log("userId is", userId);
  console.log("jobId is", jobId);
  
  try {
    const response = await apiConnector("GET", `${CHECK_STATUS_API}/${userId}/${jobId}`, null, {
      Authorization: `Bearer ${token}`,
    });
    
    return {
      success: true,
      data: response.data,
      applied: response.data.applied || false
    };
  } catch (error) {
    console.error("Error checking application status:", error);
    toast.error("Error checking application status");
    return {
      success: false,
      message: error.response?.data?.message || "Error checking application status",
      error: error.response?.data || error.message,
      applied: false
    };
  }
}


export async function disqualifyApplicant(userId, jobId, token) {
  console.log("the token is", token);
  console.log("userId is", userId);
  console.log("jobId is", jobId);
  
  try {
    const response = await apiConnector("PATCH", `${DISQUALIFY_API}/${userId}/${jobId}`, null, {
      Authorization: `Bearer ${token}`,
    });
    
    toast.success("Applicant disqualified successfully");
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Applicant disqualified successfully"
    };
  } catch (error) {
    console.error("Error disqualifying applicant:", error);
    toast.error("Error disqualifying applicant");
    return {
      success: false,
      message: error.response?.data?.message || "Error disqualifying applicant",
      error: error.response?.data || error.message
    };
  }
}




export async function getAiJobs(userId,token) {
  // Get current state from store
  // Get token from auth slice
  

  
  // Check if userId and token exist
  if (!userId) {
    toast.error("User ID not found");
    return {
      success: false,
      message: "User ID not found in auth state"
    };
  }

  if (!token) {
    toast.error("Please log in to continue");
    return {
      success: false,
      message: "Authentication token not found"
    };
  }
  
  try {
    // Use template literals to append userId to the URL
    const response = await apiConnector("GET", `${GET_AI_JOBS_API}/${userId}`, null, {
      Authorization: `Bearer ${token}`,
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching AI job suggestions:", error);
    toast.error("Error fetching job suggestions");
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching job suggestions",
      error: error.response?.data || error.message
    };
  }
}
