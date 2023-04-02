export const FREE = "free", STANDARD = "standard", PREMIUM = "premium", NOLIMIT = "nolimit"

export const getPlanLimits = (plan, oldLimit) => {
    let limit = null
    switch (plan) {
        case PREMIUM:
            return limit
        case STANDARD:
            limit = { qCount: 10, aCount: 5 }
            break
        default:
            limit = { qCount: 2, aCount: 1 }
            break
    }
    limit.till = new Date().setHours(23, 59, 59)
    if (oldLimit && oldLimit.till > Date.now()) {
        limit = oldLimit
    }
    return limit
}

export const getPlanId = (plan) => {
    switch (plan) {
        case PREMIUM:
            return process.env.PREMIUM_PLAN
        case STANDARD:
            return process.env.STANDARD_PLAN
        default:
            return null
    }
}

export const getPlanName = (id) => {
    switch (id) {
        case process.env.PREMIUM_PLAN:
            return PREMIUM
        case process.env.STANDARD_PLAN:
            return STANDARD
        default:
            return FREE
    }
}