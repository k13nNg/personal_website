import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import AboutPage from './components/aboutPage';
import ProjectsPage from './components/projectsPage';
import ExperiencePage from './components/experiencePage';
import AdminLogin from './components/adminLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import bcrypt from "bcryptjs";


function App() {
  return(
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<Main/>} path="/"/>
    //     <Route element={<AdminLogin/>} path="/admin"/>
    //   </Routes>
    // </BrowserRouter>
    <div className='container'>
      <Navbar/>
      <LandingPage/>
      <AboutPage/>
      <ProjectsPage/>
      <ExperiencePage/>
    </div>
  )
}

export default App;
