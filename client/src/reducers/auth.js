const authReducer = (state = null, action) => {
    switch (action.type) {
        case "AUTH":
            window.sessionStorage.setItem("profile", JSON.stringify({ ...action?.data }))
            return { ...state, data: action?.data }
        case "LOGOUT":
            window.sessionStorage.removeItem("profile")
            return { ...state, data: null }
        default:
            return state
    }
}

export default authReducer