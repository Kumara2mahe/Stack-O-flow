import { stripe, createOrUpdateSubscription, resetUserPlan } from "./index.js"

const stripeWebHookEndpoint = async (req, res) => {
    let event = req.body
    const signature = req.headers["stripe-signature"]
    const endPointSecret = process.env.DEV === "true" ? process.env.STRIPE_LOCAL_ENDPOINT_SECRET : process.env.STRIPE_HOSTED_ENDPOINT_SECRET
    try {
        event = await stripe.webhooks.constructEvent(
            req.body,
            signature,
            endPointSecret
        )
    } catch (error) {
        console.log("⚠️  Webhook signature verification failed.\n⚠️  Check the env file and enter the correct webhook secret.")
        console.log(`Error Message: ${error.message}`)
        return res.status(400).send()
    }
    const dataObject = event.data.object
    try {
        switch (event.type) {
            case "payment_intent.succeeded":
                await createOrUpdateSubscription(dataObject.invoice)
                break
            case "customer.subscription.deleted":
                await resetUserPlan(dataObject.latest_invoice)
                break
            default:
        }
        res.status(200).send()
    }
    catch (error) {
        console.log("⚠️ ", error.message)
        res.status(500).send()
    }
}
export default stripeWebHookEndpoint