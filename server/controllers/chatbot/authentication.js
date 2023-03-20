import jwt from "jsonwebtoken"

import { sendOtpAsMail } from "../../chatbot/index.js"
import botusers from "../../models/botuser.js"

export const sendOtp = async (req, res) => {
    const { email, name: username, sitelink } = req.body
    try {
        const otp = generateOTP()
        await sendOtpAsMail(email, { otp, username, sitelink })
            .then(async () => {
                const verifyDetails = await createVerificationToken(email, otp)
                res.status(200).json(verifyDetails)
            })
            .catch((error) => {
                res.status(400).json({ message: error?.message ? error.message : error })
            })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const generateOTP = (length = 6) => {
    const DIGITS = "0123456789"
    let otp = ""
    for (let i = 0; i < length; i++) {
        otp += DIGITS[Math.floor(Math.random() * DIGITS.length)]
    }
    return otp
}

const createVerificationToken = async (email, otp) => {
    const now = Date.now()
    const expireOn = now + (1000 * validFor)
    const token = generateToken(email)
    const allBotUsers = await botusers.find()
    const otherBotUsers = allBotUsers.filter(cred => cred.email !== email)

    // Dumping expired data
    otherBotUsers.forEach(cred => (cred.expireOn < now || cred.attempts < 1 || cred.verified) && cred.delete())
    if (otherBotUsers.length !== allBotUsers.length) {
        const currentBotUser = await botusers.findOneAndUpdate({ email }, {
            $set: { otp, expireOn, attempts: 3, verified: false }
        }, { new: true })
        return {
            verified: currentBotUser.verified,
            attempts: currentBotUser.attempts,
            email, token
        }
    }
    else {
        const newCred = await botusers.create({ email, otp, expireOn })
        return {
            verified: newCred.verified,
            attempts: newCred.attempts,
            email, token
        }
    }
}

export const verifyOtp = async (req, res) => {
    const { email, userotp } = req.body
    try {
        const existingBotUser = await botusers.findOne({ email })
        if (!existingBotUser) {
            return res.status(404).json({ message: "Otp sent expired, try again!" })
        }
        else if (existingBotUser.verified || existingBotUser.attempts < 1 || existingBotUser.expireOn < Date.now()) {
            existingBotUser.delete()
            return res.status(401).json({ message: "Otp sent expired or invalid, try to generate newone" })
        }
        else if (existingBotUser.otp !== userotp) {
            const updatedBotUser = await botusers.findOneAndUpdate({ email }, {
                $set: { attempts: existingBotUser.attempts - 1 }
            }, { new: true })
            if (updatedBotUser.attempts > 0) {
                return res.status(200).json({
                    result: { attempts: updatedBotUser.attempts },
                    message: `Otp doesn't match, only ${updatedBotUser.attempts} attempts left`
                })
            }
            else return res.status(400).json({
                result: { attempts: updatedBotUser.attempts },
                message: "Otp doesn't match, all attempts failed."
            })
        }
        const verifiedBotUser = await botusers.findOneAndUpdate({ email }, {
            $set: { verified: true }
        }, { new: true })
        res.status(200).json({
            result: { verified: verifiedBotUser.verified, token: generateToken(email), email },
            message: `Otp matched and verified!`
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: validFor })
}
const validFor = 60 * 30 // 30 minutes