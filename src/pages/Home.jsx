import React from 'react'
import Navbar from '../components/Navbar'
import Reviews from '../components/home/Reviews'
import JobProcessFlow from '../components/home/JobProcessFlow'
import SectionHeader from '../components/home/SectionHeader'
import EmployerProcessFlow from '../components/home/EmployerProcessFlow'
import CompanyLogos from '../components/home/CompanyLogos'
import HeroIntro from '../components/home/HeroIntro'
import BrowseJobsBanner from '../components/home/BrowseJobsBanner'

const Home = () => {
  return (
    <div theme={"cyberpunk"}>
    <Navbar/>
    <HeroIntro/>
    <SectionHeader/>
    <JobProcessFlow/>
         <Reviews/>
         <EmployerProcessFlow/>
         <BrowseJobsBanner/>
         <CompanyLogos/>
    </div>
  )
}

export default Home
