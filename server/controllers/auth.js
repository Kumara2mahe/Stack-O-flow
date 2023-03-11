import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import users from "../models/auth.js"

export const signup = async (req, res) => {
    const { name, email, password, avatar } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(404).json({ message: "User already exists" })
        }
        const salt = await bcrypt.genSalt()
        const hashedPwd = await bcrypt.hash(password, salt)
        const newUser = await users.create({ name, email, avatar, password: hashedPwd })
        res.status(200).json({
            result: { _id: newUser._id, avatar, name },
            token: generateToken(newUser)
        })
    } catch (error) {
        res.status(500).json("Something went wrong..")
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exists" })
        }
        const pwdMatched = await bcrypt.compare(password, existingUser.password)
        if (!pwdMatched) {
            return res.status(400).json({ message: "Invalid credentials." })
        }
        res.status(200).json({
            result: {
                _id: existingUser._id,
                avatar: existingUser.avatar,
                name: existingUser.name
            },
            token: generateToken(existingUser)
        })
    } catch (error) {
        res.status(500).json("Something went wrong..")
    }
}

const generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" })
}