import { useEffect } from "react"

import Tags from "../../../../components/tags/Tags"
import "./profilebody.css"

const ProfileBody = ({ user }) => {
    useEffect(() => {
        const aboutContent = document.querySelector("#user-about .content")
        const aboutHeight = window.parseFloat(window.getComputedStyle(aboutContent).height)
        if (aboutHeight > 320) {
            aboutContent.classList.add("truncate-overflow")
        }
    }, [user.about])
    return (
        <div className="profile-body">
            <div id="user-watched-tags" className="child-container">
                <p className="title">Tags Watched</p>
                <div className="tags-wrapper">
                    {user.tags.length > 0 ? <Tags tagList={user.tags} /> : "~ no tags ~"}
                </div>
            </div>
            <div id="user-about" className="child-container">
                <p className="title">About</p>
                <p className="content">{user.about !== "" ? user.about : "~ no bio ~"}</p>
                <div className="btn-container">
                    <button className="so-btn grey-btn read-more" onClick={removeTruncatedAbout} type="button">Read more</button>
                </div>
            </div>
        </div>
    )
}

const removeTruncatedAbout = () => {
    document.querySelector("#user-about .content")?.classList.remove("truncate-overflow")
}

export default ProfileBody