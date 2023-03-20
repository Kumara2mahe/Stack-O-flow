import { useLocation, Navigate, Outlet } from "react-router-dom"

const AuthRoutes = () => {
    const USER = window.localStorage.getItem("sof-profile")
    const PATH = window.encodeURIComponent(useLocation().pathname)
    return (
        USER === null ? <Navigate to={`/auth?next=${PATH}`} /> : <Outlet />
    )
}

export default AuthRoutes