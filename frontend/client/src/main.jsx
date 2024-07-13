import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import Admin from "./components/admin.jsx";
import AdminDashboard from "./components/adminDashboard.jsx";
import AddProject from './components/addProject.jsx';
import AddExperience from './components/addExperience.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard/>
  },
  {
    path: "/adminDashboard/addProject",
    element: <AddProject/>
  },
  {
    path: "/adminDashboard/addExperience",
    element: <AddExperience/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
