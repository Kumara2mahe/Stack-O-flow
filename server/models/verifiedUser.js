import mongoose from "mongoose"

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"]
    },
    verified: {
        type: Boolean,
        default: false,
    }
}, {
    _id: false,
    timestamps: true
})

const verifiedUserSchema = new mongoose.Schema({
    uUid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    login: {
        type: emailSchema,
        required: true
    },
    alternates: [emailSchema]
})

const VerifiedUser = mongoose.models.VerifiedUser || mongoose.model("VerifiedUser", verifiedUserSchema)
export default VerifiedUser