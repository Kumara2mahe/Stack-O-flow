import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/auth"
import currentUserReducer from "./reducers/currentUser"
import questionsReducer from "./reducers/questions"
import usersReducer from "./reducers/users"
import verifyMailSentReducer from "./reducers/verifyMailSent"
import mailMessagesReducer from "./reducers/mailMessages"
import authMessagesReducer from "./reducers/authMessages"
import otpVerificationReducer from "./reducers/otpVerification"
import botMessagesReducer from "./reducers/botMessages"

const store = configureStore({
    reducer: {
        authReducer,
        currentUserReducer,
        questionsReducer,
        usersReducer,
        verifyMailSentReducer,
        mailMessagesReducer,
        authMessagesReducer,
        otpVerificationReducer,
        botMessagesReducer,
    }
})

export default store