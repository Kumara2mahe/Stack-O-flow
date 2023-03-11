import mongoose from "mongoose"

const authorSchema = {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    uUid: { type: String, required: true },
}

const questionSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: { type: [String], required: true },
    votes: {
        count: { type: Number, default: 0 },
        uvs: { type: [String], default: [] },
        dvs: { type: [String], default: [] },
    },
    by: authorSchema,
    on: { type: Number, default: Date.now },
    answers: [{
        body: { type: String, required: true },
        by: authorSchema,
        on: { type: Number, default: Date.now },
    }]
})

export default mongoose.model("Question", questionSchema)