import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/addExperience.css";


const AddExperience = (props) => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [startDate_firstDateOfMonth, setStartDate_firstDateOfMonth] = useState(0);
    const [startDate_lastDateOfMonth, setStartDate_lastDateOfMonth] = useState(0);
    const [endDate_firstDateOfMonth, setEndDate_firstDateOfMonth] = useState(0);
    const [endDate_lastDateOfMonth, setEndDate_lastDateOfMonth] = useState(0);
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

    function handleStartDateChange (e) {
        let temp_date = new Date(e.target.value);

        setStartDate_firstDateOfMonth((new Date(temp_date.getFullYear(), temp_date.getMonth(), 1)).getTime());
        setStartDate_lastDateOfMonth((new Date(temp_date.getFullYear(), temp_date.getMonth() + 1, 0)).getTime());
        setStartDate(temp_date.getTime());

    }

    function handleEndDateChange(e) {
        let temp_date = new Date(e.target.value);
        console.log(temp_date);
        let endDate_DateObj = new Date(temp_date);

        setEndDate_firstDateOfMonth((new Date(endDate_DateObj.getFullYear(), endDate_DateObj.getMonth(), 1)).getTime());
        setEndDate_lastDateOfMonth((new Date(endDate_DateObj.getFullYear(), endDate_DateObj.getMonth()+1, 0)).getTime());
        setEndDate(temp_date.getTime());

    }


    async function checkExpExistence() {


        let params = {
            "companyName": company,
            "startDate_firstDateOfMonth": startDate_firstDateOfMonth,
            "startDate_lastDateOfMonth": startDate_lastDateOfMonth,
            "endDate_firstDateOfMonth": endDate_firstDateOfMonth,
            "endDate_lastDateOfMonth": endDate_lastDateOfMonth
        }


        let response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.SERVERT_PORT}/admin/getExpByNameAndTime/${params.companyName}/${params.startDate_firstDateOfMonth}/${params.startDate_lastDateOfMonth}/${params.endDate_firstDateOfMonth}/${params.endDate_lastDateOfMonth}`);

        let expList = await response.json();


        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;

            return;
        } else {
            console.log(expList);
            if (expList.length === 0) {
                // if expList is empty, then we return false (as the experience does not exist in the database)
                return false;
            } else {
                console.log("Experience exists!!1")
                // else, the experience does exist in the database => return true
                return true;
            }
        }

    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        if (endDate < startDate) {
            window.alert("End Date is set before Start Date!");
        } else {
            try {
                let expExists = await checkExpExistence();

                let form = {
                    "jobTitle": jobTitle,
                    "jobDesc": jobDesc,
                    "company": company,
                    "startDate": startDate,
                    "endDate": endDate
                }
                
                let response;

                if (expExists) {

                    response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.SERVER_PORT}/admin/addExp/${company}/${startDate_firstDateOfMonth}/${startDate_lastDateOfMonth}/${endDate_firstDateOfMonth}/${endDate_lastDateOfMonth}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(form),
                    })
                } else {
                    response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.SERVER_PORT}/admin/addExp`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(form),
                    })
                }
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 

            } catch (error) {
                console.error("A problem occurred with your fetch operation: ", error);
            } finally {
                window.alert("Experience Added Successfully!");
                // navigate("/adminDashboard");
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
                <br />
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
                        <input className="inputBox expInputBoxRight" placeholder="Company" onChange={handleCompanyChange} type="text" id="Company" />
                        <div className="dateBox">
                            <input type="text" id="dateBox" placeholder="Start Date" className="inputBox expInputBoxRight " onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleStartDateChange}/>
                        </div>
                        <div className="dateBox">
                            <input type="text" id="dateBox" placeholder="End Date" className="inputBox expInputBoxRight" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleEndDateChange}/>
                        </div>

                        <div className="submitButtonContainer">

                            <button className="formSubmitButton" onClick={handleFormSubmit}>Submit</button>
                        </div>
                        

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddExperience;