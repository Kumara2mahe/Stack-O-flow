import { useSelector, useDispatch } from "react-redux"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"

import Tags from "../../../../components/tags/Tags"
import ShowRequestError from "../../../../components/showRequestError/ShowRequestError"
import { toggleSpinnerAnim } from "../../../../utils"
import { createBillingPortalSession } from "../../../../actions/pricing"
import { handleCatchedError } from "../../../pricing/utils"
import { getUser } from "../../../../actions/user"
import "./profilebody.css"

const ProfileBody = ({ user }) => {
    const AUTH_USER = useSelector(state => state.currentUserReducer)
    const [searchParams] = useSearchParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation().pathname
    const LOGINPAGE = `/auth?next=${window.encodeURIComponent(location)}`
    const manageSubscription = () => {
        if (!(AUTH_USER?.result)) {
            navigate(LOGINPAGE)
        }
        else {
            toggleSpinnerAnim()
            dispatch(createBillingPortalSession(AUTH_USER?.result?._id, `${location}?refresh_plan=true`))
                .then(data => window.location.href = data.url)
                .catch(error => handleCatchedError(error, navigate, LOGINPAGE))
                .finally(() => toggleSpinnerAnim())
        }
    }
    useEffect(() => {
        const aboutContent = document.querySelector("#user-about .content")
        const aboutHeight = window.parseFloat(window.getComputedStyle(aboutContent).height)
        if (aboutHeight > 320) {
            aboutContent.classList.add("truncate-overflow")
        }
        if (AUTH_USER?.result?._id && searchParams.get("refresh_plan")) {
            toggleSpinnerAnim()
            dispatch(getUser(AUTH_USER))
                .catch(error => console.log(error.message))
                .finally(() => toggleSpinnerAnim("OFF"))
        }
        // eslint-disable-next-line
    }, [user.about])
    return (
        <div className="profile-body">
            <div className="tags-about-section">
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
            {AUTH_USER?.result?._id === user._id &&
                <div id="membership-manage" className="child-container">
                    <p className="title">Membership</p>
                    <div className={`plan-container ${AUTH_USER?.result.stripe?.plan}`}>
                        <p className="context"><span className="plan-name">{AUTH_USER?.result.stripe?.plan}</span>&ensp;Plan</p>
                        <div className="btn-wrapper">
                            {AUTH_USER?.result.stripe?.plan !== "free"
                                ? <button className="so-btn primary-btn transparent-with-border" onClick={manageSubscription} type="button">Manage</button>
                                : <button className="so-btn green-trans-border-btn" onClick={() => navigate("/pricing")} type="button">Upgrade</button>}
                        </div>
                    </div>
                    <ShowRequestError />
                </div>
            }
        </div >
    )
}

const removeTruncatedAbout = () => {
    document.querySelector("#user-about .content")?.classList.remove("truncate-overflow")
}

export default ProfileBody