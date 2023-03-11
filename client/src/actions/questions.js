import * as api from "../api"

export const askQuestion = (questionData) => async (dispatch) => {
    try {
        await api.postQuestion(questionData)
        await dispatch({ type: "POST_QUESTION" })
    } catch (error) {
        throw error
    }
}

export const getAllQuestions = (sortByNew = false) => async (dispatch) => {
    try {
        const { data } = sortByNew ? await api.getAllNewQuestions() : await api.getAllTopQuestions()
        await dispatch({ type: "FETCH_QUESTIONS", payload: data })
    }
    catch (error) {
        console.log(error.message)
    }
}

export const voteQuestion = (id, uUid, type) => async (dispatch) => {
    try {
        await api.voteQuestion(id, { type, uUid })
        await dispatch(getAllQuestions())
    } catch (error) {
        throw error
    }
}

export const deleteQuestion = (id, uUid) => async () => {
    try {
        await api.deleteQuestion(id, { uUid })
    }
    catch (error) {
        throw error
    }
}