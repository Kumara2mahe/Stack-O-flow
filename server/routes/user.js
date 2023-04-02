import express from "express"

import auth from "../middlewares/auth.js"
import { signup, login } from "../controllers/auth.js"
import { getAllUsers, getUser, updateProfile } from "../controllers/user.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)

router.get("/all", getAllUsers)
router.get("/get/:id", auth, getUser)
router.patch("/update/:id", auth, updateProfile)

export default router