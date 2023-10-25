import users from "../models/auth.js"
import { updateLimitation } from "./pricing/limitation.js"

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

export const getUser = async (req, res) => {
    const { id: _id } = req.params
    try {
        let user = await users.findById(_id)
        if (!user) {
            return res.status(404).json({ message: "User doesn't exists" })
        }
        user = await updateLimitation(user)
        res.status(200).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            stripe: {
                plan: user.stripe.plan,
                limit: user.stripe.limit
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserByEmail = async (email) => {
    try {
        const user = await users.findOne({ email })
        if (!user) {
            throw new Error("Bad Request: 400").message = "User doesn't exists"
        }
        return user
    }
    catch (error) {
        throw error
    }
}

export const getUserById = async (id) => {
    try {
        const user = await users.findById(id)
        if (!user) {
            throw new Error("Bad Request: 400").message = "User doesn't exists"
        }
        return user
    }
    catch (error) {
        throw error
    }
}

export const updateUserPlan = async (id, stripe) => {
    try {
        await users.findByIdAndUpdate(id, {
            $set: { stripe }
        })
    }
    catch (error) {
        throw error
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
            $set: { name, about: about.trim(), tags }
        }, { new: true })
        res.status(200).json(profile)
    }
    catch (error) {
        res.status(405).json({ message: error.message })
    }
}