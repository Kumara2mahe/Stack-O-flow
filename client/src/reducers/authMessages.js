const initialState = [{
    from: "bot",
    content: "Enter the OTP received through your email."
}]

const authMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_AUTH_MESSAGES":
            return [...state, action?.payload]
        case "CLEAR_AUTH_MESSAGES":
            return initialState
        default:
            return state
    }
}

export default authMessagesReducer