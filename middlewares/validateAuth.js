const jwt = require('jsonwebtoken')


const validateAuthToken = async (req, res, next)=>{
    
    //saving the token after separation from bearer
    const token = req.header("Authorization")?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }
    try {
        const decodedToken = jwt.verify(token, `${process.env.ACCESS_TOKEN}`)
        req.user = decodedToken

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
}


module.exports = {
    validateAuthToken
}