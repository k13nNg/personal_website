import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addProject.css";

const AddProject = (props) => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [skills, setSkills] = useState([]);
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

    function removeSkill(index) {
        setSkills(skills.filter((el,i) => i != index))
    }

    function handleInputTextChange(e) {
        setInputText(e.target.value);
    }
    
    const handleProjectNameChange =(e) => {
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

    const handleSkills = (e) => {
        if (e.target.value==",") {
            setTempSkill("");
            setSkills(skills => [...skills, tempSkill]);
        } else {
            setTempSkill(e.target.value);
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        if (endDate < startDate) {
            window.alert("End Date is set before Start Date!");
        } else {
            try {
                let form = {
                    "projectName": projectName,
                    "description": description,
                    "startDate": startDate,
                    "endDate": endDate,
                    "skills": skills,
                }
                
                let response = await fetch("http://localhost:8080/admin/addProject", {
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
                window.alert("Project Added Successfully!");
                navigate("/adminDashboard");
            }
        } 
    }

    return (
        <section className="addProjectSection">
            <h1 className="textCyan">Add your project here</h1>
            <div className="sectionDivider"></div>
            <div className="addProjectForm">
                <div className="form_desktop">
                    <div className="leftColumn">
                        <input type="text" className="inputBox" placeholder="Project Name" value={projectName} onChange={handleProjectNameChange} />
                        <textarea className="textInput" placeholder="Description" value={description} onChange={handleDescriptionChange}></textarea>
                    </div>
                    <div className="rightColumn">
                        <div className="dateBox">
                            <input type="text" id="dateBox" placeholder="Start Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleStartDateChange}/>
                        </div>
                        <div className="dateBox">
                            <input type="text" id="dateBox" placeholder="End Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} onChange={handleEndDateChange}/>
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
                </div>

                <div className="form_mobile">
                    
                        <div className="projectName">
                            <input type="text" className="inputBox" placeholder="Project Name"/>
                        </div>
                        <div className="description">
                            <textarea className="textInput" placeholder="Description"></textarea>
                        </div>
                        <div className="dateBox">
                            <input type="text" placeholder="Start Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} />
                        </div>
                        <div className="dateBox">
                            <input type="text" placeholder="End Date" className="inputBox" onFocus={(e) => (e.target.type="date")} onBlur={(e) => (e.target.type = "text")} />
                        </div>
                        <div className="skillBox">
                            <input type="text" className="inputBox" placeholder="Skills"/>
                        </div>
                        <div className="uploadFile">
                            <p>Thumbnail:</p>
                            <input type="file" className="fileUploader" />
                        </div>
                    
                </div>
                <button className="formSubmitButton" onClick={handleFormSubmit}>Submit</button>
                
            </div>
        </section>
    )
}

export default AddProject;