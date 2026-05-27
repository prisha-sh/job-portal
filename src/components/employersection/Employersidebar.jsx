import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router'
const Employersidebar = (props) => {
  const setpage=props.setpage;
  const page = props.page;
  const isregistered = useSelector((state)=>state.auth.isRegistered);
  return (
     <div>
       <aside className="w-64 bg-gray-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0" data-theme="light">
 

      <nav className="flex-1 p-4 space-y-1">
       {
        isregistered &&  <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case  `}
        >
          <span>Home</span>
        </Link>
       }

        <button
     onClick={()=>{setpage(1)}}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-xl
            ${page === 1? "bg-gray-600 text-white":""}
         `}
        >
          <span>My Profile</span>
        </button>

        {
          isregistered && <div>
            <button
          className={`btn btn-ghost justify-start w-full gap-3 px-3 rounded-xl normal-case 
             ${page === 2? "bg-gray-600 text-white":""}
           `}
    onClick={()=>{setpage(2)}}
        >
          <span>Posted jobs</span>
        </button>

         <button
          onClick={()=>{setpage(3)}}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 rounded-xl normal-case 
           ${page === 3? "bg-gray-600 text-white":""}
            `}

        >
          <span>Create job post</span>
        </button>
          </div>
        }
      </nav>

     
      
    </aside>
    </div>
  )
}

export default Employersidebar
