import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "../styles/addProject.css";

const AddProject = (props) => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [skills, setSkills] = useState([]);
    const [thumbnailBase64, setThumbnailBase64] = useState("");
    const [field, setField] = useState("Full-stack Development");
    const [githubURL, setGitHubURL] = useState("");

    const [inputText, setInputText] = useState("");


    const navigate = useNavigate();

    function handleKeyDown(e) {
        if(e.key !== "Enter") { 
            return 
        } else {
            const value = e.target.value;
            
            if (!value.trim()) {
                return
            } else {
                setSkills([...skills, value]);
                setInputText("");
            }
        }
    }

    function handleImageUpload() {
        let base64String = "";
        let file = document.querySelector(
            'input[type=file]')['files'][0];

        let reader = new FileReader();

        if (file.size > 16 * 1024 * 1024){
            toast.error("Please upload a file with size at most 16MB", {
                position: "top-left"
            });
            document.querySelector('input[type=file]').reset()
        }

        reader.onload = function () {
                base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "")


            setThumbnailBase64(base64String);
        }
        reader.readAsDataURL(file);
    }

    async function checkExistence() {
        let response = await fetch(`http://localhost:8080/admin/getProjectsByName/${projectName}`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            toast.errpr(message, {
                position: "top-left"
            });
            return;
        } else {
            let project = await response.json();
            
            if (Object.keys(project).length === 0 && project.constructor === Object) {
                // if project is empty, then we return false (as the project does not exist in the database)
                return false;
            } else {
                // else, the project does exist in the database => return true
                return true;
            }
        }
    }

    function removeSkill(index) {
        setSkills(skills.filter((el,i) => i != index))
    }

    function handleInputTextChange(e) {
        e.preventDefault();
        setInputText(e.target.value);
    }
    
    const handleProjectNameChange = (e) => {
        e.preventDefault();
        setProjectName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleStartDateChange = (e) => {
        let temp_date = new Date(e.target.value);

        setStartDate(temp_date.getTime());
    }

    const handleEndDateChange = (e) => {
        let temp_date = new Date(e.target.value);

        setEndDate(temp_date.getTime());
    }

    const handleGitHubURLChange = (e) => {
        e.preventDefault();

        setGitHubURL(e.target.value);
    }

    const handleFieldChange = (e) => {
        e.preventDefault();
        setField(e.target.value);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        if (endDate < startDate) {
            toast.error("End Date is set before Start Date!", {
                position: "top-left"
            });
        } 
        else if (skills.length == 0) {
            toast.error("Skills section cannot be empty", {
                position: "top-left"
            });
        }
        else {
            try {
                let projectAlreadyExists = await checkExistence();

                let form = {
                    "projectName": projectName,
                    "description": description,
                    "startDate": startDate,
                    "endDate": endDate,
                    "skills": skills,
                    "thumbnailBase64": thumbnailBase64,
                    "githubURL": githubURL,
                    "field": field
                }

                let response;

                if (projectAlreadyExists) {

                    response = await fetch(`http://localhost:8080/admin/addProject/${projectName}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(form),
                    })
                } else {
                    response = await fetch("http://localhost:8080/admin/addProject", {
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
                toast.success("Project Added Successfully!", {
                    position: "top-right"
                });
                setTimeout(() => {
                    navigate("/adminDashboard");
                }, 2000);
            }
        } 
    }

    return (
        <section className="addProjectSection">
            <h1 className="textCyan">Enter your project details here</h1>
            <div className="sectionDivider"></div>
            <br />
            <div className="addProjectForm">
                <div className="form_desktop">
                    <div className="leftColumn">
                        <input type="text" className="inputBox" placeholder="Project Name" onChange={handleProjectNameChange} />
                        <textarea className="textInput" placeholder="Description" onChange={handleDescriptionChange}></textarea>
                    </div>
                    <div className="rightColumn">
                        <div className="dateBox">
                            <input type="text" id="dateBox" placeholder="Start Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleStartDateChange}/>
                        </div>
                        <div className="dateBox">
                            <input type="text" id="dateBox" placeholder="End Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleEndDateChange}/>
                        </div>
                        <div className="githubURLBox">
                            <input type="text" id="githubURL" placeholder="Github URL" className="inputBox" onChange={handleGitHubURLChange}/>
                        </div>
                        <div className="skillBox">
                            <div className="skillTag">
                                {
                                    skills.map((skill,i) => (
                                        <div className="tagItem" key={i}>
                                            <span className="tagText">{skill}</span>
                                            <span className="closeIcon" onClick={() => removeSkill(i)}>&times;</span>
                                        </div>
                                    ))
                                }
                                <input onKeyDown={handleKeyDown} value={inputText} onChange={handleInputTextChange} type="text" className="skillsInput" placeholder="Type your skills, separated by 'Enter'" />
                            </div>
                        </div>
                        <div>
                            <select name="fields" className="fieldBox" onChange={handleFieldChange}>
                                <option value="Full-stack Development">Full-stack Development</option>
                                <option value="Data Analysis"> Data Analysis</option>
                                <option value="Game Development">Game Development</option>
                                <option value="Embedded Development">Embedded Development</option>
                            </select>
                        </div>
                        <div className="uploadFile">
                            <p>Thumbnail:</p>
                            <input type="file" className="fileUploader" onChange={handleImageUpload}/>
                        </div>
                    </div>
                </div>

                <div className="form_mobile">
                        <div className="projectName">
                            <input type="text" className="inputBox" placeholder="Project Name" onChange={handleProjectNameChange} />
                        </div>

                        <div className="description">
                            <textarea className="textInput" placeholder="Description" onChange={handleDescriptionChange}></textarea>
                        </div>

                        <div className="dateBox">
                            <input type="text" placeholder="Start Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleStartDateChange} />
                        </div>

                        <div className="dateBox">
                            <input type="text" placeholder="End Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleEndDateChange} />
                        </div>

                        <div className="githubURLBox">
                            <input type="text" id="githubURL" placeholder="Github URL" className="inputBox" onChange={handleGitHubURLChange}/>
                        </div>

                        <div className="skillBox">
                            <div className="skillTag">
                                {
                                    skills.map((skill,i) => (
                                        <div className="tagItem" key={i}>
                                            <span className="tagText">{skill}</span>
                                            <span className="closeIcon" onClick={() => removeSkill(i)}>&times;</span>
                                        </div>
                                    ))
                                }
                                <input onKeyDown={handleKeyDown} value={inputText} onChange={handleInputTextChange} type="text" className="skillsInput" placeholder="Type your skills, separated by 'Enter'" />
                            </div>
                        </div>


                        <div className="uploadFile">
                            <p>Thumbnail:</p>
                            <input type="file" className="fileUploader" />
                        </div>
                    
                </div>
                <button className="formSubmitButton" onClick={handleFormSubmit}>Submit</button>
                <ToastContainer/>
            </div>
        </section>
    )
}

export default AddProject;