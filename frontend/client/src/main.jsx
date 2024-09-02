import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import AdminLogin from './components/adminLogin.jsx';
import AdminDashboard from "./components/adminDashboard.jsx";
import AddProject from './components/addProject.jsx';
import AddExperience from './components/addExperience.jsx';

const user = null;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/admin",
    element: <AdminLogin/>
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard/>
  },
  {
    path: "/adminDashboard/projects",
    element: <AddProject/>
  },
  {
    path: "/adminDashboard/experience",
    element: <AddExperience/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
