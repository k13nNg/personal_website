import "../styles/projectsPage.css";
import { useState, useEffect } from "react";


const ProjectsPage = (props) => {

    const[projectList,setProjectList] = useState([]);

    function filterField(e) {
        e.preventDefault();

        window.alert(e.target.id);
    }

    function projectNav(e) {
        e.preventDefault();

        let parentNodeCheck_1 = e.target.parentNode.id
        let parentNodeCheck_2 = e.target.parentNode.parentNode.id

        if (parentNodeCheck_1 != "") {
            window.open(parentNodeCheck_1, "_blank")
        } else  {
            window.open(parentNodeCheck_2, "_blank")
        }

    }

    useEffect(() => {
        async function retrieveProjectList() {
            let response = await fetch("http://localhost:8080/admin/getProjects");
    
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const projectList = await response.json();
            setProjectList(projectList);
        }
        retrieveProjectList();
        return;
    }, [projectList.length]);

    

    return (
        <section className="projectsPage" id="projectsPage">
            <div className="projectsPageTitle">
                <h1 className = "codingSectionTitle">print(<span className="textCyan">"Projects:"</span>)</h1>
                <br />
                <div className="sectionDivider"></div>
            </div>
            <div className="projectsPageContainer">
                <div className="filter">
                    <div className="filterDesktop">
                        <div className="filterBox filterBoxActive" id = "Full Stack Development" onClick={filterField}>
                            Full Stack Development
                        </div>
                        <div className="filterBox" id = "Data Analysis" onClick={filterField}>
                            Data Analysis
                        </div>
                        <div className="filterBox" id = "Embedded Development" onClick={filterField}>
                            Embedded Development
                        </div>
                        <div className="filterBox" id = "Game Development" onClick={filterField}>
                            Game Development
                        </div>
                        
                    </div>

                    <div className="filterMobile">
                        <select name="fields" className = "fieldsDropdown"id="">
                            <option value="fullStack">Full Stack Development</option>
                            <option value="data">Data Analysis</option>
                            <option value="embedded">Embedded Development</option>
                            <option value="game">Game Development</option>
                        </select>
                    </div>
                    <p style={{textAlign: "center", paddingTop: "50px", color: "#66FCF1"}}><i>Click on the project card to see more details!</i></p>
                </div>

                <div className="projects">
                    {   
                        ((projectList.length > 0) ? (projectList.map((project) => {
                            let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                            let pStartDate = new Date(project.startDate);
                            let formattedStartDate = `${months[pStartDate.getMonth()]}, ${pStartDate.getFullYear()}`;
                            let pEndDate = new Date(project.endDate);
                            let formattedEndDate = `${months[pEndDate.getMonth()]}, ${pEndDate.getFullYear()}`;
                            return (
                                <div className="projectCard" id="https://www.google.com" onClick={projectNav}>
                                    <h1 className="projectTitle">{project.name}</h1>
                                    <div className="projectTitleDivider"></div>
                                    <div className="thumbnail_and_details">
                                        <div className="thumbnailContainer">
                                            This is the thumbnail container
                                        </div>
                                        <div className="detailsContainer">
                                            <div>{formattedStartDate} - {formattedEndDate}</div>
                                            <p className="projectDescription">{project.description}</p>
                                            <div className="skillsContainer">
                                               { project.skills.map((sk) => {
                                                    return (
                                                        <div className="skill">{sk}</div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })): (
                            <div>
                                <h1>More projects coming soon!</h1>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </section>
    )
}

export default ProjectsPage;