import SideNavbar from "../../components/sidenavbar/SideNavbar"
import Mainbar from "../../components/mainbar/Mainbar"
import Widgets from "../../components/widgets/Widgets"

const Home = () => {
    document.title = "Stack O-flow"
    return (
        <article id="main-contents" className="wrapper">
            <SideNavbar />
            <section className="main-container" id="home-contents">
                <Mainbar />
                <Widgets />
            </section>
        </article>
    )
}

export default Home