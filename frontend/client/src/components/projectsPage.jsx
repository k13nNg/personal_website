import { TbFilterFilled } from "react-icons/tb";
import "../styles/projectsPage.css";
import { useState, useEffect } from "react";
import gitHubIcon from "../assets/gitHubIcon.png";


const ProjectsPage = (props) => {
    
    const [projectList, setProjectList] = useState([]); 
    const [field, setField] = useState("Full-stack Development");
    
    
    
    
    function filterField(e) {
        e.preventDefault();
        
        let filterBoxes = document.getElementsByClassName("filterBox");
        
        for(let i = 0; i < filterBoxes.length; i++) {
            filterBoxes[i].classList.remove("filterBoxActive");
        }
        
        e.target.classList.add("filterBoxActive");
        getProjectsByField(e.target.id);
    }
    
    function filterFieldMobile(e) {
        e.preventDefault();
        
        getProjectsByField(e.target.value);
    }
    
    async function getProjectsByField(f) {
        let response = await fetch(`http://localhost:8080/admin/getProjectsByField/${f}`);
        
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.error(message);
            return;
        }
        
        const projectList = await response.json();
        
        setField(f);
        
        setProjectList(projectList);
    }
    
    function ThumbnailDisplay(props) {
        return (
            <img className="thumbnailImage" src={`data:image;base64,${props.base64Str}`}/>
        );
    }    

    function deactivateProjectNavSlider() {
        let navigationSliders = document.getElementsByClassName("navigationSlider");

        Array.from(navigationSliders).forEach(e => {
            e.classList.remove("active");
        });

    }
    
    function handleProjectNav(e) {
        let projectID = parseInt(e.target.id.match(/\d+/)[0]);
        
        let project = document.getElementById(`project-${projectID}`);
        let projectNavSlider = document.getElementById(`slider-${projectID}`);
        
        deactivateProjectNavSlider();

        project.parentNode.scrollTop = project.offsetTop;
        projectNavSlider.classList.toggle("active");
        
        
    }
    
    useEffect(() => {
        getProjectsByField(field);
        document.getElementById("projectCardsWrapper").addEventListener("scroll", function () {
            let projectCards = document.getElementsByClassName("projectCard");
    
            Array.from(projectCards).forEach((pC) => {
                if (Math.abs(pC.parentNode.scrollTop - pC.offsetTop) <= 0.5) {
                    let projectID = parseInt(pC.id.match(/\d+/)[0]);

                    deactivateProjectNavSlider();

                    document.getElementById(`slider-${projectID}`).classList.toggle("active");
                }
            })

        })


    }, [projectList.length]);
    
    return (
        <section className="projectsPage" id="projectsPage">
            <div className="projectsPageTitle">
                <h1>print(<span className="textCyan">"Projects:"</span>)</h1>
                <br />
                <div className="sectionDivider"></div>
            </div>

            <div className="projectsPageContainer">
                <div className="filter">
                    <div className="filterDesktop">
                        <div className="filterBox filterBoxActive" id = "Full-stack Development" onClick={filterField}>
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
                        <select name="fields" className = "fieldsDropdown" id="" onChange={filterFieldMobile}>
                            <option value="Full-stack Development">Full Stack Development</option>
                            <option value="Data Analysis">Data Analysis</option>
                            <option value="Embedded Development">Embedded Development</option>
                            <option value="Game Development">Game Development</option>
                        </select>
                    </div>
                    {/* <h2 className="projectsNumber">Number of Projects: {projectList.length}</h2> */}
                </div>

                
                <div className="projects" >
                    <div className="projectCardsWrapper" id="projectCardsWrapper">
                    
                        {   
                            ((projectList.length > 0) ? (projectList.map((project, key) => {
                                let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                                let pStartDate = new Date(project.startDate);
                                let formattedStartDate = `${months[pStartDate.getMonth()]}, ${pStartDate.getFullYear()}`;
                                let pEndDate = new Date(project.endDate);
                                let formattedEndDate = `${months[pEndDate.getMonth()]}, ${pEndDate.getFullYear()}`;
                                return (
                                    <div className="projectCard" id={`project-${key}`} key={key}>
                                        <div>
                                            <h1 className="projectTitle">{project.name}</h1>
                                        </div>

                                        <div className="thumbnail_and_details">
                                            <div className="thumbnailContainer">
                                                <ThumbnailDisplay base64Str = {project.thumbnail_base64}/>
                                            </div>

                                            <div className="detailsContainer">
                                                <div className="dateAndGit">
                                                    <div className="projectStart_EndDate"><h3>{formattedStartDate} - {formattedEndDate}</h3></div>
                                                    <a className="githubLink" href={project.githubURL} target="_blank" rel="noopener noreferrer"><img className="socialMediaThumbnail" src={gitHubIcon} /></a>
                                                </div>
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
                                    <div className="moreProjectsText">
                                        <h1>More projects coming soon!</h1>
                                    </div>
                            ))
                        }
                    </div>
                    
                    <div id="expNavigation">
                        
                        {
                            projectList.map((p, key) => {
                                if(key == 0) {
                                    return (
                                        <a className="navigationSlider active" id={`slider-${key}`} onClick={handleProjectNav}></a>

                                    )
                                } else {
                                    return (
                                        <a className="navigationSlider" id={`slider-${key}`} onClick={handleProjectNav}></a>
                                    )
                                }
                            })

                        }

                    </div>
                </div>

                
                
            </div>
        </section>

    )
}

export default ProjectsPage;