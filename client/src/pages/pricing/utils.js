import { showError } from "../../components/showRequestError/ShowRequestError"
import { parseErrorResText } from "../../utils/form"
import PRICING from "./pricing-plans.json"

export const getPlanName = (type) => {
    let planName
    switch (type) {
        case PRICING.plans[2].type:
            planName = PRICING.plans[2].name
            break
        case PRICING.plans[1].type:
            planName = PRICING.plans[1].name
            break
        default:
            planName = PRICING.plans[0].name
            break
    }
    return planName.toLowerCase()
}

export const handleCatchedError = (error, navigate, loginPage) => {
    let errMsg = error.message
    switch (error?.response?.request?.status) {
        case 401:
            navigate(loginPage)
            break
        case 400:
            errMsg = parseErrorResText(error, error.message)
            showError(errMsg)
            break
        default:
            showError(errMsg)
            break
    }
}

export const PAID_PLANS = ["silver", "gold"]