import React from 'react'
import Employersidebar from '../components/employersection/Employersidebar.jsx'
import EmployerProfile from '../components/employersection/EmployerProfile.jsx'
import CreateJobPost from '../components/employersection/CreateJobPost.jsx'
import Navbar from '../components/Navbar.jsx'
import Postedjobs from '../components/employersection/Postedjobs.jsx'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Home from "./Home.jsx";
const EmployerSection = () => {
  const [page,setpage]=useState(1);
  const token = useSelector((state)=>state.auth.token);
  return (
<div className="min-h-screen bg-gradient-to-r  from-blue-900 via-purple-900 to-purple-800 text-white">
    {
      token? <div className='flex flex-col'>
      
      <Navbar/>
      <div className='flex'>
        <Employersidebar page={page} setpage={setpage}/> 
        {
          page === 1?<EmployerProfile/>:
         ( (page === 3)?<CreateJobPost/>:
          <Postedjobs/>)
        }

       </div>
   
    </div>
    :<Home/>
    }
  </div>
  )
}

export default EmployerSection
