const Users = require("../models/userSchema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { registrationEmail } = require("../utilities/emailService");

const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body

  try {
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" })
    }
    const checkUser = await Users.findOne({ email })

    if (checkUser) {
      return res.status(400).json({
        message: "User already exists!",
      })
    }

    //for organizer
    const generateOrganizerId = () => {
      const timestamp = Date.now().toString();
      const randomString = Math.random().toString(36).substring(2, 8);
      return `ORG-${timestamp}-${randomString}`
    }

    //for donor
    const generateUserId = () => {
      const timestamp = Date.now().toString();
      const randomString = Math.random().toString(36).substring(2, 8);
      return `USR-${timestamp}-${randomString}`
    }

    const uniqueId =
      role.toLowerCase() === "organizer"
        ? generateOrganizerId()
        : generateUserId()

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      uniqueId,
    })

    await newUser.save();
    await registrationEmail(email)

    return res.status(201).json({
      message: "Account created successfully!",
      user: newUser,
    })
  } catch (error) {
    return res.status(500).json({ error: "An error occurred!" });
  }
}

const userLogin = async (req, res) => {
  
  try {
    
    const { email, password } = req.body

    const userExist = await Users.findOne({ email })

    if (!userExist) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const checkPassword = await bcrypt.compare(password, userExist.password)

    if (!checkPassword) {
      return res.status(400).json({
        message: "Incorrect password or email!",
      })
    }

    const accessToken = jwt.sign(
      { id: userExist.uniqueId, role: userExist.role },
      `${process.env.ACCESS_TOKEN}`,
      {expiresIn: "1m"}
    )

    return res.status(200).json({
        message: "Login successfully!",
        accessToken
    })
      
  } catch (error) {}
}

const verifyAuthToken = async (req, res)=> {

    return res.status(200).json({
        message: "Token verified successfully!",
        user: req.user
    })
}

const userList = async (req, res) => {
  try {
    const users = await Users.find()

    if (users.length === 0) {
      return res.status(400).json({
        message: "No user on the database",
      })
    }

    return res.status(200).json({
      count: users.length,
      message: "Success!",
      users,
    })
  } catch (error) {}
}

module.exports = {
  createUser,
  userLogin,
  verifyAuthToken,
  userList,
};
