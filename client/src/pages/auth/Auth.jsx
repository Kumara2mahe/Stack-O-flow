import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"

import AboutAuth from "./AboutAuth"
import { validateForm, generateErrorHint } from "../../utils/form"
import { toggleSpinnerAnim } from "../../utils"
import { getRandomAvatar } from "../../components/avatar/Avatar"
import { signup, login } from "../../actions/auth"
import siteIcon from "../../assets/icon.png"
import "./auth.css"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const switchForm = (e) => {
        if ((e.type === "keydown" && e.key === "Enter") || e.type === "click") {
            resetForm()
            setIsLogin(!isLogin)
        }
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validateForm(
            e.target, {
            except: "check",
            newPwd: !isLogin,
            showErrorFor: 2.5 // seconds
        })
        const submitBtn = e.target.querySelector(".submit-btn")
        if (isValid) {
            toggleSpinnerAnim()
            const avatar = getRandomAvatar()
            const action = isLogin ? login({ email, password }) : signup({ name, email, password, avatar })
            dispatch(action)
                .then(() => {
                    navigate(new URLSearchParams(location.search).get("next") || "/")
                })
                .catch((error) => {
                    const emailInput = e.target.querySelector("#email")
                    generateErrorHint(emailInput, error?.response?.data?.message, submitBtn, 2.5)
                    emailInput.focus()
                })
                .finally(() => {
                    toggleSpinnerAnim()
                    e.target.reset()
                })
        }
    }
    document.title = `${isLogin ? "Log In" : "Sign Up"} - Stack O-flow`
    return (
        <article id="auth-contents">
            {!isLogin && <AboutAuth></AboutAuth>}
            <section className="auth-container">
                {isLogin ? <img className="icon" src={siteIcon} alt="Stack O-flow" /> : <h4 id="s-screen-heading">Create your <span className="site-name">Stack O-flow</span> account. It’s free and only takes a minute.</h4>}
                <form id="auth-form" onSubmit={handleSubmit}>
                    {
                        !isLogin &&
                        <label htmlFor="name">
                            <h4 className="box-name">Display Name</h4>
                            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} size="30" maxLength="100" autoComplete="name" />
                        </label>
                    }
                    <label htmlFor="email">
                        <h4 className="box-name">Email</h4>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} size="30" maxLength="100" autoComplete="email" />
                    </label>
                    <label htmlFor="password">
                        <div className="sub-titles">
                            <h4 className="box-name">Password</h4>
                            {isLogin && <p className="like-a-link nolink">Forgot Password?</p>}
                        </div>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} size="30" maxLength="100" autoComplete="current-password" />
                        {!isLogin && <p className="hint">Passwords must contain at least eight characters, including at least 1 letter and 1 number.</p>}
                    </label>
                    {
                        !isLogin &&
                        <label htmlFor="check" className="check-label">
                            <input type="checkbox" id="check" />
                            <p className="hint">Opt-in to receive occasional product updates, user research invitations, company announcements, and digests.</p>
                        </label>
                    }
                    <button className="so-btn primary-btn submit-btn" type="submit">{isLogin ? "Log in" : "Sign up"}</button>
                    {
                        !isLogin &&
                        <p id="terms-condition">By clicking “Sign up”, you agree to our
                            <span className="like-a-link nolink"> terms of service</span>,
                            <span className="like-a-link nolink"> privacy policy</span> and
                            <span className="like-a-link nolink"> cookie policy</span></p>
                    }
                </form>
                <p className="auth-switch-content">
                    <span>{isLogin ? "Don't" : "Already"} have an account? </span>
                    <span className="like-a-link" id="switch-btn" onKeyDown={switchForm} onClick={switchForm} tabIndex="0">{isLogin ? "Sign up" : "Log in"}</span>
                </p>
            </section>
        </article>
    )
}

const resetForm = () => {
    const authForm = document.querySelector("#auth-form")
    authForm.querySelectorAll("input").forEach(input => {
        input.classList.remove("error")
    })
    authForm.reset()
}

export default Auth