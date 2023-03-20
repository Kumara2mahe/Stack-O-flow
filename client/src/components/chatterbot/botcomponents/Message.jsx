import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

import LoadingAnim from "../../LoadingAnim/LoadingAnim"
import Avatar from "../../avatar/Avatar"
import botAvatar from "../../../assets/bot-avatar.png"
import userAvatar from "../../../assets/user-avatar.png"

const Message = ({ uid, from, content }) => {
    const [msgContent, setMsgContent] = useState(null)
    const chatContainer = document.querySelector("#bot-chat-area")
    useEffect(() => {
        setMsgContent(content)
        if (chatContainer) chatContainer.scrollTop = chatContainer?.scrollHeight
    }, [content, chatContainer, chatContainer?.scrollHeight])

    const USER = useSelector(state => state.currentUserReducer)
    const VERIFIED_USER = useSelector(state => state.otpVerificationReducer)
    const isNextMsgSameOrigin = document.querySelector(`#${uid}`)?.previousElementSibling?.classList.contains(`${from}-cht`)
    return (
        <div id={uid} className={`conversation ${from}-cht`}>
            <div className={`cht-item cht-avtar ${from}-avtar`} >
                {isNextMsgSameOrigin
                    ? <div className="icon avtar-placeholder" />
                    : (
                        VERIFIED_USER?.verified && from !== "bot"
                            ? <div className="icon">
                                <Avatar gradientBg={USER?.result?.avatar} fontSize="1em" fontWeight="600" padV="17px" padH="17px" borderRadius="50%">
                                    {USER?.result?.name}
                                </Avatar>
                            </div>
                            : <img className="icon" src={from !== "bot" ? userAvatar : botAvatar} alt={`${from}-avatar`} />
                    )
                }
            </div>
            <div className={`cht-item message ${isNextMsgSameOrigin ? "point-up " : ""}${from}-msg`}>
                {msgContent ? msgContent : <LoadingAnim noLabel={true} />}
            </div>
        </div>
    )
}

export default Message