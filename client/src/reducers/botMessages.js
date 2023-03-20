const initialState = [{
    from: "bot",
    content: "Hi, I'm here to help. What do you want to learn?",
}]

const botMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_MESSAGES":
            return [...state, action?.payload]
        case "CLEAR_MESSAGES":
            return initialState
        default:
            return state
    }
}

export default botMessagesReducer