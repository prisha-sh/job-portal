import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import EmployerSignup from './pages/EmployerSignup.jsx'
import UserRegistration from './pages/UserRegistration.jsx'
import EmployerSection from './pages/EmployerSection.jsx'
import EmployerPost from './pages/EmployerPost.jsx'
import Shortlisted from './pages/Shortlisted.jsx'
import UserJobPost from './pages/UserJobPost.jsx'  // Import UserJobPost
import SearchJobs from './pages/SearchJobs.jsx'
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

const router = createBrowserRouter(
  [
  { path: "/", element: <Home /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/search-jobs", element: <SearchJobs /> },
  { path: "/login", element: <Login /> },
  { path: "/employer-signup", element: <EmployerSignup /> },
  { path: "/user-signup", element: <Signup /> },
  { path: "/user-personal-tab", element: <UserRegistration /> },
  { path: "/employer-personal-tab", element: <EmployerSection /> },
  { path: "/employer/job/:jobId", element: <EmployerPost /> },
  { path: "/jobs/:jobId/applicants", element: <Shortlisted /> },  // Added shortlist route
  { path: "/user-job-post/:jobId", element: <UserJobPost /> },
  {path:"/call/:id", element:<CallPage/>},
  {path:"/chat/:id", element:<ChatPage/>}
]

)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
