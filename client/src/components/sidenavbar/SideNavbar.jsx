import { NavLink } from "react-router-dom"

import globe from "../../assets/globe.svg"
import "./sidenavbar.css"

const SideNavbar = () => {
    return (
        <section id="side-navbar">
            <div className="links-container">
                <NavLink to="/" className="nav-link" activeclassname="active">Home</NavLink>
                <div className="category">
                    <p className="title">Public</p>
                    <div className="features">
                        <NavLink to="/questions" className="nav-link ques-link" activeclassname="active">
                            <img src={globe} alt="glob" />Questions</NavLink>
                        <NavLink to="/tags" className="nav-link" activeclassname="active">Tags</NavLink>
                        <NavLink to="/users" className="nav-link" activeclassname="active">Users</NavLink>
                    </div>
                </div>
                <div className="category">
                    <p className="title">Developers</p>
                    <div className="features">
                        <NavLink to="/pricing" className="nav-link" activeclassname="active">Pricing</NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SideNavbar