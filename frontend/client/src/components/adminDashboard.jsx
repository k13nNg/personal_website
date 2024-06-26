import "../styles/adminDashboard.css";

const AdminDashboard = (props) => {
    return (
        <section className="adminDashboard">
            <div className="adminDashboardHeader">
                <h1 className="textCyan" style={{paddingBottom: "15px"}} >Admin Dashboard</h1>
                <div className="sectionDivider"></div>
            </div>

            <div className="adminDashboardBody">
                <p className="adminDashboardText"><i>Hello Kien,</i></p>
                <p className="adminDashboardText"><i>Please select an option from the list below:</i></p>
            </div>
            
            <div className="adminActions">
                <div className="actionOption">Add Project</div>
                <div className="actionOption">Edit Project</div>
                <div className="actionOption">Add Experience</div>
                <div className="actionOption">Edit Experience</div>
            </div>
            
        </section>
    )
}

export default AdminDashboard;