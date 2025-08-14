const jwt = require("jsonwebtoken")
require("dotenv").config()

const authentication = async (req,res,next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
       return res.status(404).json({
            success: false,
            error: "no token provided"
        })
    }

    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decodedTokenInfo)
        req.userInfo = decodedTokenInfo
        next()
        
    } catch (e) {
        return res.status(404).json({
            success: false,
            error: e.message
        })
    }
  
}
module.exports = authentication

