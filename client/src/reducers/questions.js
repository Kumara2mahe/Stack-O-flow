const questionsReducer = (state = null, action) => {
    switch (action.type) {
        case "FETCH_QUESTIONS":
            return { ...state, data: action?.payload }
        case "POST_QUESTION" || "POST_ANSWER":
            return state
        default:
            return state
    }
}

export default questionsReducer