import * as api from "../api"

export const createCheckoutSession = (plan, userData, returnPath) => async () => {
    try {
        const { data: customerData } = await api.createOrGetCustomer({ name: userData.name, email: userData.email })
        const { data } = await api.createCheckoutSession({
            plan, customerId: customerData.id, returnUrl: process.env.REACT_APP_CLIENT_URL + returnPath
        })
        return data
    } catch (error) {
        throw error
    }
}

export const cancelPaidSubscription = (id) => async () => {
    try {
        await api.cancelSubscription(id)
    }
    catch (error) {
        throw error
    }
}

export const createBillingPortalSession = (id, returnPath) => async () => {
    try {
        const { data } = await api.createBillingPortalSession({ id, returnUrl: process.env.REACT_APP_CLIENT_URL + returnPath })
        return data
    } catch (error) {
        throw error
    }
}