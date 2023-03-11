import express from "express"

import auth from "../middlewares/auth.js"
import { askQuestion, getAllQuestions, voteQuestion, deleteQuestion } from "../controllers/questions.js"

const router = express.Router()

router.post("/ask", auth, askQuestion)
router.get("/get", getAllQuestions)
router.patch("/vote/:id", auth, voteQuestion)
router.patch("/delete/:id", auth, deleteQuestion)

export default router