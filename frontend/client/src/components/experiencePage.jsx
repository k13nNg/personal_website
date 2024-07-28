import "../styles/experiencePage.css";
import { useState, useEffect } from "react";


const ExperiencePage = (props) => {
    const [expList, setExpList] = useState([]);

    useEffect(() => {
        getExperience();
        return;
    })

    function handleYearClick(e) {
        e.preventDefault();

        let yearWidgets = document.getElementsByClassName("yearWidget");

        for (let yW of yearWidgets) {
            yW.classList.remove("yearWidgetActive");
        }

        e.target.classList.add("yearWidgetActive");
    }

    async function getExperience() {
        let response = await fetch(`http://localhost:8080/admin/getExp`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
        }
        let tempJSONList = await response.json()

        setExpList(tempJSONList);
    }

    return (
        <section className="experiencePage" id="experiencePage">
            <div className="experiencePageTitle">
                <h1 className="sectionTitle">f<span className="textCyan">"Experience:"</span></h1>
                <br />
                <div className="sectionDivider"></div>
            </div>
            <div className="experiencePageContentContainer">
                <div className="experienceSection">
                    {
                        expList.map((exp) => {
                            let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                            let jobTitle = exp.jobTitle;
                            let jobDescription = exp.jobDesc;    
                            let jStartDate = new Date(exp.startDate);
                            let formattedStartDate = `${months[jStartDate.getMonth()-1]}, ${jStartDate.getFullYear()}`;
                            let jEndDate = new Date(exp.endDate);
                            let formattedEndDate = `${months[jEndDate.getMonth()-1]}, ${jEndDate.getFullYear()}`;
                            let companyName= exp.company;

                            return (
                                <div className="experienceCard">
                                    <div className="experienceDate">
                                        <h2>{formattedStartDate} - {formattedEndDate}</h2>
                                    </div>
                                    <div className="experienceCardTitle">
                                        <h1 className="jobTitle"><span className="textCyan">{jobTitle}</span> @ <span>{companyName}</span></h1>
                                        <div className="experienceTitleDivider"></div>
                                        <div className="experienceTextSection">
                                            
                                            <div className="jobDescription" dangerouslySetInnerHTML={{__html: jobDescription}}></div>

                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                
                {/* <div className="timeline">
                    <div className="verticalLine"></div>
                    <div className="yearWidget" id="yearWidget"onClick={handleYearClick}>2024</div>
                    <div className="verticalLine"></div>
                    <div className="yearWidget" onClick={handleYearClick}>2023</div>
                    <div className="verticalLine"></div>

                </div> */}

            </div>
        </section>
    )
}

export default ExperiencePage;