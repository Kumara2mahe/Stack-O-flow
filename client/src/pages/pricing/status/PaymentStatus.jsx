import { useSelector } from "react-redux"
import { useSearchParams, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import { toggleSpinnerAnim, capitialize } from "../../../utils"
import { getUser } from "../../../actions/user"
import "../pricing.css"
import "./paymentstatus.css"

const PaymentStatus = () => {
    const USER = useSelector(state => state.currentUserReducer)

    const [searchParams] = useSearchParams()
    const success = searchParams.get("success")
    const canceled = searchParams.get("canceled")
    const plan = searchParams.get("plan")
    const sessionId = searchParams.get("session_id")
    const activePlan = searchParams.get("active_plan")

    const [validRedirect, setvalidRedirect] = useState(true)
    const [showRedirectLink, setShowRedirectLink] = useState(true)

    toggleSpinnerAnim("ON")
    const isNotFreePlan = plan !== "free"
    const dispatch = useDispatch()
    useEffect(() => {
        const condition1 = plan === null || (success === null && canceled === null) || (success !== null && canceled !== null)
        if (isNotFreePlan && (condition1)) {
            setvalidRedirect(false)
        }
        const condition2 = plan !== null && USER?.result?.stripe && plan !== USER?.result?.stripe?.plan
        condition2 && dispatch(getUser(USER))
            .catch(() => {
                if (USER?.result?.stripe?.plan !== plan) {
                    setvalidRedirect(false)
                }
            })
            .finally(() => toggleSpinnerAnim("OFF"))
        // eslint-disable-next-line
    }, [USER])

    const navigate = useNavigate()
    const initiateRedirect = () => {
        setShowRedirectLink(false)
        setTimeout(() => {
            navigate("/")
        }, 2500)
    }
    let pageTitle = ""
    if (validRedirect) {
        const titlePlanName = capitialize(!canceled && USER?.result?.stripe ? USER?.result?.stripe.plan : plan)
        const activity = success ? `${plan === USER?.result?.stripe?.plan && ((isNotFreePlan && sessionId) || !activePlan) ? "activated" : "active"}` : "cancelled"
        pageTitle = `${titlePlanName} plan (${activity}) `
    }
    document.title = `Pricing ${pageTitle}- Stack O-flow`

    return (
        validRedirect ?
            <article id="subscription-status">
                {plan === USER?.result?.stripe?.plan && toggleSpinnerAnim("OFF")}
                <section className={`status-container ${!canceled && USER?.result?.stripe ? USER?.result?.stripe.plan : plan}`}>
                    <h3 className="sub-title">
                        <span className="subscription">Subscription</span> to <span className="plan-choosen">{!canceled && USER?.result?.stripe ? USER?.result?.stripe.plan : plan}</span> Plan
                    </h3>
                    <div className={`status-message ${!canceled && USER?.result?.stripe ? USER?.result?.stripe.plan : plan}`}>
                        {success && (
                            plan === USER?.result?.stripe?.plan && ((isNotFreePlan && sessionId) || !activePlan)
                                ? <>Successfully activated!</>
                                : <>Active!</>
                        )}
                        {canceled && <>Cancelled payment</>}
                    </div>
                    <p className="cancel-hint">Subscription can be managed anytime from your profile.</p>
                </section>
                {showRedirectLink ?
                    <p className="redirect-hint">
                        <span className="like-a-link" onClick={initiateRedirect}>click here</span> to redirect to home page.
                    </p>
                    : <div className="spinner-container"><div className="spinner" /></div>
                }
            </article>
            : toggleSpinnerAnim("OFF") || <Navigate to="/pricing" />
    )
}
export default PaymentStatus