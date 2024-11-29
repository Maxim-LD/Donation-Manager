const express = require('express')
const authController = require('../controllers/authController')
const { validateRegistration, validateLogin } = require('../middlewares/validations')
const { validateAuthToken } = require('../middlewares/validateAuth')

const router = express.Router()

router.post("/create_user", validateRegistration, authController.createUser)
router.post("/login", validateLogin, authController.userLogin)
router.post("/login_auth", validateAuthToken, authController.verifyAuthToken)
router.get("/users_list", authController.userList)

module.exports = router