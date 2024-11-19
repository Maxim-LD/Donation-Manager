const Users = require('../models/userSchema')
const nodemailer = require('nodemailer')
require('dotenv').config()





const registrationEmail = async (email) => {

    try {

        const checkUser = await Users.findOne({email})
        const name = `${checkUser.firstName} ${checkUser.lastName}`

        const now = new Date()
        const formattedDate = now.toLocaleDateString()
        const formattedTime = now.toLocaleTimeString()

        const mailTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_KEY}`
            }
        })

        const sentObject = {
            from: process.env.EMAIL,
            to: email,
            subject: "ACCOUNT CREATION SUCCESSFUL",
            html: `<div>
                    <h1>Congratulations!, you have successfully created an account on the Maxim Foundation Donation Platform</h1>
                    <br>
                    <h2>Check below for you details</h2>
                    <br>
                    <h3>Fullname: ${name}</h3>
                    <h3>Designation: ${checkUser.designation}</h3>
                    <h3>UniqueId: ${checkUser.uniqueId}</h3>
                    <h3>Date: ${formattedDate}
                    <h3>Time: ${formattedTime}
                    <br>
                    <br>
                    
                    <h4>Thank you for making a difference.</h4>
              
                </div>`
        }
        await mailTransport.sendMail(sentObject)

    } catch (error) {
        console.log(error)
    }

    console.log("Email sent successfully!")
}

module.exports = {

    registrationEmail
}