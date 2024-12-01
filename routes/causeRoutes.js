const express = require('express')
const causeController = require('../controllers/causeController')
const { validateCauseCreation } = require('../middlewares/validations')

const router = express.Router()

router.post("/create_cause", validateCauseCreation, causeController.createCause)

module.exports =  router

