const express = require('express')
const userController = require('../controllers/userController')
const { validateRegistration } = require('../middlewares/validations')

const router = express.Router()

router.post("/create_user", validateRegistration, userController.createUser)
router.get("/users_list", userController.userList)

module.exports = router