const initialState = {
    received: false,
    confirmation: false,
    email: null,
}

const verifyMailSentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MAIL_SENT_VERIFIED":
            return { ...state, received: true, confirmation: true }
        case "MAIL_SENT":
            return { ...state, confirmation: false, email: action?.payload }
        case "MAIL_NOT_RECEIVED":
            return { ...state, confirmation: true }
        case "MAIL_SENT_RESET":
            return initialState
        default:
            return state
    }
}

export default verifyMailSentReducer