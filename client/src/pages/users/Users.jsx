import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import SideNavbar from "../../components/sidenavbar/SideNavbar"
import Avatar from "../../components/avatar/Avatar"
import LoadingAnim from "../../components/LoadingAnim/LoadingAnim"
import memberSince from "./components/memberSince"
import "./users.css"

const Users = () => {
    const USERS = useSelector(state => state.usersReducer)
    document.title = "Users - Stack O-flow"
    return (
        <article id="main-contents" className="wrapper">
            <SideNavbar />
            <section className="main-container" id="user-contents">
                <h1 className="title">Users</h1>
                <div id="all-users-list">
                    {USERS
                        ? USERS.map(user => (
                            <div className="user-profile" key={user._id}>
                                <div className="author-info">
                                    <Link to={`/users/${user._id}`} className="user-avatar">
                                        <Avatar gradientBg={user.avatar} fontSize="1.5em" fontWeight="600" padV="1.45rem" padH="1.45rem" borderRadius="0.2em" cursor="pointer">{user.name}</Avatar>
                                    </Link>
                                    <Link to={`/users/${user._id}`} className="link">{user.name}</Link>
                                    <span className="since">{memberSince(user.since)}</span>
                                </div>
                            </div>
                        ))
                        : <LoadingAnim />
                    }
                </div>
            </section>
        </article>
    )
}

export default Users