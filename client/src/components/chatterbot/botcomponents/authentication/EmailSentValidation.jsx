import { useSelector, useDispatch } from "react-redux"

import { notReceivedEmail, receivedEmail } from "../../../../actions/validateEmailSent"
import { showError } from "../botfooter/BotFooter"
import { parseErrorResText } from "../../../../utils/form"
import Message from "../Message"

const EmailSentValidation = () => {
    const USER = useSelector(state => state.currentUserReducer)
    const VERIFY_MAIL_SENT = useSelector(state => state.verifyMailSentReducer)
    const MAIL_MESSAGES = useSelector(state => state.mailMessagesReducer)

    const dispatch = useDispatch()
    const handleConfirmation = (received) => {
        const email = USER?.result?.email
        const botFooter = document.querySelector("#bot-footer")
        if (email) {
            botFooter.parentElement.classList.add("processing")
            dispatch(received ? receivedEmail() : notReceivedEmail(email))
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
    return VERIFY_MAIL_SENT.confirmation
        ? MAIL_MESSAGES.map((msg, index) => (
            <Message key={`${msg.from}-ch${index}`} uid={`${msg.from}-ch${index}`} content={msg.content} from={msg.from} />
        ))
        : <>
            <Message key="bot-ch0" uid="bot-ch0" content="Do you got the email we sent?" from="bot" />
            <div className="verification-choice">
                <button className="so-btn choice-btn" onClick={() => handleConfirmation(true)} type="button">Yes</button>
                <button className="so-btn choice-btn" onClick={() => handleConfirmation(false)} type="button">No</button>
            </div>
        </>
}
export default EmailSentValidation