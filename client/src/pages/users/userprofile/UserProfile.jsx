import { useParams, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"

import SideNavbar from "../../../components/sidenavbar/SideNavbar"
import LoadingAnim from "../../../components/LoadingAnim/LoadingAnim"
import ProfileHeader from "../components/profileheader/ProfileHeader"
import ProfileBody from "../components/profilebody/ProfileBody"
import ProfileEditForm from "../components/profileeditform/ProfileEditForm"

const UserProfile = () => {
    const { id } = useParams()
    const ALLUSERS = useSelector(state => state.usersReducer)
    const USER = ALLUSERS?.filter(user => user._id === id)

    const [editMode, setEditMode] = useState(false)
    return (
        USER?.length === 0
            ? <Navigate to="/users" />
            : <article id="main-contents" className="wrapper">
                <SideNavbar />
                {ALLUSERS
                    ? USER.map(user => (
                        <section className="main-container" id="user-profile" key={user._id} style={{ color: "var(--eerie-black)", flexDirection: "column" }}>
                            <ProfileHeader user={user} editMode={editMode} switchEditMode={setEditMode} />
                            {editMode ? <ProfileEditForm user={user} switchEditMode={setEditMode} /> : <ProfileBody user={user} />}
                        </section>
                    ))
                    : <section className="main-container"><LoadingAnim /></section>
                }
            </article>
    )
}

export default UserProfile