import { getUserByEmail } from "../user.js"
import { createStripeCustomer } from "../../pricing/index.js"

export const createOrGetCustomer = async (req, res) => {
    const { name, email } = req.body
    try {
        const user = await getUserByEmail(email)
        let customerId = user.stripe._cus_id
        if (!customerId) {
            const { id } = await createStripeCustomer(name, email)
            customerId = id
        }
        res.status(200).json({ id: customerId })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}