import "../styles/skillTag.css";
import { useState } from "react";

function SkillTag() {
    const [tags, setTags] = useState([]);
    const [inputText, setInputText] = useState("");

    function handleKeyDown(e) {
        if(e.key !== "Enter") { 
            return 
        } else {
            const value = e.target.value;
            
            if (!value.trim()) {
                return
            } else {
                setTags([...tags, value]);
                setInputText("");
            }
        }
    }

    function handleInputTextChange(e) {
        setInputText(e.target.value);
    }

    return (
        <div className="skillTag">

            {
                tags.map((tag,index) => (
                    <div className="tagItem">
                        <span className="tagText">{tag}</span>
                        <span className="closeIcon">&times;</span>
                    </div>
                ))
            }
            <input onKeyDown={handleKeyDown} value={inputText} onChange={handleInputTextChange} type="text" className="skillsInput" placeholder="Type your skills, separated by 'Enter'" />
        </div>
    )
}

export default {SkillTag, tags};