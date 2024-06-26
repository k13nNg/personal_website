import "../styles/admin.css";

const Admin = (props) => {
    return (
        <section className="adminLogIn">
            <div className="logInForm">
                <h1 className="formHeading">Log In</h1>
                <div className="sectionDivider"></div>
                <p><i>Please log in to continue</i></p>
                <input className="inputBox" type="text" placeholder="Username"/>
                <input className="inputBox" type="password" placeholder="Password"/>
                <div className="forgotPass_and_logIn_button">
                    <a className="forgotPass"><i>Forgot Password?</i></a>
                    <button className="actionButton">Log In</button>
                </div>
            </div>
        </section>
        
    )
}

export default Admin;