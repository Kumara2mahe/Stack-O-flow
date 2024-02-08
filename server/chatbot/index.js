import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"

import TRANSPORT from "./transport-config.js"

const TRANSPORTER = nodemailer.createTransport(TRANSPORT)
const mailConfigs = {
    from: `"Stack O-flow" ${TRANSPORT.auth.user}`,
    subject: "Verification Code for ChatBot",
}

const template = fs.readFileSync(path.join(process.cwd(), "chatbot/template.html"), { encoding: "utf8" })
const renderTemplate = ({ otp, username, sitelink }) => {
    return template.replace(/{% OTP %}/g, otp).replace(/{% WEBSITE_LINK %}/g, sitelink).replace(/{% USER_NAME %}/g, username)
}

export const sendOtpAsMail = async (to, data) => {
    try {
        mailConfigs.to = to
        mailConfigs.html = renderTemplate(data)
        await TRANSPORTER.sendMail(mailConfigs)
            .then((info) => {
                console.log(`Email sent [${new Date().toJSON()}]: ${info.messageId}`)
            })
            .catch(() => {
                throw new Error("Bad Request: 400").message = "Couldn't sent OTP to your Email"
            })
    }
    catch (error) {
        throw error
    }
}