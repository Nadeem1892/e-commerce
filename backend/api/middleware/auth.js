const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
try {
    const token = req.cookies?.accessToken || req?.header?.authorization?.split(" ")[1] /// ["Bearer","token"]
    
    if (!token) {
        return res.status(401).send({
            message: "Provide token",
            status: false
        })
    }
    const decode = await jwt.verify(token, process.env.TOKEN_SECRET)
    if (!decode) {
        return res.status(401).send({
            message: "unauthorized access",
            status: false
        })
    }

    req.userId = decode.id

    next()

} catch (error) {
    console.log(error)
    return res.status(500).send({
        message: error.message || error,
        status: false
    })
}
}

module.exports = auth