import { useLocation } from "react-router-dom"

import SideNavbar from "../../components/sidenavbar/SideNavbar"
import Mainbar from "../../components/mainbar/Mainbar"
import Widgets from "../../components/widgets/Widgets"
import ViewQuestion from "./viewquestion/ViewQuestion"

const Questions = () => {
    const location = useLocation()
    document.title = "Newest Questions - Stack O-flow"
    return (
        <article id="main-contents" className="wrapper">
            <SideNavbar />
            <section className="main-container" id="questions-contents">
                {location.pathname === "/questions" ? <Mainbar /> : <ViewQuestion />}
                <Widgets />
            </section>
        </article>
    )
}

export default Questions