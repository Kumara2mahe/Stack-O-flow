import * as api from "../api"

export const parseUserMessage = (message, toVerify = false) => async (dispatch) => {
    try {
        const data = { from: "user", content: message }
        dispatch({ type: toVerify ? "FETCH_AUTH_MESSAGES" : "FETCH_MESSAGES", payload: data })
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