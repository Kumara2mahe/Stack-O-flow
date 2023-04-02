import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import PriceCard from "../../components/pricecard/PriceCard"
import ShowRequestError from "../../components/showRequestError/ShowRequestError"
import { toggleSpinnerAnim, capitialize } from "../../utils"
import { createCheckoutSession, cancelPaidSubscription } from "../../actions/pricing"
import { getPlanName, handleCatchedError, PAID_PLANS } from "./utils"
import PRICING from "./pricing-plans.json"
import "./pricing.css"

const Pricing = () => {
    const USER = useSelector(state => state.currentUserReducer)

    const [searchParams] = useSearchParams()
    const cancel_redirect_id = searchParams.get("cancel_redirect_id")
    cancel_redirect_id && clearInterval(parseInt(cancel_redirect_id))

    const location = useLocation().pathname
    const LOGINPAGE = `/auth?next=${window.encodeURIComponent(location)}`
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChoice = (e) => {
        const PLAN_NAME = getPlanName(e.target.id)
        const IS_ACTIVE_PLAN = e.target.parentElement.parentElement.classList.contains("active")
        const IS_NOT_FREE_PLAN = PAID_PLANS.includes(e.target.id)
        const REDIRECT_PATH = `${location}/status?success=true&plan=${PLAN_NAME}`
        if (!(USER?.result)) {
            navigate(LOGINPAGE)
        }
        else if (!IS_ACTIVE_PLAN) {
            toggleSpinnerAnim()
            if (IS_NOT_FREE_PLAN) {
                dispatch(createCheckoutSession(PLAN_NAME, USER?.result, `${location}/status`))
                    .then(data => window.location.href = data.url)
                    .catch(error => handleCatchedError(error, navigate, LOGINPAGE))
                    .finally(() => toggleSpinnerAnim())
            }
            else {
                dispatch(cancelPaidSubscription(USER?.result?._id))
                    .then(() => navigate(REDIRECT_PATH))
                    .catch(error => handleCatchedError(error, navigate, LOGINPAGE))
                    .finally(() => toggleSpinnerAnim())
            }
        }
        else navigate(REDIRECT_PATH + "&active_plan=true")
    }
    document.title = `Pricing ${USER?.result?.stripe?.plan ? `- ${capitialize(USER?.result?.stripe?.plan)} plan (active)` : ""} - Stack O-flow`
    return (
        <article className="pricing-contents">
            <section className="wrapper">
                <div className="pricing-header">
                    <h1 className="page-heading header-item">Membership Plans</h1>
                    <p className="sub-title header-item">Expand your access to gain more knowledge from asking and answer questions.</p>
                </div>
                <div id="pricing-plans">
                    {PRICING.plans.map(plan => (
                        <PriceCard key={plan.type}
                            type={plan.type} activePlan={USER?.result?.stripe?.plan} name={plan.name} symbol={<>&#8377;</>} price={plan.price}
                            benefits={plan.benefits} btnLabel={plan.button} onClick={handleChoice}
                        />
                    ))}
                </div>
            </section>
            <ShowRequestError />
        </article>
    )
}
export default Pricing