import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyCards = ({
  jobId, // Added jobId prop
  companyName = "Microsoft", // Default values
  companyLogo = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  jobTitle = "Software Engineer",
  description = "Apply here to be a Software engineer at Microsoft",
  buttonText = "See Status"
}) => {
  const navigate = useNavigate();
  const words = description.trim().split(/\s+/);
  const newt = (words.length <= 3)? description:
   words.slice(0, 3).join(' ') + '...';
  const handleJobClick = () => {
    if (jobId) {
      // Navigate to UserJobPost component with jobId in params
      navigate(`/user-job-post/${jobId}`);
    } else {
      console.log("No jobId provided");
    }
  };

  return (
    <div
      className="card px-3 bg-base-100 card-xs shadow-sm m-3 min-w-[250px]"
      data-theme="light"
    >
      <div className="card-body">
        <h2 className="card-title text-2xl h-9 flex items-center space-x-2">
          {companyLogo && (
            <img
              src={companyLogo}
              alt={`${companyName} Logo`}
              className="w-6 h-6 object-contain"
            />
          )}
          <span>{companyName}</span>
        </h2>
        <h2 className="card-title text-m text-gray-600">{jobTitle}</h2>
        <p className="text-[15px]">{newt}</p>
        <div className="justify-left card-actions mb-3">
          <button 
            onClick={handleJobClick}
            className={`btn btn-info text-white ${buttonText === "Results" ? " bg-green-300 border-0" : ""}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyCards;
