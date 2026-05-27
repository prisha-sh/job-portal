import React, { useState } from "react";
import { useSelector } from "react-redux";
import SidebarProfile from "../components/SidebarProfile.jsx";
import ProfileSetter from "../components/ProfileSetter.jsx";
import Myapplications from "../components/Myapplications.jsx";
import Navbar from "../components/Navbar.jsx";
import UserChat from "../components/UserChat.jsx";
import Home from "./Home.jsx";

const UserRegistration = () => {
  const token = useSelector((state) => state.auth.token);

  // use a string tab so it's extensible: "profile" | "applications" | "chat"
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800 text-white">
      {token ? (
        <div>
          <Navbar />
          <div className="flex">
            <SidebarProfile activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 ml-4 p-6">
              {activeTab === "profile" && <ProfileSetter />}
              {activeTab === "applications" && <Myapplications />}
              {activeTab === "chat" && <UserChat />}
            </div>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default UserRegistration;
