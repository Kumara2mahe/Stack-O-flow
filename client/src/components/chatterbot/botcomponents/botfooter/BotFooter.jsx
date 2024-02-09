import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { CLEAR_AUTH_MESSAGES, CLEAR_MAIL_MESSAGES } from "../../../../actions/types"
import { parseUserMessage, getBotReply } from "../../../../actions/messages"
import { sendOtp, verifyOtp } from "../../../../actions/otpVerification"
import { parseErrorResText } from "../../../../utils/form"
import sendIcon from "../../../../assets/send.svg"
import "./botfooter.css"

const BotFooter = ({ tabIndex }) => {
    const USER = useSelector(state => state.currentUserReducer)
    const VERIFIED_USER = useSelector(state => state.otpVerificationReducer)
    const VERIFY_MAIL_SENT = useSelector(state => state.verifyMailSentReducer)
    const [disableInput, setDisableInput] = useState(true)
    const [userMessage, setUserMessage] = useState("")

    const condition = tabIndex === 0 && USER !== null && VERIFIED_USER !== null && (VERIFY_MAIL_SENT.received || VERIFY_MAIL_SENT.confirmation)
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
            const clearMessages = () => {
                e.target.parentElement.classList.remove("processing")
                submitBtn.disabled = false
                dispatch({ type: CLEAR_MAIL_MESSAGES })
            }
            const submitBtn = e.target.querySelector("#msg-submit-btn")
            submitBtn.disabled = true
            e.target.parentElement.classList.add("processing")

            // User input action
            const replyForAlternateEmail = VERIFY_MAIL_SENT && VERIFY_MAIL_SENT.received === false && VERIFY_MAIL_SENT.confirmation
            const userAction = !VERIFIED_USER?.verified
                ? replyForAlternateEmail
                    ? parseUserMessage(userMessage, "mail")
                    : parseUserMessage(userMessage, "auth")
                : parseUserMessage(userMessage)
            dispatch(userAction)

            const alternateEmail = userMessage.trim()
            if (!VERIFIED_USER?.verified && replyForAlternateEmail && alternateEmail === USER?.result?.email) {
                setUserMessage("")
                clearMessages()
                return showError(e.target, "empty", "Oops! not the same email.")
            }

            // Bot reply action
            const botAction = !VERIFIED_USER?.verified
                ? replyForAlternateEmail
                    ? sendOtp(USER?.result?._id, userMessage.trim(), USER?.result?.name) // Validate email & send otp
                    : verifyOtp(VERIFIED_USER, userMessage)
                : getBotReply(userMessage)
            dispatch(botAction)
                .then((data) => {
                    if (data?.verified) {
                        dispatch({ type: CLEAR_AUTH_MESSAGES })
                    }
                })
                .catch((error) => {
                    let errMsg = error.message
                    switch (error?.response?.request?.status) {
                        case 404:
                            errMsg = parseErrorResText(error, error.message)
                            break
                        case 401:
                            errMsg = "Logged in session expired! Try to login again"
                            break
                        case 400:
                            errMsg = parseErrorResText(error, error.message)
                            break
                        default:
                            break
                    }
                    showError(e.target, "empty", errMsg)
                })
                .finally(clearMessages)
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