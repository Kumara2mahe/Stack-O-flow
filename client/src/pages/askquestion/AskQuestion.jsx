import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { validateTags, maxTags, validateForm, validateBodyField, generateErrorHint } from "../../utils/form"
import { toggleSpinnerAnim } from "../../utils"
import { askQuestion } from "../../actions/questions"
import "./askquestion.css"

const AskQuestion = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")

    const USER = useSelector(state => state.currentUserReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            includeTextArea: true,
            info: "is missing.",
            minTitleLength: 15,
            minBodyLength: 30,
            showErrorFor: 4.5 // seconds
        }
        const validInputs = validateForm(e.target, data)
        const validTextArea = validateBodyField(e.target, e.target.querySelector("#post-ques-btn"), data)
        if (validInputs && validTextArea) {
            toggleSpinnerAnim()
            const action = askQuestion({
                title, body, tags,
                by: {
                    name: USER.result.name,
                    avatar: USER.result.avatar,
                    uUid: USER.result._id
                }
            })
            dispatch(action)
                .then(() => {
                    navigate("/questions")
                })
                .catch((error) => {
                    const titleInput = e.target.querySelector("#posttitle")
                    generateErrorHint(titleInput, error?.response?.data?.message, e.target.querySelector(".submit-btn"), 2.5)
                    titleInput.focus()
                })
                .finally(() => {
                    toggleSpinnerAnim()
                    e.target.reset()
                })
        }
    }
    document.title = "Ask a Question - Stack O-flow"
    return (
        <article id="ask-question-contents">
            <section className="wrapper">
                <h1 className="page-title">Ask a public Question</h1>
                <form id="question-form" className="post-form" onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="posttitle">
                            <h3 className="box-name">Title</h3>
                            <p className="hint">Be specific and imagine you’re asking a question to another person</p>
                            <input type="text" name="posttitle" id="posttitle" className="box" onChange={e => setTitle(e.target.value)} size="30" maxLength="250" placeholder="e.g. Is there an R function for finding the index of an element in a vector?" autoComplete="off" />
                        </label>
                        <label htmlFor="postbody">
                            <h3 className="box-name">Body</h3>
                            <p className="hint">Include all the information someone would need to answer your question</p>
                            <textarea name="postbody" id="postbody" className="box" onChange={e => setBody(e.target.value)} />
                        </label>
                        <label htmlFor="posttags">
                            <h3 className="box-name">Tags</h3>
                            <p className="hint">Add up to 5 tags to describe what your question is about</p>
                            <input type="text" name="posttags" id="posttags" className="box" onInput={handleTagInputs} onChange={e => setTags(e.target.value.split(" "))} size="30" maxLength="100" placeholder="e.g. (sql linux mongodb)" autoComplete="off" />
                            <div className="tags-wrapper"></div>
                        </label>
                    </div>
                    <div className="btn-container">
                        <button className="so-btn primary-btn submit-btn" id="post-ques-btn" type="submit">Post your question</button>
                    </div>
                </form>
            </section>
        </article>
    )
}

const handleTagInputs = (e) => {
    const tagsContainer = e.target.parentElement.querySelector(".tags-wrapper")
    const tags = e.target.value.trimStart().split(" ")
    if (validateTags(e.target) || (tags.length > 0 && tags.length <= maxTags)) {
        let newTags = ""
        tags.forEach(tag => {
            if (tag !== "") {
                newTags += `<p class="tag no-hover">${tag}</p>`
            }
        })
        tagsContainer.innerHTML = newTags
    }
    else {
        e.target.value = tags.slice(0, maxTags).join(" ")
    }
}

export default AskQuestion