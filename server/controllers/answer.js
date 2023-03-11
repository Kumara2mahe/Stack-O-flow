import questions from "../models/question.js"

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params
    const { body, by } = req.body
    try {
        const question = await questions.findById(_id)
        if (!question) {
            return res.status(404).json({ message: "Requested Post unavailable" })
        }
        const updatedPost = await questions.findByIdAndUpdate(_id, {
            $addToSet: {
                answers: [
                    { body, by }
                ]
            }
        })
        res.status(200).json(updatedPost)
    }
    catch (error) {
        res.status(400).json(error)
    }
}

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params
    const { ansUid, uUid } = req.body
    try {
        const question = await questions.findById(_id)
        if (!question) {
            return res.status(404).json({ message: "Requested Post unavailable" })
        }
        const answers = question.answers.filter((ans) => ans._id.toString() === ansUid && ans.by.uUid === uUid)
        if (answers.length <= 0) {
            return res.status(404).json({ message: "Permission denied or may be 'Answer' is unavailable." })
        }
        await questions.updateOne({ _id }, {
            $pull: {
                answers: { _id: ansUid }
            }
        })
        res.status(200).json({ message: "Post deleted successfully." })
    }
    catch (error) {
        res.status(200).json({ message: error.message })
    }
}