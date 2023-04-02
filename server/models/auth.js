import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    about: { type: String, default: "" },
    tags: { type: [String], default: [] },
    since: { type: Number, default: Date.now },
    stripe: {
        plan: { type: String, default: "free" },
        limit: {
            qCount: { type: Number, default: 2 },
            aCount: { type: Number, default: 1 },
            till: { type: Number, default: new Date().setHours(23, 59, 59) }
        },
        _cus_id: { type: String },
        _sub_id: { type: String },
        _pause_webhook_reset: { type: Boolean, default: false }
    }
})

export default mongoose.model("User", userSchema)