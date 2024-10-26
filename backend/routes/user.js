const express = require('express')

// controller functions for user authentication actions
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

// signup route to register a new user
router.post('/signup', signupUser)

// login route to log in an existing user
router.post('/login', loginUser)

module.exports = router