import * as api from "../api"
import { setUser } from "./currentUser"


export const signup = (userData) => async (dispatch) => {
    try {
        const { data } = await api.signUp(userData)
        dispatch({ type: "AUTH", data })
        dispatch(setUser())
    }
    catch (error) {
        throw error
    }
}

export const login = (userData) => async (dispatch) => {
    try {
        const { data } = await api.logIn(userData)
        dispatch({ type: "AUTH", data })
        dispatch(setUser())
    }
    catch (error) {
        throw error
    }
}