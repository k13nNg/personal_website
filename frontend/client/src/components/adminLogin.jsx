import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/admin.css";
import bcrypt from "bcryptjs";

const AdminLogin = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }
    
    function handlePasswordchange(e) {
        setPassword(e.target.value);
    }

    function handleSuccess(msg) {
        toast.success(msg, {
            position: "top-right"
        })
    }

    function handleError(err) {
        toast.error(err, {
            position: "top-left"
        })
    }

    async function validateLogin() {
        let form = {
            username: username,
            password: password
        }

        try {
            const response = await fetch(`http://localhost:8080/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",             
                body: JSON.stringify(form)   
            });

            let resJSON = await response.json();

            console.log(resJSON);

            const {success, message} = resJSON;

            if (success ) {
                // window.alert("SUCCESS!");
                handleSuccess(message)
                setTimeout(() => {
                    navigate("/adminDashboard");
                }, 1500);
                // navigate("/adminDashboard");
            } else {
                // window.alert("FAILED!!!");
                handleError(message);
            }
        
        } catch(err) {
            console.log(err);
        }
    }

    return (

        <section className="adminLogIn">
            <div className="logInForm">
                <h1 className="formHeading">Log In</h1>
                <div className="sectionDivider"></div>
                <p><i>Please log in to continue</i></p>
                <input className="inputBox" type="text" placeholder="Username" onChange={handleUsernameChange}/>
                <input className="inputBox" type="password" placeholder="Password" onChange={handlePasswordchange}/>
                <div className="forgotPass_and_logIn_button">
                    <button className="actionButton" onClick={validateLogin}>Log In</button>
                </div>

            </div>
            <ToastContainer/>
        </section>

        
    )
}

export default AdminLogin;