import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import PostContent from "../postcontent/PostContent"
import { pluralise, scrollToElement } from "../../../utils"
import "./answers.css"

const Answers = ({ qAuthorUid, answers }) => {
    const [answersCount, setAnswersCount] = useState(0)
    const { pUid, pAnsUid } = useParams()
    const navigate = useNavigate()

    var answerId
    useEffect(() => {
        setAnswersCount(answers.length)
        if (pAnsUid && pAnsUid.match("^[a-zA-Z]")) {
            const shareAnswer = document.querySelector(`#${pAnsUid}`)
            if (shareAnswer) {
                scrollToElement(shareAnswer, 50)
                shareAnswer.classList.add("highlight")
                setTimeout(() => {
                    shareAnswer.classList.remove("highlight")
                }, 1500)
                return
            }
        }
        navigate("/questions/" + pUid)
    }, [answers.length, pAnsUid, navigate, pUid])
    return (
        answers.length > 0 && <div id="post-answers">
            <h2 id="total-answers">{pluralise(answersCount, "Answer")}</h2>
            {
                answers.map(ans => (
                    <div className="answer" id={answerId = `answer-${ans._id}`} key={answerId}>
                        <PostContent post={ans} type="answer" qAuthorUid={qAuthorUid} ></PostContent>
                    </div>
                ))
            }
        </div>
    )
}

export default Answers