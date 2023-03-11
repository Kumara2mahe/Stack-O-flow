import { useSelector, useDispatch } from "react-redux"
import { useLocation, Link } from "react-router-dom"
import { useEffect } from "react"

import { getAllQuestions } from "../../actions/questions"
import LoadingAnim from "../LoadingAnim/LoadingAnim"
import AllQuestions from "./AllQuestions"
import { pluralise } from "../../utils"
import "./mainbar.css"

const Mainbar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllQuestions(location.pathname === "/questions"))
    }, [dispatch, location])
    const QUESTIONS = useSelector(state => state.questionsReducer)
    return (
        <div id="main-bar">
            <div className="main-header">
                <h1 className="title">{location.pathname === "/" ? "Top" : "All"} Questions</h1>
                <Link to="/askquestion" className="so-btn primary-btn" id="ask-ques-btn">Ask Question</Link>
            </div>
            {QUESTIONS && QUESTIONS.data !== null
                ? <>
                    <div className="question-count">{pluralise(QUESTIONS.data.length, "question")}</div>
                    <AllQuestions questions={QUESTIONS.data} />
                </>
                : <LoadingAnim />
            }
        </div>
    )
}

export default Mainbar