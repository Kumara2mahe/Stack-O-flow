import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"

import Avatar from "../../../../components/avatar/Avatar"
import memberSince from "../memberSince"
import "./profileheader.css"

const ProfileHeader = ({ user, editMode, switchEditMode }) => {
    const { id } = useParams()
    const USER = useSelector(state => state.currentUserReducer)
    const isOwner = USER?.result?._id === id

    document.title = `User ${editMode ? `- ${user.name} - edit ` : user.name} - Stack O-flow`
    return (
        <div className="profile-header">
            <Link to={`/users/${user._id}`} id="user-avatar">
                <Avatar gradientBg={user.avatar} fontWeight="600" borderRadius="0.3125rem" cursor="pointer">{user.name}</Avatar>
            </Link>
            <div className="user-info">
                <p className="member-name">{user.name}</p>
                <p className="since">
                    <svg className="icon" width="18" height="18" viewBox="0 0 18 18"><path fill="currentColor" d="M9 4.5a1.5 1.5 0 0 0 1.28-2.27L9 0 7.72 2.23c-.14.22-.22.48-.22.77 0 .83.68 1.5 1.5 1.5Zm3.45 7.5-.8-.81-.81.8c-.98.98-2.69.98-3.67 0l-.8-.8-.82.8c-.49.49-1.14.76-1.83.76-.55 0-1.3-.17-1.72-.46V15c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-2.7c-.42.28-1.17.45-1.72.45-.69 0-1.34-.27-1.83-.76Zm1.3-5H10V5H8v2H4.25C3 7 2 8 2 9.25v.9c0 .81.91 1.47 1.72 1.47.39 0 .77-.14 1.03-.42l1.61-1.6 1.6 1.6a1.5 1.5 0 0 0 2.08 0l1.6-1.6 1.6 1.6c.28.28.64.43 1.03.43.81 0 1.73-.67 1.73-1.48v-.9C16 8.01 15 7 13.75 7Z"></path></svg>
                    <span className="text">{memberSince(user.since)}</span>
                </p>
            </div>
            {isOwner && !editMode &&
                <div className="edit-btn-container">
                    <button className="so-btn grey-btn edit-btn" onClick={() => { switchEditMode(true) }} type="button">
                        <svg className="icon" width="18" height="18" viewBox="0 0 18 18"><path fill="currentColor" d="m13.68 2.15 2.17 2.17c.2.2.2.51 0 .71L14.5 6.39l-2.88-2.88 1.35-1.36c.2-.2.51-.2.71 0ZM2 13.13l8.5-8.5 2.88 2.88-8.5 8.5H2v-2.88Z"></path></svg>
                        <span className="btn-text">Edit profile</span>
                    </button>
                </div>
            }
        </div>
    )
}

export default ProfileHeader