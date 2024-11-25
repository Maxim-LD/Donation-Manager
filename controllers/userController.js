const Users = require('../models/userSchema')
const bcrypt = require('bcrypt')
const { registrationEmail } = require('../utilities/emailService')



const createUser = async (req, res) => {

    const { firstName, lastName, email, password, designation } = req.body

    try {

            if (!firstName || !lastName || !email || !password || !designation) {
                return res.status(400).json({ error: 'All fields are required' })
            }
            const checkUser = await Users.findOne({email})

            if(checkUser){
                return res.status(400).json({
                    message: "User already exists!"
                })
            }
            
            //for organizer
            const generateId = () => {
                const timestamp = Date.now().toString();
                const randomString = Math.random().toString(36).substring(2, 8);
                return `ORG-${timestamp}-${randomString}`;
                }
            
            //for donor
            const generateuserId = () => {
                const timestamp = Date.now().toString();
                const randomString = Math.random().toString(36).substring(2, 8);
                return `USR-${timestamp}-${randomString}`;
                }

            const uniqueId = designation.toLowerCase() === 'organizer' ? generateId() : generateuserId();

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new Users({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                designation,
                uniqueId
                
            })

            await newUser.save()
            await registrationEmail(email)

            return res.status(200).json({
                message: "Account created successfully!",
                user: newUser        
            })

    } catch (error) {
            return res.status(500).json({error: 'An error occurred!' })
    }
}

const userList = async (req, res)=>{

    try {
        const users = await Users.find()

        if(users.length === 0){
            return res.status(400).json({
                message: "No user on the database"
            })
        }

        return res.status(200).json({

            count: users.length,
            message: "Success!", 
            users
        })
    } catch (error) {
        
    }
    
}



module.exports = {
    createUser,
    userList
}