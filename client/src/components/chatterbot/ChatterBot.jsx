import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import decode from "jwt-decode"

import BotHeader from "./botcomponents/botheader/BotHeader"
import BotFooter from "./botcomponents/botfooter/BotFooter"
import BotChatArea from "./botcomponents/botchatarea/BotChatArea"
import { otpVerification } from "../../actions/otpVerification"
import "./chatterbot.css"

const ChatterBot = () => {
    const location = useLocation()
    const [openBot, setOpenBot] = useState(false)
    useEffect(() => {
        setOpenBot(false)
    }, [location.pathname])

    const USER = useSelector(state => state.currentUserReducer)
    const VERIFIED_USER = useSelector(state => state.otpVerificationReducer)
    const dispatch = useDispatch()

    const expireOtp = () => {
        dispatch({ type: "EXPIRE_OTP_VERIFICATION" })
        dispatch(otpVerification())
        dispatch({ type: "CLEAR_MESSAGES" })
    }
    useEffect(() => {
        const token = VERIFIED_USER?.token
        const isTokenExpired = token && (decode(token).exp * 1000 < new Date().getTime())
        if (isTokenExpired || (!VERIFIED_USER?.verified && VERIFIED_USER?.attempts === 0) || USER?.result?.email !== VERIFIED_USER?.email) {
            expireOtp()
        }
        // eslint-disable-next-line
    }, [location.pathname, openBot, VERIFIED_USER])

    const openChatterBot = (e) => {
        if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
            setOpenBot(true)
        }
    }
    return (
        <div id="chatter-bot">
            <div id="floating-btn" className={!openBot ? `opened` : ""} onClick={openChatterBot} onKeyDown={openChatterBot} tabIndex={!openBot ? 0 : -1} />
            <div id="bot-container" className={openBot ? `opened` : ""}>
                <BotHeader setOpenBot={setOpenBot} tabIndex={openBot ? 0 : -1} />
                {openBot && <BotChatArea />}
                <BotFooter tabIndex={openBot ? 0 : -1} />
            </div>
        </div>
    )
}

export default ChatterBot