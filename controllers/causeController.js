const Users = require("../models/userSchema")
const Causes = require("../models/causeSchema")

const createCause = async (req, res)=>{

    try {
        const { title, description, goalAmount, uniqueId } = req.body

        if (!title || !description || !goalAmount || !uniqueId) {
          return res.status(400).json({ message: "All fields are required!" })
        }

        const generateCauseId = () => {
        const timestamp = Date.now().toString();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `COZ-${timestamp}-${randomString}`
        }

        const newCause = new Causes({
          title,
          description,
          goalAmount,
          causeId: generateCauseId(),
          organizer: uniqueId,
          createdAt: new Date()
        })
        
        await newCause.save()

        return res.status(201).json({
            message: "Cause created successfully!",
            cause: newCause
        })
        
        console.log(`Cause: ${newCause.title} by ${organizer}`)

    } catch (error) {
         return res.status(500).json({ 
            message: "Internal server error", error: error.message 
        })

    }

}

module.exports = {
    createCause
}