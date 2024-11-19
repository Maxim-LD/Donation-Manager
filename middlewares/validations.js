const Users = require('../models/userSchema')

const validEmail = (email)=>{

    const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return checkEmail.test(String(email).toLowerCase())
}

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

    const { firstName, lastName, email, designation, password} = req.body

    const errors = []

    if(!(firstName && lastName)){
        errors.push("Please enter your firstname and lastname!")
    }

    if(!email){
        errors.push("Please enter your email!")
    }else if(!validEmail(email)){
        errors.push("Incorrect email format!")
    }

    if(!designation){
        errors.push("Indicate your designation!")
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
}

module.exports = {
    validEmail,
    validPassword,
    validateRegistration
}