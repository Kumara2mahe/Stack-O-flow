import { Routes, Route } from "react-router-dom"

import AuthRoutes from "./AuthRoutes"
import NonAuthRoutes from "./NonAuthRoutes"
import Home from "../../pages/home/Home"
import Auth from "../../pages/auth/Auth"
import Questions from "../../pages/questions/Questions"
import Users from "../../pages/users/Users"
import UserProfile from "../../pages/users/userprofile/UserProfile"
import AskQuestion from "../../pages/askquestion/AskQuestion"
import Tags from "../../pages/tags/Tags"

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<NonAuthRoutes />}>
                <Route path="/auth" element={<Auth />} />
            </Route>
            <Route path="/questions" element={<Questions />} />
            <Route path="/questions/:pUid" element={<Questions />} />
            <Route path="/questions/:pUid/:pAnsUid" element={<Questions />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route element={<AuthRoutes />}>
                <Route path="/askquestion" element={<AskQuestion />} />
            </Route>
            <Route path="/tags" element={<Tags />} />
        </Routes>
    )
}

export default AllRoutes