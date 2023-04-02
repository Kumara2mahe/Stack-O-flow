import { getUserById } from "../user.js"
import { deleteStripeSubscription } from "../../pricing/index.js"

export const deleteSubscription = async (req, res) => {
    const { id } = req.params
    try {
        const user = await getUserById(id)
        const subscription = await deleteStripeSubscription(user.stripe._sub_id)
        res.status(200).json(subscription)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}