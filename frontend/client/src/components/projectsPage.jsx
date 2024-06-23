import "../styles/projectsPage.css";

const ProjectsPage = (props) => {
    return (
        <section className="projectsPage" id="projectsPage">
            <div className="projectsPageTitle">
                <h1 className = "codingSectionTitle">print(<span className="textCyan">"Projects:"</span>)</h1>
                <br />
                <div className="sectionDivider"></div>
            </div>
            <div className="projectsPageContainer">
                <div className="filter">
                    <div className="filterBox">
                        Full Stack Development
                    </div>
                    <div className="filterBox">
                        Data Analysis
                    </div>
                    <div className="filterBox">
                        Embedded Development
                    </div>
                    <div className="filterBox">
                        Game Development
                    </div>
                </div>

                <div className="projects">
                    <div className="projectCard">
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

                    <div className="projectCard">
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

                    <div className="projectCard">
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

                    <div className="projectCard">
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