import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

API.interceptors.request.use(req => {
    const USER = window.localStorage.getItem("sof-profile")
    if (USER) {
        req.headers.setAuthorization(`Bearer ${JSON.parse(USER).token}`)
    }
    return req
})

// Forum
export const signUp = (data) => API.post("/user/signup", data)
export const logIn = (data) => API.post("/user/login", data)

export const getAllUsers = () => API.get("/user/all")
export const getUser = (id) => API.get(`/user/get/${id}`)
export const updateProfile = (id, data) => API.patch(`/user/update/${id}`, data)

export const postQuestion = (data) => API.post("/questions/ask", data)
export const getAllNewQuestions = () => API.get("/questions/get?sortby=new")
export const getAllTopQuestions = () => API.get("/questions/get?sortby=topscore")
export const voteQuestion = (id, data) => API.patch(`/questions/vote/${id}`, data)
export const deleteQuestion = (id, data) => API.patch(`/questions/delete/${id}`, data)

export const postAnswer = (id, data) => API.patch(`/answer/post/${id}`, data)
export const deleteAnswer = (id, data) => API.patch(`/answer/delete/${id}`, data)

// Chatbot
export const getBotReply = (data) => API.post("/bot/reply", data)
export const sendOtp = (data) => API.post("/bot/sendotp", data)
export const verifyOtp = (data) => API.post("/bot/verifyotp", data)

// Memberships
export const createOrGetCustomer = (data) => API.post("/pricing/customer/create", data)
export const createCheckoutSession = (data) => API.post("/pricing/checkout-session/create", data)
export const createBillingPortalSession = (data) => API.post("/pricing/billing-portal-session/create", data)
export const cancelSubscription = (id) => API.delete(`/pricing/subscription/${id}`)