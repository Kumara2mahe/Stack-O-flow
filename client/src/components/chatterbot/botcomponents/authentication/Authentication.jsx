import { useDispatch, useSelector } from "react-redux"

import { sendOtp } from "../../../../actions/otpVerification"
import { showError } from "../botfooter/BotFooter"
import { parseErrorResText } from "../../../../utils/form"
import checkIconGreen from "../../../../assets/check-green.png"
import checkIconOrange from "../../../../assets/check-orange.png"
import Message from "../Message"
import EmailSentValidation from "./EmailSentValidation"
import "./authentication.css"

const Authentication = () => {
    const USER = useSelector(state => state.currentUserReducer)
    const VERIFIED_USER = useSelector(state => state.otpVerificationReducer)
    const VERIFY_MAIL_SENT = useSelector(state => state.verifyMailSentReducer)
    const AUTH_MESSAGES = useSelector(state => state.authMessagesReducer)

    const dispatch = useDispatch()
    const handleSendOtp = () => {
        const email = USER?.result?.email
        const botFooter = document.querySelector("#bot-footer")
        if (email) {
            botFooter.parentElement.classList.add("processing")
            dispatch(sendOtp(email, USER?.result?.name))
                .catch((error) => {
                    let errMsg = error.message
                    switch (error?.response?.request?.status) {
                        case 401:
                            errMsg = "Logged in session expired! Try to login again"
                            break
                        case 400:
                            errMsg = parseErrorResText(error, error.message)
                            break
                        default:
                            break
                    }
                    showError(botFooter, "empty", errMsg)
                })
                .finally(() => {
                    botFooter.parentElement.classList.remove("processing")
                })
        }
        else showError(botFooter, "empty", "Invalid Credential! Try to login again")
    }
    return (
        USER
            ? <div className="auth-cht-container">
                <div className="info greeting">
                    <div className="greet">Welcome <span className="user-name">{USER.result.name}</span>
                        &nbsp;<img width="16" src={VERIFIED_USER ? checkIconGreen : checkIconOrange} alt="check-mark" />
                    </div>
                    {!VERIFIED_USER?.verified && (
                        VERIFY_MAIL_SENT && VERIFY_MAIL_SENT.received === false && VERIFY_MAIL_SENT.confirmation
                            ? <div className="info-hint">
                                Looks like <span className="like-a-link nolink">{VERIFY_MAIL_SENT.email ? VERIFY_MAIL_SENT.email : USER.result.email}</span> couldn't be found, or is unable to receive mail.
                            </div>
                            : <div className="info-hint">Before answering your question I need to verfiy it's really you.</div>
                    )}
                </div>
                {
                    !VERIFIED_USER?.verified && (
                        VERIFIED_USER?.attempts > 0
                            ? VERIFY_MAIL_SENT.received
                                ? AUTH_MESSAGES.map((msg, index) => (
                                    <Message key={`${msg.from}-ch${index}`} uid={`${msg.from}-ch${index}`} content={msg.content} from={msg.from} />
                                ))
                                : <EmailSentValidation />
                            : <div className="verification-choice">
                                <button className="so-btn choice-btn" onClick={handleSendOtp} type="button">Send Otp</button>
                            </div>
                    )
                }
            </div>
            : <div className="info warning">
                <h4 className="info-head">&#x1F6C8; Authentication required</h4>
                <p className="info-hint">come back when you are logged in.</p>
            </div>
    )
}

export default Authentication