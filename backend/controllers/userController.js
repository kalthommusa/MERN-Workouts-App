const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })  
}

// signup a new user
const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // call the signup static method to create a new user
    const user = await User.signup(email, password)

    // create a token using the user's _id
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // call the login static method to authenticate the user
    const user = await User.login(email, password)

    // create a token using the user's _id
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }