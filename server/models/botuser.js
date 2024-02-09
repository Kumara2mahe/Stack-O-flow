import mongoose from "mongoose"

const botUserSchema = {
    uUid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expireOn: { type: Number, required: true },
    attempts: { type: Number, default: 3 },
    verified: { type: Boolean, default: false }
}

export default mongoose.model("BotUser", botUserSchema)