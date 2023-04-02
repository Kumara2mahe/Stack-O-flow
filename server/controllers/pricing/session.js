import { createStripeCheckoutSession, createStripeBillingPortalSession } from "../../pricing/index.js"
import { getUserById } from "../user.js"

export const createCheckoutSession = async (req, res) => {
    const { plan, customerId, returnUrl } = req.body
    try {
        const { url } = await createStripeCheckoutSession(plan, customerId, returnUrl)
        res.status(200).json({ url })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createBillingPortalSession = async (req, res) => {
    const { id, returnUrl } = req.body
    try {
        const user = await getUserById(id)
        const { url } = await createStripeBillingPortalSession(user.stripe._cus_id, returnUrl)
        res.status(200).json({ url })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}