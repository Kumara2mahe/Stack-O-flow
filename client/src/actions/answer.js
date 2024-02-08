import * as api from "../api"
import { POST_ANSWER } from "./types"
import { getAllQuestions } from "./questions"

export const postAnswer = (answerData) => async (dispatch) => {
    try {
        const { id, body, by } = answerData
        const { data } = await api.postAnswer(id, { body, by })
        await dispatch({ type: POST_ANSWER, payload: data })
        await dispatch(getAllQuestions())
    }
    catch (error) {
        throw error
    }
}

export const deleteAnswer = (id, ansUid, uUid) => async (dispatch) => {
    try {
        await api.deleteAnswer(id, { ansUid, uUid })
        await dispatch(getAllQuestions())
    }
    catch (error) {
        throw error
    }
}