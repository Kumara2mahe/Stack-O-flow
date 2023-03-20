import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/auth"
import currentUserReducer from "./reducers/currentUser"
import questionsReducer from "./reducers/questions"
import usersReducer from "./reducers/users"
import botMessagesReducer from "./reducers/botMessages"
import otpVerificationReducer from "./reducers/otpVerification"
import authMessagesReducer from "./reducers/authMessages"

const store = configureStore({
    reducer: {
        authReducer,
        currentUserReducer,
        questionsReducer,
        usersReducer,
        botMessagesReducer,
        otpVerificationReducer,
        authMessagesReducer,
    }
})

export default store