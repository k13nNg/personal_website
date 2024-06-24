import "../styles/experiencePage.css";

const ExperiencePage = (props) => {
    return (
        <section className="experiencePage" id="experiencePage">
            <h1>f<span className="textCyan">"Experience:"</span></h1>
            <br />
            <div className="sectionDivider"></div>
            <div className="experiencePageContentContainer">
                <div className="timeline">
                    <div className="verticalLine"></div>
                    <div className="yearWidget yearWidgetActive">2024</div>
                    <div className="verticalLine"></div>
                    <div className="yearWidget">2023</div>
                    <div className="verticalLine"></div>

                </div>
                <div className="experienceSection">
                    <div className="experienceCard">
                        <div className="experienceDate">
                            <h2>Jun - Sept, 2023</h2>
                        </div>
                        <div className="experienceCardTitle">
                            <h1 className="jobTitle"><span className="textCyan">Job Title</span> @ <span>Company Name</span></h1>
                            <div className="experienceTitleDivider"></div>
                            <div className="experienceTextSection">
                                
                                <div className="jobDescription">
                                    <ul>
                                        <li>asldf;ajsd;lfkjasd;flkjsadf</li>
                                        <li>as;dflkjasd;lfkjasdfasdfsad</li>
                                        <li>as;dflkjasd;lfkjasdfasdfsad</li>
                                    </ul>    
                                </div>

                                <div className="thumbnail">
                                    Thumbnail
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="experienceCard">
                        <div className="experienceDate">
                            <h2>Jun - Sept, 2023</h2>
                        </div>
                        <div className="experienceCardTitle">
                            <h1 className="jobTitle"><span className="textCyan">Job Title</span> @ <span>Company Name</span></h1>
                            <div className="experienceTitleDivider"></div>
                            <div className="experienceTextSection">
                                
                                <div className="jobDescription">
                                    <ul>
                                        <li>asldf;ajsd;lfkjasd;flkjsadf</li>
                                        <li>as;dflkjasd;lfkjasdfasdfsad</li>
                                        <li>as;dflkjasd;lfkjasdfasdfsad</li>
                                    </ul>    
                                </div>

                                <div className="thumbnail">
                                    Thumbnail
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                

            </div>
        </section>
    )
}

export default ExperiencePage;