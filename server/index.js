import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import userRoutes from "./routes/user.js"
import questionRoutes from "./routes/questions.js"
import answerRoutes from "./routes/answer.js"
import botRoutes from "./routes/chatbot.js"
import pricingRoutes from "./routes/pricing.js"
import stripeWebHookEndpoint from "./pricing/stripeWebhook.js"

const app = express()
app.use("/stripe-webhook", express.raw({ type: "application/json" }), stripeWebHookEndpoint)
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to Stack O-flow API, developed by Mahendra Kumara")
})

// All Routes
app.use("/user", userRoutes)
app.use("/questions", questionRoutes)
app.use("/answer", answerRoutes)
app.use("/bot", botRoutes)
app.use("/pricing", pricingRoutes)

// MongoDb Connection
mongoose.set("strictQuery", true)
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const PORT = process.env.PORT || 5500
        app.listen(PORT, () => console.log("Stack O-flow server is running on port:" + PORT))
    })
    .catch(err => console.log(err.message))