import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import userRoutes from "./routes/user.js"
import questionRoutes from "./routes/questions.js"
import answerRoutes from "./routes/answer.js"
import botRoutes from "./routes/chatbot.js"

const app = express()
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
dotenv.config()

app.get("/", (req, res) => {
    res.send("Welcome to Stack O-flow API, developed by Mahendra Kumara")
})

app.use("/user", userRoutes)
app.use("/questions", questionRoutes)
app.use("/answer", answerRoutes)
app.use("/bot", botRoutes)

const PORT = process.env.PORT || 5500

mongoose.set("strictQuery", true)
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log("Stack O-flow server is running on port:" + PORT))
    })
    .catch(err => console.log(err.message))
