import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/addExperience.css";

const AddExperience = (props) => {
    return (
        <div className="addExperienceSection">
            <div className="addExperienceContainer">
                <div className="formHeader">
                    <h1 className="textCyan">Add your experience here!</h1>
                    <div className="sectionDivider"></div>
                </div>

            </div>
        </div>
    )
}

export default AddExperience;