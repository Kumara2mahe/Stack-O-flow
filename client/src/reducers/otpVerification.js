const otpVerificationReducer = (state = null, action) => {
    switch (action.type) {
        case "OTP_VERIFICATION":
            window.localStorage.setItem("sof-otp-verification", JSON.stringify({ ...action?.payload }))
            return { ...state, ...action?.payload }
        case "FETCH_VERIFICATION_DETAILS":
            return action.payload
        case "EXPIRE_OTP_VERIFICATION":
            window.localStorage.removeItem("sof-otp-verification")
            return state
        default:
            return state
    }
}

export default otpVerificationReducer