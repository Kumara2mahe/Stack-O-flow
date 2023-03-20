import { Navigate, Outlet } from "react-router-dom"

const NonAuthRoutes = () => {
    const USER = window.localStorage.getItem("sof-profile")
    return (
        USER === null ? <Outlet /> : <Navigate to="/" />
    )
}

export default NonAuthRoutes