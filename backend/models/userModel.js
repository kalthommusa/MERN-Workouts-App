const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

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

// static signup method to create a new user
userSchema.statics.signup = async function(email, password) {

  // validations
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use')
  }

  // hash the password using bcrypt and a generated salt
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  // create a new user document with the email and hashed password
  const user = await this.create({ email, password: hash })

  return user
}

// static login method to authenticate the user
userSchema.statics.login = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  // search for the user by email 
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  // compare the provided password with the hashed stored password
  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)