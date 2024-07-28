import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/addExperience.css";

const AddExperience = (props) => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    function handleJobTitleChange(e) {
        setJobTitle(e.target.value);
    }

    function handleCompanyChange(e) {
        setCompany(e.target.value);
    }

    const handleStartDateChange = (e) => {
        let temp_date = new Date(e.target.value);

        setStartDate(temp_date.getTime());
    }
    
    const handleEndDateChange = (e) => {
        let temp_date = new Date(e.target.value);

        setEndDate(temp_date.getTime());
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        if (endDate < startDate) {
            window.alert("End Date is set before Start Date!");
        } else {
            try {
                let form = {
                    "jobTitle": jobTitle,
                    "jobDesc": jobDesc,
                    "company": company,
                    "startDate": startDate,
                    "endDate": endDate
                }
                
                let response = await fetch("http://localhost:8080/admin/addExp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                })
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
            } catch (error) {
                console.error("A problem occurred with your fetch operation: ", error);
            } finally {
                window.alert("Experience Added Successfully!");
                navigate("/adminDashboard");
            }
        } 
    }

    return (
        <div className="addExperienceSection">
            <div className="addExperienceContainer">
                <div className="formHeader">
                    <h1 className="textCyan">Add your experience here!</h1>
                    <div className="sectionDivider"></div>
                </div>
                <div className="formBody">
                    <div className="expLeftColumn">
                        <input className="inputBox" placeholder="Position Title" type="text" id="jobTitle" value={jobTitle} onChange={handleJobTitleChange}/>
                        <div className="editorContainer" id="editorContainer">
                            <div className="rteContainer">
                                <ReactQuill theme="snow" value={jobDesc} onChange={setJobDesc}/>
                            </div>

                        </div>
                    </div>

                    <div className="expRightColumn">
                        <input className="inputBox" placeholder="Company" onChange={handleCompanyChange} type="text" id="Company" />
                        <div className="dateBox">
                            <input type="text" id="dateBox" placeholder="Start Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleStartDateChange}/>
                        </div>
                        <div className="dateBox">
                            <input type="text" id="dateBox" placeholder="End Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleEndDateChange}/>
                        </div>
                        
                        <button className="formSubmitButton" onClick={handleFormSubmit}>Submit</button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddExperience;