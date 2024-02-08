import * as api from "../api"

export const parseUserMessage = (message, type = "") => async (dispatch) => {
    try {
        const data = { from: "user", content: message }
        switch (type) {
            case "auth":
                dispatch({ type: "FETCH_AUTH_MESSAGES", payload: data })
                break
            case "mail":
                dispatch({ type: "FETCH_MAIL_MESSAGES", payload: data })
                break
            default:
                dispatch({ type: "FETCH_MESSAGES", payload: data })
                break
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const getBotReply = (message) => async (dispatch) => {
    try {
        const { data } = await api.getBotReply({ message })
        const replyies = data.split("\n")
        for (const reply of replyies) {
            await dispatch({ type: "FETCH_MESSAGES", payload: { from: "bot", content: reply } })
        }
    }
    catch (error) {
        throw error
    }
}