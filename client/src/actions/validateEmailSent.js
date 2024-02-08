import { MAIL_NOT_RECEIVED, MAIL_SENT_VERIFIED } from "./types"

export const receivedEmail = () => async (dispatch) => {
    try {
        await dispatch({ type: MAIL_SENT_VERIFIED })
    } catch (error) {
        throw error
    }
}

export const notReceivedEmail = (email) => async (dispatch) => {
    try {
        await dispatch({ type: MAIL_NOT_RECEIVED, payload: email })
    } catch (error) {
        throw error
    }
}
