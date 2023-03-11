import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

API.interceptors.request.use(req => {
    const USER = window.sessionStorage.getItem("profile")
    if (USER) {
        req.headers.setAuthorization(`Bearer ${JSON.parse(USER).token}`)
    }
    return req
})

export const signUp = (data) => API.post("/user/signup", data)
export const logIn = (data) => API.post("/user/login", data)

export const getAllUsers = () => API.get("/user/all")
export const updateProfile = (id, data) => API.patch(`/user/update/${id}`, data)

export const postQuestion = (data) => API.post("/questions/ask", data)
export const getAllNewQuestions = () => API.get("/questions/get?sortby=new")
export const getAllTopQuestions = () => API.get("/questions/get?sortby=topscore")
export const voteQuestion = (id, data) => API.patch(`/questions/vote/${id}`, data)
export const deleteQuestion = (id, data) => API.patch(`/questions/delete/${id}`, data)

export const postAnswer = (id, data) => API.patch(`/answer/post/${id}`, data)
export const deleteAnswer = (id, data) => API.patch(`/answer/delete/${id}`, data)