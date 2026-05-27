import React from 'react';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ 
  jobId, // Added jobId prop
  companyName, 
  companyLogo, 
  jobTitle, 
  lastDate
}) => {
  const navigate = useNavigate();

  // Function to format date from "2025-09-06T00:00:00.000Z" to "Sep 6, 2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Handle button click to navigate to UserJobPost
  const handleViewDetails = () => {
    if (jobId) {
      navigate(`/user-job-post/${jobId}`);
    } else {
      console.log("No jobId provided");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group">
      {/* Company Logo & Name */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
          <img
            src={companyLogo}
            alt={`${companyName} logo`}
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{companyName}</h3>
        </div>
      </div>

      {/* Job Title */}
      <h4 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {jobTitle}
      </h4>

      {/* Last Date */}
      <div className="flex items-center space-x-2 text-gray-600 mb-6">
        <FaCalendarAlt className="text-red-500 text-sm" />
        <span className="text-sm">
          Apply by: <span className="font-semibold text-red-600">{formatDate(lastDate)}</span>
        </span>
      </div>

      {/* Action Button */}
      <button
        onClick={handleViewDetails}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>Apply</span>
        <FaExternalLinkAlt className="text-sm" />
      </button>
    </div>
  );
};

export default JobCard;
