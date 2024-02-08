import * as api from "../api"
import { FETCH_USERS, AUTH, UPDATE_USER } from "./types"
import { setUser } from "./currentUser"

export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers()
        await dispatch({ type: FETCH_USERS, payload: data })
    } catch (error) {
        throw error
    }
}

export const getUser = (userData) => async (dispatch) => {
    try {
        const { data } = await api.getUser(userData.result._id)
        const updatedData = {
            token: userData.token,
            result: data
        }
        dispatch({ type: AUTH, data: updatedData })
        dispatch(setUser())
    }
    catch (error) {
        throw error
    }
}

export const updateProfile = (id, userData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, userData)
        await dispatch({ type: UPDATE_USER, payload: data })
    } catch (error) {
        throw error
    }
}