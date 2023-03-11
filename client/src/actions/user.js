import * as api from "../api"

export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers()
        await dispatch({ type: "FETCH_USERS", payload: data })
    } catch (error) {
        throw error
    }
}

export const updateProfile = (id, userData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, userData)
        await dispatch({ type: "UPDATE_USER", payload: data })
    } catch (error) {
        throw error
    }
}