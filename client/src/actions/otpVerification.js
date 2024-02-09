import * as api from "../api"
import * as actionType from "./types"

export const sendOtp = (uUid, email, name) => async (dispatch) => {
    try {
        const { data } = await api.sendOtp({ uUid, email, name, sitelink: process.env.REACT_APP_CLIENT_URL })
        await dispatch({ type: actionType.MAIL_SENT, payload: email })
        await dispatch({ type: actionType.OTP_VERIFICATION, payload: data })
        await dispatch(otpVerification())
    } catch (error) {
        throw error
    }
}

export const otpVerification = () => {
    const verificationDetails = window.localStorage.getItem("sof-otp-verification")
    return {
        type: actionType.FETCH_VERIFICATION_DETAILS,
        payload: verificationDetails ? JSON.parse(verificationDetails) : verificationDetails
    }
}

export const verifyOtp = (verificationData, userotp) => async (dispatch) => {
    try {
        const { data } = await api.verifyOtp({ uUid: verificationData.userId, email: verificationData.email, userotp })
        await dispatch({ type: actionType.FETCH_AUTH_MESSAGES, payload: { from: "bot", content: data.message } })
        let updatedData = { ...verificationData }
        if (data.result.verified) {
            updatedData = { ...data.result }
        }
        else if (data.result.attempts >= 0) {
            updatedData.attempts = data.result.attempts
        }
        await dispatch({ type: actionType.OTP_VERIFICATION, payload: updatedData })
        return updatedData
    } catch (error) {
        await dispatch({ type: actionType.EXPIRE_OTP_VERIFICATION })
        dispatch({ type: actionType.CLEAR_AUTH_MESSAGES })
        throw error
    } finally {
        await dispatch(otpVerification())
    }
}