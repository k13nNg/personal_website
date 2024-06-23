import "../styles/navbar.css";

const menuBarClickHandle = (e) => {
    e.preventDefault();

    window.alert("Hello World!");
}

const Navbar = (props) => {
    return (
        <div className="navbar">
            <div className="navBarContent">
                <a href="#landingPage" className="logoLink"><h1 className="brandLogo">k<span className="textCyan">Ng.</span></h1></a>
                <div className="hamburger" onClick={menuBarClickHandle}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

            </div>
        </div>
    )
}

export default Navbar;