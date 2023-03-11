import { useParams, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import LoadingAnim from "../../../components/LoadingAnim/LoadingAnim"
import QuestionDetails from "../../../components/questiondetails/QuestionDetails"

const ViewQuestion = () => {
    const { pUid } = useParams()
    const ALLQUESTIONS = useSelector(state => state.questionsReducer)
    const QUESTION = ALLQUESTIONS?.data.filter(ques => ques._id === pUid)
    let title = "Stack O-flow"
    if (QUESTION?.length > 0) {
        title = `${QUESTION[0].title} - ${title}`
        if (QUESTION[0].tags.length > 0) {
            title = `${QUESTION[0].tags[0]} - ${title}`
        }
    }
    document.title = title
    return (
        QUESTION?.length === 0
            ? <Navigate to="/questions" />
            : <div id="main-bar" focus="true">
                {ALLQUESTIONS && ALLQUESTIONS.data !== null
                    ? <>{
                        QUESTION.map(ques => (
                            <QuestionDetails question={ques} key={ques._id} />
                        ))
                    }</>
                    : <LoadingAnim />
                }
            </div>
    )
}

export default ViewQuestion