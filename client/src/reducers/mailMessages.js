const initialState = [{
    from: "bot",
    content: "Enter your alternate email address."
}]

const mailMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_MAIL_MESSAGES":
            return [...state, action?.payload]
        case "CLEAR_MAIL_MESSAGES":
            return initialState
        default:
            return state
    }
}

export default mailMessagesReducer