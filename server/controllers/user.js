import users from "../models/auth.js"

export const getAllUsers = async (req, res) => {
    try {
        const allUserDetails = await users.find({}, {
            _id: 1, name: 1, avatar: 1, about: 1, tags: 1, since: 1
        })
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params
    const { name, about, tags, uUid } = req.body
    if (_id !== uUid) {
        return res.status(404).json({ message: "Only account owner can update their profile." })
    }
    else if (name == "") {
        return res.status(400).json({ message: "Display Name can't be empty" })
    }
    try {
        const user = await users.findById(_id)
        if (!user) {
            return res.status(404).json({ message: "User doesn't exists" })
        }
        const profile = await users.findByIdAndUpdate(_id, {
            $set: { name, about, tags }
        }, { new: true })
        res.status(200).json(profile)
    }
    catch (error) {
        res.status(405).json({ message: error.message })
    }
}