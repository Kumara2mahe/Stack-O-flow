import { NlpManager } from "node-nlp"
import path from "path"

const manager = new NlpManager({ languages: ["en"] })
manager.load(path.join(process.cwd(), "model.nlp"))

export const getBotReply = async (req, res) => {
    const { message } = req.body
    try {
        const { answer } = await manager.process("en", message)
        res.status(200).json(answer)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}