import { useDispatch, useSelector } from "react-redux"
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import moment from "moment"
import copy from "copy-to-clipboard"

import RenderBodyContent from "./RenderBodyContent"
import Tags from "../../tags/Tags"
import Avatar from "../../avatar/Avatar"
import { toggleSpinnerAnim, scrollToElement } from "../../../utils"
import { deleteQuestion } from "../../../actions/questions"
import { deleteAnswer } from "../../../actions/answer"
import "./postcontent.css"


const PostContent = ({ post, type, qAuthorUid }) => {
    const isQuestion = type === "question"
    const copyPostUrl = () => {
        copy(isQuestion ? window.location.href : `${window.location.href}/answer-${post._id}`)
        alert(`Copied ${type} url to clipboard`)
    }
    const { pUid } = useParams()
    const USER = useSelector(state => state.currentUserReducer)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deletePost = () => {
        if (USER === null) {
            navigate(`/auth?next=${window.encodeURIComponent(location.pathname)}`)
        }
        else if (USER?.result?._id !== post.by.uUid) {
            alert("Only authors can delete their post.")
        }
        else if (window.confirm("Are you sure?, deleted post can't be restored.")) {
            toggleSpinnerAnim()
            const action = isQuestion ? deleteQuestion(post._id, USER?.result?._id) : deleteAnswer(pUid, post._id, USER?.result?._id)
            dispatch(action)
                .then(() => {
                    isQuestion ? navigate("/questions") : scrollToElement(document.querySelector("#post-answers"), 25)
                })
                .catch((error) => {
                    alert(error?.response?.data?.message || "Server Error")
                })
                .finally(() => {
                    toggleSpinnerAnim()
                })
        }
    }
    return (
        <div className="post-layout post-content-cell">
            <div className="post-body">
                <RenderBodyContent contents={post?.body} />
            </div>
            {
                isQuestion &&
                <div className="post-tags tags-wrapper">
                    <Tags tagList={post?.tags} />
                </div>
            }
            <div className="post-metadata">
                <div className="post-options">
                    <span className="option share-post" onClick={copyPostUrl} title={`share ${type} as link`}>Share</span>
                    {
                        USER?.result?._id === post.by.uUid
                        && <span className="option delete-post" onClick={deletePost} title={`delete ${type}`}>Delete</span>
                    }
                </div>
                <div className={!isQuestion && post?.by.uUid !== qAuthorUid ? "post-author" : "post-author user-author"}>
                    <time className="post-time">{isQuestion ? "asked" : "answered"} {moment(Number(post?.on)).fromNow()}</time>
                    <Link to={`/users/${post?.by.uUid}`} className="link author-info">
                        <Avatar gradientBg={post?.by.avatar} fontSize="1em" fontWeight="600" padV="1rem" padH="1rem" borderRadius="0.2em" cursor="pointer">{post?.by.name}</Avatar>
                        <span className="link">{post?.by.name}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostContent