import "../styles/landingPage.css";
import gitHubIcon from "../assets/gitHubIcon.png";
import linkedInIcon from "../assets/linkedInIcon.png";
import mailIcon from "../assets/mailIcon.png";


const LandingPage = (props) => {
    return (
        <section className="landingPage">
            <div className = "landingPageContent">
                <div className="landingTextSection">
                    <h1 className = "greetingTitle">Hello.</h1>
                    <div className="divider"></div>
                    <h2>I'm <span className="textCyan">Kien</span></h2>
                    <h1 className="jobTitle">Software Developer | Data Analyst</h1>
                </div>


                <div className="socialHandles">
                    <img src={gitHubIcon} alt="" />
                    <img src={mailIcon} alt="" />
                    <img src={linkedInIcon} alt="" />
                </div>

                <div className="scrollToSeeMore">
                    <p><em>Here are a few things about me!</em></p>
                    <button className="scrollDownButton">&darr;</button>
                </div>
            </div>
        </section>
    )
}

export default LandingPage;