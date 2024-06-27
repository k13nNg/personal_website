import { useState } from "react";
import "../styles/addProject.css";

const AddProject = (props) => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [skills, setSkills] = useState([]);
6
    return (
        <section className="addProjectSection">
            <h1 className="textCyan">Add your project here</h1>
            <div className="sectionDivider"></div>
            <div className="addProjectForm">
                <div className="form_desktop">
                    <div className="leftColumn">
                        <input type="text" className="inputBox" placeholder="Project Name" />
                        <textarea className="textInput" placeholder="Description"></textarea>
                    </div>
                    <div className="rightColumn">
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
                </div>

                <div className="form_mobile">
                    
                        <div className="projectName">
                            <input type="text" className="inputBox" placeholder="Project Name" />
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
                <button className="formSubmitButton">Submit</button>
                
            </div>
        </section>
    )
}

export default AddProject;