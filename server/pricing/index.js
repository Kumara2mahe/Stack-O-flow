import Stripe from "stripe"

import { getUserByEmail, updateUserPlan } from "../controllers/user.js"
import { getPlanId, getPlanName, FREE, getPlanLimits } from "../utils/index.js"

export const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export const createStripeCustomer = async (name, email) => {
    try {
        const customer = await stripe.customers.create({ name, email })
        return customer
    } catch (error) {
        throw error
    }
}

export const createStripeCheckoutSession = async (plan, customerId, returnUrl) => {
    try {
        const planName = String(plan).toLowerCase()
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{
                price: getPlanId(planName),
                quantity: 1
            }],
            customer: customerId,
            success_url: `${returnUrl}?success=true&plan=${planName}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${returnUrl}?canceled=true&plan=${planName}`,
        })
        return session
    } catch (error) {
        throw error
    }
}

export const createOrUpdateSubscription = async (invoiceId) => {
    try {
        const { subscription, lines, customer, customer_email } = await stripe.invoices.retrieve(invoiceId)
        const user = await getUserByEmail(customer_email)
        if (user.stripe._sub_id) {
            await stripe.subscriptions.del(user.stripe._sub_id)
        }
        const newPlan = getPlanName(lines.data[0].price.id)
        const stripeObj = {
            plan: newPlan,
            limit: getPlanLimits(newPlan),
            _cus_id: customer,
            _sub_id: subscription,
            _pause_webhook_reset: user.stripe._sub_id !== undefined
        }
        await updateUserPlan(user._id, stripeObj)
    }
    catch (error) {
        throw error
    }
}

export const resetUserPlan = async (invoiceId) => {
    try {
        const { customer_email } = await stripe.invoices.retrieve(invoiceId)
        const user = await getUserByEmail(customer_email)
        if (user.stripe._pause_webhook_reset) {
            await updateUserPlan(user._id, { ...user.stripe, _pause_webhook_reset: false })
        }
        else await updateUserPlan(user._id, { plan: FREE, limit: getPlanLimits(FREE), _cus_id: user.stripe._cus_id, _pause_webhook_reset: false })
    }
    catch (error) {
        throw error
    }
}

export const createStripeBillingPortalSession = async (customerId, returnUrl) => {
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        })
        return portalSession
    }
    catch (error) {
        throw error
    }
}

export const deleteStripeSubscription = async (id) => {
    try {
        const subscription = await stripe.subscriptions.del(id)
        return subscription
    } catch (error) {
        throw error
    }
}