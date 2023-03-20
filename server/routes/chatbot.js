import express from "express"

import auth from "../middlewares/auth.js"
import { sendOtp, verifyOtp } from "../controllers/chatbot/authentication.js"
import { getBotReply } from "../controllers/chatbot/messages.js"

const router = express.Router()

router.post("/sendotp", auth, sendOtp)
router.post("/verifyotp", auth, verifyOtp)
router.post("/reply", auth, getBotReply)

export default router