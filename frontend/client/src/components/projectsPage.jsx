import "../styles/projectsPage.css";



const ProjectsPage = (props) => {

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
                    <div className="projectCard" id="https://www.google.com" onClick={projectNav}>
                        <h1 className="projectTitle">Test title</h1>
                        <div className="projectTitleDivider"></div>
                        <div className="thumbnail_and_details">
                            <div className="thumbnailContainer">
                                This is the thumbnail container
                            </div>
                            <div className="detailsContainer">
                                <div>Start Date - End Date</div>
                                <p className="projectDescription">Description</p>
                                <div className="skillsContainer">
                                    <div className="skill">Skill 1</div>
                                    <div className="skill">Skill 2</div>
                                    <div className="skill">Skill 3</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="projectCard" id="https://www.google.com" onClick={projectNav}>
                        <h1 className="projectTitle">Test title</h1>
                        <div className="projectTitleDivider"></div>
                        <div className="thumbnail_and_details">
                            <div className="thumbnailContainer">
                                This is the thumbnail container
                            </div>
                            <div className="detailsContainer">
                                <div>Start Date - End Date</div>
                                <p className="projectDescription">Description</p>
                                <div className="skillsContainer">
                                    <div className="skill">Skill 1</div>
                                    <div className="skill">Skill 2</div>
                                    <div className="skill">Skill 3</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="projectCard" id="https://www.google.com" onClick={projectNav}>
                        <h1 className="projectTitle">Test title</h1>
                        <div className="projectTitleDivider"></div>
                        <div className="thumbnail_and_details">
                            <div className="thumbnailContainer">
                                This is the thumbnail container
                            </div>
                            <div className="detailsContainer">
                                <div>Start Date - End Date</div>
                                <p className="projectDescription">Description</p>
                                <div className="skillsContainer">
                                    <div className="skill">Skill 1</div>
                                    <div className="skill">Skill 2</div>
                                    <div className="skill">Skill 3</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="projectCard" id="https://www.google.com" onClick={projectNav}>
                        <h1 className="projectTitle">Test title</h1>
                        <div className="projectTitleDivider"></div>
                        <div className="thumbnail_and_details">
                            <div className="thumbnailContainer">
                                This is the thumbnail container
                            </div>
                            <div className="detailsContainer">
                                <div>Start Date - End Date</div>
                                <p className="projectDescription">Description</p>
                                <div className="skillsContainer">
                                    <div className="skill">Skill 1</div>
                                    <div className="skill">Skill 2</div>
                                    <div className="skill">Skill 3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default ProjectsPage;