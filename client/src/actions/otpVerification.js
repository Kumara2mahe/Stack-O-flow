import * as api from "../api"

export const sendOtp = (email, name) => async (dispatch) => {
    try {
        const { data } = await api.sendOtp({ email, name, sitelink: process.env.REACT_APP_CLIENT_URL })
        await dispatch({ type: "OTP_VERIFICATION", payload: data })
        await dispatch(otpVerification())
    } catch (error) {
        throw error
    }
}

export const otpVerification = () => {
    const verificationDetails = window.localStorage.getItem("sof-otp-verification")
    return {
        type: "FETCH_VERIFICATION_DETAILS",
        payload: verificationDetails ? JSON.parse(verificationDetails) : verificationDetails
    }
}

export const verifyOtp = (verificationData, userotp) => async (dispatch) => {
    try {
        const { data } = await api.verifyOtp({ email: verificationData.email, userotp })
        await dispatch({ type: "FETCH_AUTH_MESSAGES", payload: { from: "bot", content: data.message } })
        let updatedData = { ...verificationData }
        if (data.result.verified) {
            updatedData = { ...data.result }
        }
        else if (data.result.attempts >= 0) {
            updatedData.attempts = data.result.attempts
        }
        await dispatch({ type: "OTP_VERIFICATION", payload: updatedData })
        return updatedData
    } catch (error) {
        await dispatch({ type: "EXPIRE_OTP_VERIFICATION" })
        dispatch({ type: "CLEAR_AUTH_MESSAGES" })
        throw error
    } finally {
        await dispatch(otpVerification())
    }
}