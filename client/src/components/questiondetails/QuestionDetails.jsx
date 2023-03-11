import { useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Question from "./question/Question"
import Answers from "./answers/Answers"
import Tags from "../tags/Tags"
import { validateBodyField, generateErrorHint } from "../../utils/form"
import { toggleSpinnerAnim, scrollToElement } from "../../utils"
import { postAnswer } from "../../actions/answer"
import "./questiondetails.css"


const QuestionDetails = ({ question }) => {
    const [body, setBody] = useState("")
    const USER = useSelector(state => state.currentUserReducer)

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const validTextArea = validateBodyField(
            e.target,
            e.target.querySelector("#post-ans-btn"),
            {
                includeTextArea: true,
                minBodyLength: 30,
                showErrorFor: 4.5 // seconds
            }
        )
        if (USER === null) {
            navigate(`/auth?next=${window.encodeURIComponent(location.pathname)}`)
        }
        else if (validTextArea) {
            toggleSpinnerAnim()
            const action = postAnswer({
                id: question._id,
                body, by: {
                    name: USER.result.name,
                    avatar: USER.result.avatar,
                    uUid: USER.result._id
                }
            })
            dispatch(action)
                .then(() => {
                    scrollToElement(e.target.previousElementSibling.querySelector(".answer:last-of-type"), 25)
                })
                .catch((error) => {
                    const bodyTextArea = e.target.querySelector("#postbody")
                    generateErrorHint(bodyTextArea, error?.response?.data?.message, e.target.querySelector(".submit-btn"), 2.5)
                    bodyTextArea.focus()
                })
                .finally(() => {
                    toggleSpinnerAnim()
                    e.target.reset()
                })
        }
    }
    return (
        <div id="question-details">
            <h1 className="post-title">{question.title}</h1>
            <Question question={question} />
            <Answers qAuthorUid={question.by.uUid} answers={question.answers} />
            <form id="answer-form" className="post-form" onSubmit={handleSubmit}>
                <div className="answer-form-header">Your Answer</div>
                <label htmlFor="postbody">
                    <h3 className="box-name" hidden>Body</h3>
                    <textarea name="postbody" id="postbody" className="box" onChange={e => setBody(e.target.value)} />
                </label>
                <div className="btn-container">
                    <button className="so-btn primary-btn submit-btn" id="post-ans-btn" type="submit">Post Your Answer</button>
                </div>
            </form>
            <div className="bottom-notice">
                <div>Not the answer you're looking for? Browse other questions tagged
                    <div className="tags-wrapper">
                        <Tags tagList={question.tags} />
                    </div>or <Link to="/askquestion" className="link">ask your own question</Link>.
                </div>
            </div>
        </div>
    )
}

export default QuestionDetails