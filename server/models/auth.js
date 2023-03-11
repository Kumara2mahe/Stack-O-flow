import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    about: { type: String, default: "" },
    tags: { type: [String], default: [] },
    since: { type: String, default: Date.now },
})

export default mongoose.model("User", userSchema)