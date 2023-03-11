import { Navigate, Outlet } from "react-router-dom"

const NonAuthRoutes = () => {
    const USER = window.sessionStorage.getItem("profile")
    return (
        USER === null ? <Outlet /> : <Navigate to="/" />
    )
}

export default NonAuthRoutes