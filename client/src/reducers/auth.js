const authReducer = (state = null, action) => {
    switch (action.type) {
        case "AUTH":
            window.localStorage.setItem("sof-profile", JSON.stringify({ ...action?.data }))
            return { ...state, data: action?.data }
        case "LOGOUT":
            window.localStorage.removeItem("sof-profile")
            return { ...state, data: null }
        default:
            return state
    }
}

export default authReducer