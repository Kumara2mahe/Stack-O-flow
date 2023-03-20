import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { parseUserMessage, getBotReply } from "../../../../actions/messages"
import { verifyOtp } from "../../../../actions/otpVerification"
import { parseErrorResText } from "../../../../utils/form"
import sendIcon from "../../../../assets/send.svg"
import "./botfooter.css"

const BotFooter = ({ tabIndex }) => {
    const USER = useSelector(state => state.currentUserReducer)
    const VERIFIED_USER = useSelector(state => state.otpVerificationReducer)
    const [disableInput, setDisableInput] = useState(true)
    const [userMessage, setUserMessage] = useState("")

    const condition = tabIndex === 0 && USER !== null && VERIFIED_USER !== null
    useEffect(() => {
        if (condition) {
            setTimeout(() => {
                document.querySelector("#bot-footer .input-box")?.focus()
            }, 100)
        }
        setDisableInput(!condition)
    }, [condition])

    const dispatch = useDispatch()
    const sendMessage = (e) => {
        e.preventDefault()
        if (USER === null) {
            showError(e.target.parentElement, "auth-error")
        }
        else if (userMessage !== "") {
            const submitBtn = e.target.querySelector("#msg-submit-btn")
            submitBtn.disabled = true
            e.target.parentElement.classList.add("processing")

            // User input action
            const userAction = !VERIFIED_USER?.verified ? parseUserMessage(userMessage, true) : parseUserMessage(userMessage)
            dispatch(userAction)

            // Bot reply action
            const botAction = !VERIFIED_USER?.verified ? verifyOtp(VERIFIED_USER, userMessage) : getBotReply(userMessage)
            dispatch(botAction)
                .then((data) => {
                    if (data?.verified) {
                        dispatch({ type: "CLEAR_AUTH_MESSAGES" })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    let errMsg = parseErrorResText(error, error.message)
                    showError(e.target, "empty", errMsg)
                })
                .finally(() => {
                    e.target.parentElement.classList.remove("processing")
                    submitBtn.disabled = false
                })
        }
        else showError(e.target, "empty")
        setUserMessage("")
        e.target.querySelector(".input-box").focus()
    }
    return (
        <form id="bot-footer" onSubmit={sendMessage}>
            <span className="empty-hint">Don't leave it empty, Ask something!</span>
            <input value={userMessage} onChange={e => setUserMessage(e.target.value)} tabIndex={tabIndex} disabled={disableInput} {...inputAttributes} />
            <button id="msg-submit-btn" title="Send" type="submit" tabIndex={tabIndex} disabled={disableInput}>
                <img src={sendIcon} alt="send" />
            </button>
        </form>
    )
}

const inputAttributes = {
    type: "text",
    name: "botUserInput",
    className: "input-box",
    placeholder: "Type the message ...",
    autoComplete: "off",
}

export const showError = (element, className, errMessage = "Don't leave it empty, Ask something!") => {
    element.querySelector(".empty-hint").innerHTML = errMessage
    element.classList.add(className)
    setTimeout(() => {
        element.classList.remove(className)
    }, 2500)
}

export default BotFooter