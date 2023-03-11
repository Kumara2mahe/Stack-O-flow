import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { validateForm, generateErrorHint } from "../../../../utils/form"
import { toggleSpinnerAnim } from "../../../../utils"
import { updateProfile } from "../../../../actions/user"
import "./profileeditform.css"

const ProfileEditForm = ({ user, switchEditMode }) => {
    const [name, setName] = useState(user.name)
    const [about, setAbout] = useState(user.about)
    const [tags, setTags] = useState(user.tags)

    const USER = useSelector(state => state.currentUserReducer)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const validInputs = validateForm(
            e.target, {
            except: "watchedtags",
            info: "is missing.",
            minTitleLength: 4,
            showErrorFor: 4.5 // seconds
        })
        const uUid = USER?.result?._id
        if (validInputs && uUid === user._id) {
            toggleSpinnerAnim()
            dispatch(updateProfile(user._id, { name, about, tags, uUid }))
                .then(() => {
                    switchEditMode(false)
                })
                .catch((error) => {
                    const nameInput = e.target.querySelector("#displayName")
                    generateErrorHint(nameInput, error?.response?.data?.message, e.target.querySelector(".submit-btn"), 2.5)
                    nameInput.focus()
                })
                .finally(() => {
                    toggleSpinnerAnim()
                    e.target.reset()
                })
        }
    }
    return (
        <div className="profile-edit">
            <h1 className="title">Edit Your Profile</h1>
            <form id="profile-edit-form" onSubmit={handleSubmit}>
                <p className="sub-title">Public Information</p>
                <div className="info-1">
                    <label htmlFor="displayName">
                        <h4 className="box-name">Display name</h4>
                        <input type="text" name="displayName" id="displayName" value={name} onChange={e => setName(e.target.value)} maxLength="100" autoComplete="name" />
                    </label>
                    <label htmlFor="aboutMe">
                        <h4 className="box-name">About me</h4>
                        <textarea name="aboutMe" id="aboutMe" className="box" value={about} onChange={e => setAbout(e.target.value)} />
                    </label>
                    <label htmlFor="watchedtags">
                        <h3 className="box-name">Tags</h3>
                        <input type="text" name="watchedtags" id="watchedtags" className="box" value={tags.join(" ")} onInput={handleTagInputs} onChange={e => setTags(e.target.value.split(" "))} placeholder="e.g. (sql linux mongodb)" autoComplete="off" />
                        <div className="tags-wrapper"></div>
                    </label>
                </div>
                <div className="btn-container">
                    <button className="so-btn primary-btn submit-btn" id="save-profile-btn" type="submit">Save profile</button>
                    <button className="so-btn" id="cancel-btn" onClick={() => { switchEditMode(false) }} type="button">Cancel</button>
                </div>
            </form>

        </div>
    )
}

const handleTagInputs = (e) => {
    const tagsContainer = e.target.parentElement.querySelector(".tags-wrapper")
    const tags = e.target.value.trimStart().split(" ")
    let newTags = ""
    tags.forEach(tag => {
        if (tag !== "") {
            newTags += `<p class="tag no-hover">${tag}</p>`
        }
    })
    tagsContainer.innerHTML = newTags
}

export default ProfileEditForm