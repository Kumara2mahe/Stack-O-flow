import { useSelector } from "react-redux"

import Authentication from "../authentication/Authentication"
import Message from "../Message"
import "./botchatarea.css"

const BotChatArea = () => {
    const USER = useSelector(state => state.currentUserReducer)
    const VERIFIED_USER = useSelector(state => state.otpVerificationReducer)
    const MESSAGES = useSelector(state => state.botMessagesReducer)
    return (
        <div id="bot-chat-area">
            <div id="bot-progress-bar">
                <div className="slider" />
            </div>
            {USER && VERIFIED_USER?.verified
                ? MESSAGES.map((msg, index) => (
                    <Message key={`${msg.from}-ch${index}`} uid={`${msg.from}-ch${index}`} content={msg.content} from={msg.from} />
                ))
                : <Authentication />
            }
            <div id="end-of-chat" />
        </div>
    )
}
export default BotChatArea