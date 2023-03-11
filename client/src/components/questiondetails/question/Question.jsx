import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import PostContent from "../postcontent/PostContent"
import { voteQuestion } from "../../../actions/questions"
import "./question.css"

const PostQuestion = ({ question }) => {
    const USER = useSelector(state => state.currentUserReducer)

    const currentUser_uVoted = question.votes.uvs.find(id => id === USER?.result._id)
    const currentUser_dVoted = question.votes.dvs.find(id => id === USER?.result._id)
    const VOTE = "user-vote"

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleVoteCast = (e) => {
        let voteBtn = e.target
        switch (voteBtn.tagName) {
            case "svg":
                voteBtn = voteBtn.parentElement
                break
            case "path":
                voteBtn = voteBtn.parentElement.parentElement
                break
            default:
                break
        }
        if (USER === null) {
            if (window.confirm("Authentication is required!! click 'ok' to Continue to Login page.")) {
                navigate(`/auth?next=${window.encodeURIComponent(location.pathname)}`)
            }
        }
        else {
            dispatch(voteQuestion(question._id, USER.result._id, voteBtn.id))
                .catch((error) => {
                    alert("Server has Experienced an Unexpected Error")
                })
        }
    }
    return (
        <div className="post-question">
            <div className="post-layout votes-cell">
                <button className={currentUser_uVoted ? `vote-btn ${VOTE}` : "vote-btn"} id="up-vote" onClick={handleVoteCast} title="Up vote question" type="button">
                    <svg aria-hidden="true" className="svg-icon" width="36" height="36" viewBox="0 0 36 36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
                </button>
                <div id="vote-count">{question.votes.count}</div>
                <button className={currentUser_dVoted ? `vote-btn ${VOTE}` : "vote-btn"} id="down-vote" onClick={handleVoteCast} title="Down vote question" type="button">
                    <svg aria-hidden="true" className="svg-icon" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
                </button>
            </div>
            <PostContent post={question} type="question"></PostContent>
        </div>
    )
}

export default PostQuestion