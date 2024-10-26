const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// middleware function to require authorization for protected routes
const requireAuth = async (req, res, next) => {
  // extract the authorization header from the request headers
  const { authorization } = req.headers

  // verify user is authenticated
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  // split the header to get the token (format: "Bearer <token>")
  const token = authorization.split(' ')[1]

  try {
    // verify the token using the secret key from environment variables
    const { _id } = jwt.verify(token, process.env.SECRET)

    // find the user by their _id and attach the user object to the request
    req.user = await User.findOne({ _id }).select('_id') // select only the user ID 
    
    // proceed to the next middleware or route handler
    next()

  } catch (error) {
    // console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth