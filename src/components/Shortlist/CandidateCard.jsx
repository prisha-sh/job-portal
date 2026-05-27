
import React, { useState } from 'react';
import { FaTrash, FaComments, FaFileAlt } from 'react-icons/fa';
import { disqualifyApplicant } from '../../services/apicalls/jobApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const CandidateCard = ({
  userId,
  jobId,
  candidate,
  number        = 1,
  onSelect       = () => {},
  onShowResume   = () => {}
}) => {
  const navigate = useNavigate();
   const onConnect  = () => {navigate(`/chat/${userId}`)};

  const [removed,setRemoved] = useState(false);
  const token = useSelector((state)=>state.auth.token);
   const  onRemove   = () => {
    disqualifyApplicant(userId,jobId,token)
  setRemoved(true)};

  const [selected, setSelected] = useState(false);

  const toggleSelect = () => {
    const newState = !selected;
    setSelected(newState);
    onSelect(candidate.id, newState);
  };

  return (
  <div>
    {
      (removed)?<div></div>:  <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
      {/* Top banner & number badge */}
      <div className="relative h-28 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
          {number}
        </div>
        <img
          src={candidate.user_avatar_link}
          alt={candidate.firstname}
          className="w-24 h-24 rounded-full object-cover absolute -bottom-9 left-1/2 -translate-x-1/2 border-4 border-white shadow"
        />
      </div>

      {/* Name */}
      <div className="pt-9 pb-4 px-3 text-center">
        <h3 className="text-sm font-bold text-gray-900 mb-3">{candidate.firstname+" "+candidate.lastname}</h3>

        {/* Buttons */}
        <div className="space-y-2">
          {/* Connect */}
          <button
            onClick={() => onConnect(candidate.id)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 rounded flex items-center justify-center gap-1"
          >
            <FaComments className="text-xs" /> Connect
          </button>

          <div className="grid grid-cols-2 gap-1">
            {/* Select */}
          

            {/* Resume */}
            <button
              onClick={() => onShowResume(candidate)}
              className="bg-purple-100 text-purple-700 hover:bg-purple-200 py-2 rounded flex items-center justify-center"
            >
              <FaFileAlt className="text-xs" />
            </button>

            {/* Remove */}
            <button
              onClick={() => onRemove(candidate.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
    }
  </div>
  );
};

export default CandidateCard;
