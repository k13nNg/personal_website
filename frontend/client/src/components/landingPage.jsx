import "../styles/landingPage.css";



const LandingPage = (props) => {
    return (
        <section className="landingPage" id="landingPage">
            <div className = "landingPageContent">
                <div className="landingTextSection">
                    <h1 className = "greetingTitle">Hello.</h1>
                    <div className="divider"></div>
                    <h2 className="introText">I'm <span className="textCyan">Kien</span></h2>
                    <h1 className="jobTitle">Software Developer | Data Analyst</h1>
                </div>

                <div className="scrollToSeeMore">
                    <a className="scrollDownButton" href="#aboutPage">&darr;</a>
                </div>
            </div>
        </section>
    )
}

export default LandingPage;