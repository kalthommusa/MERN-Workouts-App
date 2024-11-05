const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static method to handle user signup
userSchema.statics.signup = async function(email, password) {

  // validations

  // track empty email and password fields
  const emptyFields = []
  if (!email) {
    emptyFields.push('email')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (emptyFields.length > 0) {
    throw { message: 'All fields must be filled', emptyFields }
  }

  // track invalid email
  const notValidEmail = []
  if (!validator.isEmail(email)) {
    notValidEmail.push('email')
  }
  if (notValidEmail.length > 0) {
    throw { message: 'Email not valid', emptyFields: notValidEmail }
  }

  // track weak password
  const notStrongPassword = []
  if (!validator.isStrongPassword(password)) {
    notStrongPassword.push('password')
  }
  if (notStrongPassword.length > 0) {
    throw { message: 'Password not strong enough', emptyFields: notStrongPassword }
  }

  // track duplicate email
  const notUniqueEmail = []
  const userExists = await this.findOne({ email })
  if (userExists) {
    notUniqueEmail.push('email')
  }
  if (notUniqueEmail.length > 0) {
    throw { message: 'Email already in use', emptyFields: notUniqueEmail }
  }

  // hash the password with salt before saving
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  // create and return the new user
  const user = await this.create({ email, password: hash })
  return user
}

// static method to handle user login
userSchema.statics.login = async function(email, password) {

    // validations

    // track empty email and password fields
    const emptyFields = []
    if (!email) {
      emptyFields.push('email')
    }
    if (!password) {
      emptyFields.push('password')
    }
    if (emptyFields.length > 0) {
      throw { message: 'All fields must be filled', emptyFields }
    }

  // search for the user by email 
  const user = await this.findOne({ email })

  // track invalid email
  const notValidEmail = []
  if (!user) {
    notValidEmail.push('email')
  }
  if (notValidEmail.length > 0) {
    throw { message: 'Incorrect email', emptyFields: notValidEmail }
  }

  // compare the provided password with the hashed stored password
  const match = await bcrypt.compare(password, user.password)

  // track invalid password
  const notValidPassword = []
  if (!match) {
    notValidPassword.push('password')
  }
  if (notValidPassword.length > 0) {
    throw { message: 'Incorrect password', emptyFields: notValidPassword }
  }

  // return the authenticated user
  return user
}

module.exports = mongoose.model('User', userSchema)