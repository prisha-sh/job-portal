// MyApplicationsChat.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserJobs } from "../services/apicalls/jobApi"; // adjust path if needed
import LoadingScreen from "./LoadingScreen";

/**
 * Renders a grid of the user's applications with a "Message" button
 * that navigates to /chat/:id
 */
export default function UserChat() {
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Token & userId (same preference: redux -> localStorage)
  const reduxToken = useSelector((state) => state.auth.token);
  const localStorageToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = reduxToken || localStorageToken || null;
  const userId = useSelector((state) => state.auth.userId);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchUserJobs = async () => {
      if (!userId || !token) {
        console.warn("Missing userId or token - skipping fetch");
        setUserJobs([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await getUserJobs(userId, token);
        if (!cancelled) {
          if (res && res.success) {
            setUserJobs(Array.isArray(res.data) ? res.data : []);
          } else {
            console.error("getUserJobs returned unexpected response:", res);
            setUserJobs([]);
          }
        }
      } catch (err) {
        console.error("Error fetching user jobs:", err);
        if (!cancelled) setUserJobs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUserJobs();
    return () => {
      cancelled = true;
    };
  }, [userId, token]);

  // Helper to compute chat target id from application object
  const getChatTargetId = (application) => {
   console.log(application) // common possible fields — adjust if your API uses different names
    return (
        
      application?.org_id ||
      application?.employer_id ||
      application?.recruiter_id ||
      application?.org_user_id ||
      // fallback to org string (company slug/name) if that's all you have
      application?.org ||
      null
    );
  };

  const handleStartChat = (application) => {
    const targetId = getChatTargetId(application);
    if (!targetId) {
      // no valid id to chat with
      return;
    }

    // Pass some optional state so ChatPage can show company name / job info if needed
    const state = {
      companyName: application.org || application.companyName || "",
      jobTitle: application.title || "",
      applicationId: application.application_id || null,
    };

    navigate(`/chat/${encodeURIComponent(String(targetId))}`, { state });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="px-6 py-6">
      <h2 className="text-3xl font-semibold text-white mb-10 ">
        Messages
      </h2>

      {userJobs.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-gray-500">You have no active applications to message.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userJobs.map((application, idx) => {
            const key = application.application_id || application.job_id || idx;
            const companyName = application.org || application.companyName || "Company";
            const jobTitle = application.title || application.job_title || "Job";
            const logoUrl =
              application.org_avatar ||
              application.companyLogo ||
              application.org_logo ||
              ""; // fallback empty

            const chatTargetId = getChatTargetId(application);
            const canMessage = Boolean(chatTargetId);

            return (
              <div
                key={key}
                className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    {logoUrl ? (
                      <img src={logoUrl} alt={`${companyName} logo`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-xs text-gray-400">No logo</div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{companyName}</div>
                    <div className="text-sm text-gray-500 truncate mt-1">{jobTitle}</div>
                  </div>
                </div>

                {/* optional metadata row */}
                <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                  <div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>{" "}
                      <span className="ml-1">{application.status || "Unknown"}</span>
                    </div>
                   
                  </div>

                  {/* Message button */}
                  <div>
                    <button
                      onClick={() => handleStartChat(application)}
                      disabled={!canMessage}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                        canMessage
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                      aria-disabled={!canMessage}
                    >
                      {/* message icon */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      Message
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
