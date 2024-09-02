import "../styles/experiencePage.css";
import { useState, useEffect } from "react";



const ExperiencePage = (props) => {
    const [expList, setExpList] = useState([]);

    
    function handleYearClick(e) {
        e.preventDefault();
        
        let yearWidgets = document.getElementsByClassName("yearWidget");
        
        for (let yW of yearWidgets) {
            yW.classList.remove("yearWidgetActive");
        }
        
        e.target.classList.add("yearWidgetActive");
    }
    
    async function getExperience() {
        let response = await fetch(`http://${process.env.REACT_APP_API_URL}/admin/getExp`);
        
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
        }
        let tempJSONList = await response.json()
        
        setExpList(tempJSONList);
    }
    
    function deactivateExpNavSliders() {
        let expNavigation = document.getElementsByClassName("expNavigationSliders");
        
        Array.from(expNavigation).forEach(e => {
            e.classList.remove("active");
        })
    }
    
    function handleExpNav(e) {
        let expID = parseInt(e.target.id.match(/\d+/)[0]);
        
        let expCard = document.getElementById(`exp-${expID}`);
        let expNavSlider = document.getElementById(`expSlider-${expID}`);
        
        deactivateExpNavSliders();        
        
        expCard.parentNode.scrollTop = expCard.offsetTop;
        expNavSlider.classList.toggle("active");
        
    }
    
    useEffect(() => {
        getExperience();

        document.getElementById("experienceWrapper").addEventListener("scroll", function () {
            let expCards = document.getElementsByClassName("experienceCard");
    
            Array.from(expCards).forEach((eC) => {

                if (Math.abs(eC.parentNode.scrollTop - eC.offsetTop) <= 0.5) {
                    let experienceID = parseInt(eC.id.match(/\d+/)[0]);

                    deactivateExpNavSliders();

                    document.getElementById(`expSlider-${experienceID}`).classList.toggle("active");
                }
            })

        });


    }, [expList.length]);

    return (
        <section className="experiencePage" id="experiencePage">

            <div className="experiencePageTitle">
                <h1>f<span className="textCyan">"Experience:"</span></h1>
                <br />
                <div className="sectionDivider"></div>
            </div>

            <div className="experiencePageContainer">
                <div className="experienceWrapper" id="experienceWrapper">
                    {
                        expList.map((exp, key) => {
                            let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                            let jobTitle = exp.jobTitle;
                            let jobDescription = exp.jobDesc;    
                            let jStartDate = new Date(exp.startDate);
                            let formattedStartDate = `${months[jStartDate.getMonth()-1]}, ${jStartDate.getFullYear()}`;
                            let jEndDate = new Date(exp.endDate);
                            let formattedEndDate = `${months[jEndDate.getMonth()-1]}, ${jEndDate.getFullYear()}`;
                            let companyName= exp.company;

                            return (
                                <div className="experienceCard" id={`exp-${key}`}key={key}>
                                    <div className="experienceCardTitle" key={key}>
                                        <div className="titleContainer" >
                                            <h1 className="jobTitle">
                                                <span className="textCyan">{jobTitle}</span>
                                                <br /> @ <br />
                                                <span>{companyName}</span>
                                            </h1>


                                            <h3>{formattedStartDate} - {formattedEndDate}</h3>
                                        </div>

                                        <div className="experienceTextSection" key={key}>
                                            
                                            <div className="jobDescription" dangerouslySetInnerHTML={{__html: jobDescription}}></div>

                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div id="expNavigation">
                    {
                        expList.map((exp, key) => {
                            if (key == 0) {
                                return (
                                    <a className="expNavigationSliders active" id={`expSlider-${key}`} onClick={handleExpNav}></a>
                                )
                            } else {
                                return (
                                    <a className="expNavigationSliders" id={`expSlider-${key}`} onClick={handleExpNav}></a>
                                )
                            }
                            
                        }) 
                    }
                </div>
            </div>
        </section>
    )
}

export default ExperiencePage;