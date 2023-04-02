import express from "express"

import auth from "../middlewares/auth.js"
import { createOrGetCustomer } from "../controllers/pricing/customer.js"
import { createCheckoutSession, createBillingPortalSession } from "../controllers/pricing/session.js"
import { deleteSubscription } from "../controllers/pricing/subscription.js"

const router = express.Router()

router.post("/customer/create", auth, createOrGetCustomer)
router.post("/checkout-session/create", auth, createCheckoutSession)
router.post("/billing-portal-session/create", auth, createBillingPortalSession)
router.delete("/subscription/:id", auth, deleteSubscription)

export default router