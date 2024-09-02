import "../styles/aboutPage.css";
import gitHubIcon from "../assets/gitHubIcon.png";
import linkedInIcon from "../assets/linkedInIcon.png";
import mailIcon from "../assets/mailIcon.png";

const AboutPage = (props) => {
    return (
        <section className="aboutPage" id="aboutPage">
            <div className="aboutPageContainer">
                <div className="textSection">
                    <h1 className = "aboutSectionTitle">Hello, World!</h1>
                    <br />
                    <hr className="sectionDivider"></hr>
                    <br />
                    <p>I'm Kien, a 3rd year Honours Mathematics student at the <a href="https://uwaterloo.ca/" target="_blank" rel="noopener noreferrer">University of Waterloo</a>, Canada.</p>
                    <br />
                    <p>I major in <a href="https://uwaterloo.ca/combinatorics-and-optimization/" target="_blank" rel="noopener noreferrer">Combinatorial Optimization</a> and <a href="https://uwaterloo.ca/future-students/programs/computational-mathematics" target="_blank" rel="noopener noreferrer">Computational Mathematics</a>, with a strong emphasis on <span className="textCyan">Graph Theory</span> and <span className="textCyan">Cryptography</span>.</p>
                    <br />
                    <p>When I am not at school getting smart or working on a side project, I usually go hiking or play badminton with friends.</p>
                    <br />
                    <p>Occasionally, I like having a "me" day and spend it reading a book or doing some research on a math problem I found intriguing :D</p>
                    <br />

                    <div className="socialHandles">
                        <a href="https://github.com/k13nNg" target="_blank" rel="noopener noreferrer"><img className="socialMediaThumbnail" src={gitHubIcon} /></a>
                        <a href="mailto:kien.nguyen@uwaterloo.ca" target="_blank" rel="noopener noreferrer" ><img className="socialMediaThumbnail" src={mailIcon}/></a>
                        <a href="https://www.linkedin.com/in/k2nnguyen/"  target="_blank" rel="noopener noreferrer"><img className="socialMediaThumbnail" src={linkedInIcon}/></a>
                    </div>
                </div>

                <div className="gifSection">
                    {/* <p>this is the gif section</p> */}
                    <img className="programmerGIF" src="https://camo.githubusercontent.com/803226302ac9ed44d0caeadcaee81c6797400dc7b6da544bb78c80c59ebdfca3/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f7167515567674143335066763638377150432f67697068792e676966"/>

                </div>

            </div>

        </section>
    )
}

export default AboutPage;