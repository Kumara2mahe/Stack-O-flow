import { useDispatch } from "react-redux"
import "./botheader.css"

const BotHeader = ({ setOpenBot, tabIndex }) => {
    const dispatch = useDispatch()
    const clearAndCloseBot = () => {
        setOpenBot(false)
        dispatch({ type: "CLEAR_MESSAGES" })
    }
    return (
        <div id="bot-header">
            <h2 className="header-title">ChatBot</h2>
            <button className="close-btn" onClick={clearAndCloseBot} tabIndex={tabIndex} title="Clear and Close Bot" type="button">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </button>
        </div>
    )
}

export default BotHeader