import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import decode from "jwt-decode"

import { setUser } from "../../actions/currentUser"
import Avatar from "../avatar/Avatar"
import { toggleSideNavbar, toggleSearchBar, smallScreenPx } from "./utils"
import siteLogo from "../../assets/logo.png"
import siteIcon from "../../assets/icon.png"
import search from "../../assets/search.svg"
import "./navbar.css"
import "./navbar-responsive.css"


const Navbar = () => {
    const USER = useSelector(state => state.currentUserReducer)

    const location = useLocation()
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= smallScreenPx)
    window.addEventListener("resize", () => setIsSmallScreen(window.innerWidth <= smallScreenPx))
    useEffect(() => {
        toggleSideNavbar(true)
        document.documentElement.scrollTop = 0
    }, [
        location.pathname,
        isSmallScreen
    ])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutUser = () => {
        dispatch({ type: "LOGOUT" })
        dispatch(setUser())
        navigate(location.pathname)
    }
    useEffect(() => {
        const token = USER?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logoutUser()
            }
        }
    })
    return (
        <header>
            <nav id="main-navbar">
                <div className="wrapper navbar-1">
                    <div className="nav-links">
                        {
                            SINGLEPAGES.indexOf(location.pathname) < 0 && <button className="nav-link nav-item menu-btn" onClick={() => { toggleSideNavbar() }} type="button" title="Quick Links"><span></span></button>
                        }
                        <Link to="/" className="nav-link nav-logo">
                            <img className="logo" src={siteLogo} alt="logo" />
                            <img className="icon" src={siteIcon} alt="logo" />
                        </Link>
                        <Link to="/" className="nav-link nav-item about-link">About</Link>
                        <Link to="/" className="nav-link nav-item">Products</Link>
                        <Link to="/" className="nav-link nav-item team-link">For Teams</Link>
                    </div>
                    <div className="nav-btns">
                        <div className="search-container">
                            <img className="icon" src={search} alt="search" onClick={toggleSearchBar} />
                            <form className="search-bar">
                                <input type="text" placeholder="Search..." />
                                <img className="search-icon" src={search} alt="search" />
                            </form>
                        </div>
                        {
                            USER ?
                                <div className="btn-container">
                                    <Link to={`/users/${USER.result._id}`}>
                                        <Avatar gradientBg={USER.result.avatar} fontSize="1em" fontWeight="600" padV="17px" padH="17px" borderRadius="50%" cursor="pointer">
                                            {USER.result.name}
                                        </Avatar>
                                    </Link>
                                    <button onClick={logoutUser} className="nav-item so-btn secondary-btn" id="logout-btn" type="button">Log out</button>
                                </div>
                                : <button onClick={() => navigate("/auth")} className="nav-item so-btn secondary-btn" id="login-btn" type="button">Log in</button>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}
const SINGLEPAGES = ["/auth", "/askquestion"]

export default Navbar