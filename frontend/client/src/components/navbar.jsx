import "../styles/navbar.css";

const menuBarClickHandle = (e) => {
    e.preventDefault();
    let offScreenMenu = document.querySelector(".off-screen-menu");
    let hamburgertMenu = document.querySelector(".hamburger");

    hamburgertMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
}

const Navbar = (props) => {
    return (
        <nav className="navbar">
            
            <div className="off-screen-menu">
                <ul className="navLinks">
                    <li><a className = "navLinkElem" href="#aboutPage">About</a></li>
                    <li><a className = "navLinkElem" href="#projectsPage">Projects</a></li>
                    <li><a className = "navLinkElem" href="#experiencePage">Experience</a></li>
                </ul>

            </div>

            <div className="navBarContent">
                <a href="#landingPage" className="logoLink"><h1 className="brandLogo">k<span className="textCyan">Ng.</span></h1></a>


                <div className="hamburger" onClick={menuBarClickHandle}>
                    {/* <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div> */}
                    <span></span>
                    <span></span>
                    <span></span>

                </div>        

            </div>
        </nav>
    )
}

export default Navbar;