const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// function to create a JWT token for the given user ID
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })  
}

// controller function to signup a new user
const signupUser = async (req, res) => {
  try {
    // destructure email and password from request body
    const { email, password } = req.body
    const user = await User.signup(email, password)
    const token = createToken(user._id)
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      emptyFields: error.emptyFields
    })
  }
}

// controller function to log in an existing user
const loginUser = async (req, res) => {
  try {
    // destructure email and password from request body
    const { email, password } = req.body
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      emptyFields: error.emptyFields
    })
  }
}

module.exports = { signupUser, loginUser }
