import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import AboutPage from './components/aboutPage';
import ProjectsPage from './components/projectsPage';
import ExperiencePage from './components/experiencePage';

function App() {

  return (
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
