import questions from "../models/question.js"
import users from "../models/auth.js"
import { updateLimitation } from "./pricing/limitation.js"

export const askQuestion = async (req, res) => {
    const postedQuestion = req.body
    const newPost = new questions(postedQuestion)
    try {
        let user = await users.findById(postedQuestion.by.uUid)
        user = await updateLimitation(user)
        const HAS_LIMIT = user.stripe.limit.toObject()
        if (HAS_LIMIT && user.stripe.limit.qCount <= 0) {
            return res.status(403).json({ message: "Daily question limit exceeded! Upgrade plan or Try again later." })
        }
        await newPost.save()
        if (HAS_LIMIT) {
            await users.findByIdAndUpdate(user._id, {
                $set: {
                    stripe: {
                        ...user.stripe, limit: { ...user.stripe.limit, qCount: user.stripe.limit.qCount - 1 }
                    }
                }
            })
        }
        res.status(200).json({ message: "Question Posted Successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(409).json({ message: "Something went wrong, while posting question." })
    }
}

export const getAllQuestions = async (req, res) => {
    try {
        let questionList
        if (req.query?.sortby === "new") {
            questionList = await questions.find().sort({ "on": -1 })
        }
        else {
            questionList = await questions.find().sort({ "votes": -1 })
        }
        res.status(200).json(questionList)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params
    const { type, uUid } = req.body
    try {
        const question = await questions.findById(_id)
        if (!question) {
            return res.status(404).json({ message: "Requested Post unavailable" })
        }
        const userId = String(uUid)
        const uIndex = question.votes.uvs.findIndex(id => id === userId)
        const dIndex = question.votes.dvs.findIndex(id => id === userId)
        if (type === "up-vote") {
            if (dIndex !== -1) {
                question.votes.dvs.splice(dIndex, 1)
            }
            if (uIndex === -1) {
                question.votes.uvs.push(userId)
            }
            else question.votes.uvs.splice(uIndex, 1)
        }
        else if (type === "down-vote") {
            if (uIndex !== -1) {
                question.votes.uvs.splice(uIndex, 1)
            }
            if (dIndex === -1) {
                question.votes.dvs.push(userId)
            }
            else question.votes.dvs.splice(dIndex, 1)
        }
        question.votes.count = question.votes.uvs.length - question.votes.dvs.length
        await questions.findByIdAndUpdate(_id, {
            $set: { votes: question.votes }
        })
        res.status(200).json({ message: "Voted successfully.." })
    }
    catch (error) {
        res.status(200).json({ message: error.message })
    }
}

export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params
    const { uUid } = req.body
    try {
        const question = await questions.findById(_id)
        if (!question) {
            return res.status(404).json({ message: "Requested Post unavailable" })
        }
        else if (question.by.uUid !== uUid) {
            return res.status(400).json({ message: "Only authors can delete their post." })
        }
        await questions.findByIdAndDelete(_id)
        res.status(200).json({ message: "Post deleted successfully." })
    }
    catch (error) {
        res.status(200).json({ message: error.message })
    }
}