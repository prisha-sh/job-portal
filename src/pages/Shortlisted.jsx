import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CandidateCard from '../components/Shortlist/CandidateCard.jsx';
import { FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { fetchJobApplicants } from '../services/apicalls/jobApi';
import { getJobDetails } from '../services/apicalls/jobApi';
import LoadingScreen from '../components/LoadingScreen.jsx';
const ResumeModal = ({ candidate, isOpen, onClose }) => {
  if (!isOpen || !candidate) return null;

  const openDoc = () => window.open(candidate.resume_link, '_blank');

  return (
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {candidate.firstname} {candidate.lastname} — Resume
          </h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-700">×</button>
        </div>
        <div className="p-6 space-y-6">
          <img
            src={candidate.user_avatar_link}
            alt="Avatar"
            className="mx-auto w-32 h-32 object-cover rounded-full shadow"
          />
          <div className="text-center">
            <button
              onClick={openDoc}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              <FaFileAlt /> Open Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Shortlisted() {
    const [loading,setLoading] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const [jobData, setJobData] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState(null);

  const PER_PAGE = 10;
  const pagesTotal = Math.ceil(candidates.length / PER_PAGE);
  const start = page * PER_PAGE;
  const view = candidates.slice(start, start + PER_PAGE);

  useEffect(() => {
    async function loadJob() {
      setLoading(true);
      const result = await getJobDetails(jobId, token);
      if (result.success) {
        setJobData(result.data);
      }
      setLoading(false);
    }
    loadJob();
  }, [jobId, token]);

  useEffect(() => {
    async function loadApplicants() {
      setLoading(true);
      const result = await fetchJobApplicants(jobId, token);
      if (result.success) {
        setCandidates(result.data);
        console.log(result.data);
      }
      setLoading(false);
    }
    loadApplicants();
  }, [jobId, token]);

  const handleShowResume = c => {
    setActiveCandidate(c);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setActiveCandidate(null);
  };
  const goBack = () => navigate(-1);

  return (
    <div>
      {
        (loading)?<LoadingScreen/>:<div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800">

      <Navbar />
      <div className="min-h-screen p-4">
        <div className="mb-4">
          <button onClick={goBack} className="flex items-center space-x-2 text-white hover:text-blue-600">
            <FaArrowLeft /> 
          </button>
        </div>
        {jobData && (
          <header className="max-w-6xl mx-auto mb-6 bg-white rounded-xl shadow-sm p-6 flex items-center gap-6">
            <img src={jobData.org_avatar} alt="" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{jobData.title}</h1>
              <p className="text-sm text-gray-500">at {jobData.org}</p>
              <p className="text-sm text-gray-500">{candidates.length} candidates</p>
            </div>
          </header>
        )}
        <section className="max-w-6xl mx-auto">
          {view.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {view.map((c, idx) => (
                <CandidateCard
                  key={c.user_id}
                  userId = {c.user_id}
                  jobId = {jobId}
                  candidate={c}
                  number={start + idx + 1}
                  onShowResume={handleShowResume}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No candidates found.</p>
          )}
        </section>
        {pagesTotal > 1 && (
          <nav className="flex justify-center gap-2 mt-6">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(p - 1, 0))}
              className={`px-3 py-2 rounded-lg text-sm ${
                page === 0
                  ? 'bg-gray-600 text-white'
                  : 'bg-white text-black shadow-sm border hover:bg-gray-50'
              }`}
            >
              ← Prev
            </button>
            {Array.from({ length: pagesTotal }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 rounded-lg text-sm ${
                  page === i
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-black shadow-sm border hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === pagesTotal - 1}
              onClick={() => setPage(p => Math.min(p + 1, pagesTotal - 1))}
              className={`px-3 py-2 rounded-lg text-sm ${
                page === pagesTotal - 1
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-white text-black shadow-sm border hover:bg-gray-50'
              }`}
            >
              Next →
            </button>
          </nav>
        )}
        <ResumeModal candidate={activeCandidate} isOpen={modalOpen} onClose={closeModal} />
      </div>
    </div>
      }
    </div>
    
  );
}
