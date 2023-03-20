import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"

import { setUser } from "./actions/currentUser"
import { getAllQuestions } from "./actions/questions"
import { getAllUsers } from "./actions/user"
import { otpVerification } from "./actions/otpVerification"
import Navbar from "./components/navbar/Navbar"
import AllRoutes from "./components/AllRoutes/AllRoutes"
import ChatterBot from "./components/chatterbot/ChatterBot"
import "./app.css"

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setUser())
        dispatch(getAllQuestions())
        dispatch(getAllUsers())
        dispatch(otpVerification())
    }, [dispatch])
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <ChatterBot />
                <AllRoutes />
            </BrowserRouter>
        </div>
    );
}

export default App
