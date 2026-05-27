import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SidebarProfile = ({ activeTab, setActiveTab }) => {
  const isregistered = useSelector((state) => state.auth.isRegistered);

  const buttonBase =
    "btn btn-ghost justify-start w-full gap-3 px-3 normal-case text-left rounded-xl";

  return (
    <aside
      className="w-64 bg-gray-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0"
      data-theme="light"
    >
      <nav className="flex-1 p-4 space-y-2">
        {isregistered && (
          <Link
            to="/"
            className={`${buttonBase} ${activeTab === "home" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <span>Home</span>
          </Link>
        )}

        <button
          className={`${buttonBase} ${activeTab === "profile" ? "bg-gray-600 text-white" : ""}`}
          onClick={() => setActiveTab("profile")}
          aria-pressed={activeTab === "profile"}
        >
          <span>My Profile</span>
        </button>

        {isregistered && (
          <button
            className={`${buttonBase} ${activeTab === "applications" ? "bg-gray-600 text-white" : ""}`}
            onClick={() => setActiveTab("applications")}
            aria-pressed={activeTab === "applications"}
          >
            <span>Applications</span>
          </button>
        )}

        {/* Chat tab */}
        <button
          className={`${buttonBase} ${activeTab === "chat" ? "bg-gray-600 text-white" : ""}`}
          onClick={() => setActiveTab("chat")}
          aria-pressed={activeTab === "chat"}
        >
          <span>Messages</span>
        </button>
      </nav>
    </aside>
  );
};

export default SidebarProfile;
