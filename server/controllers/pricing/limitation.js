import users from "../../models/auth.js"
import { getPlanLimits } from "../../utils/index.js"

export const updateLimitation = async (user) => {
    try {
        const limit = getPlanLimits(user.stripe.plan, user.stripe.limit)
        if (limit !== user.stripe.limit) {
            user = await users.findByIdAndUpdate(user._id, {
                $set: { stripe: { ...user.stripe, limit } }
            }, { new: true })
        }
        return user
    }
    catch (error) {
        throw error
    }
}