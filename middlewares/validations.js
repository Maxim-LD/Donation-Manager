const Users = require("../models/userSchema")
const Causes = require("../models/causeSchema")
const validator = require('validator')


const validPassword = (password)=>{

    const hasAlphanumeric = /[a-zA-Z0-9]/
    const hasSymbol = /[^a-zA-Z0-9]/
    const minLength = 8

    return (
        hasAlphanumeric.test(password) &&
        hasSymbol.test(password) &&
        password.length >= minLength
      )
}

const validateRegistration = async (req, res, next)=>{

    const { firstName, lastName, email, role, password} = req.body

    const errors = []

    try {
        if(!(firstName && lastName)){
            errors.push("Please enter your firstname and lastname!")
        }

        if(!email){
            errors.push("Please enter your email!")
        }else if(!validator.isEmail(email)){
            errors.push("Incorrect email format!")
        }

        if(!role){
            errors.push("Indicate your role!")
        }

        if(!password){
            errors.push("Enter a password!")
        } else if(!validPassword(password)){
            errors.push("Incorrect password format!")
        }

        if(errors.length > 0){
            return res.status(400).json({message: errors})
        }

        next()

    } catch (error) {
        console.log(errors)
    }
}
    

const validateLogin = async (req, res, next)=>{

    const { email, password } = req.body

    const errors = []

    try {
        if (!email) {
        errors.push("Please enter your email!")
        } else if (!validator.isEmail(email)) {
        errors.push("Incorrect email format!")
        }

        if(!password) {
            errors.push("Please enter password!")
        }

        if(errors.length > 0){
            return res.status(400).json({
                message: errors
            })
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

const validateCauseCreation = async (req, res, next)=> {

    const { uniqueId } = req.body
    const organizer = await Users.findOne({ uniqueId, role: "organizer" })


    const errors = []
    try {

         if (!uniqueId) {
           return res.status(400).json({
            message: "uniqueId is required!"
           })
         } 
        
          if (!organizer) {
            return res.status(403).json({
              message: "Forbidden request, the uniqueId provided does not belong to any organizer!",
            })
          }

          if (errors.length > 0) {
            return res.status(400).json({
              message: errors,
            })
          }

        next()
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    validPassword,
    validateRegistration,
    validateLogin,
    validateCauseCreation
}