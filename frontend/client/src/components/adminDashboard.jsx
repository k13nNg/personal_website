import "../styles/adminDashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
import {getCookie, hasCookie, deleteCookie} from "cookies-next";
import AdminLogin from "./adminLogin";

const AdminDashboard = (props) => {
    const navigate = useNavigate();

    // const [cookies, setCookie, removeCookie] = useCookies();
    const cookie = getCookie("token");
    const [username, setUsername] = useState("");


    useEffect(() => {

        const verifyCookie = async () => {
            if (!hasCookie("token")) {
                navigate("/admin");
            }
        }        
        verifyCookie();


    })

    function handleProjectsClick(e) {
        e.preventDefault();

        navigate("/adminDashboard/projects");
    }

    function handleExperienceClick(e) {
        e.preventDefault();

        navigate("/adminDashboard/experience");
    }

    function Signout() {
        deleteCookie("token");
        navigate("/");
    }

    return (

        <section className="adminDashboard">
            <div className="adminDashboardHeader">
                <h1 className="textCyan pageTitle" style={{paddingBottom: "15px"}} >Admin Dashboard</h1>
                <div className="sectionDivider"></div>
            </div>

            <div className="adminDashboardBody">
                <p className="adminDashboardText"><i>Hello Kien,</i></p>
                <p className="adminDashboardText"><i>Please select an option from the list below:</i></p>
            </div>
            
            <div className="adminActions">
                <div className="actionOption" onClick={handleProjectsClick}>Add/ Edit Project</div>
                <div className="actionOption" onClick={handleExperienceClick}>Add/ Edit Experience</div>
            </div>

            <button className="actionButton" onClick={Signout}>Signout</button>
        
        </section>
    )
}

export default AdminDashboard;