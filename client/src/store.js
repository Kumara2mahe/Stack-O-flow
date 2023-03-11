import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/auth"
import currentUserReducer from "./reducers/currentUser"
import questionsReducer from "./reducers/questions"
import usersReducer from "./reducers/users"

const store = configureStore({
    reducer: {
        authReducer,
        currentUserReducer,
        questionsReducer,
        usersReducer,
    }
})

export default store