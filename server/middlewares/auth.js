import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decodedData?.id

        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export default auth