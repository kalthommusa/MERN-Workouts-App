require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

// create express app
const app = express()

// middleware to parse JSON
app.use(express.json())

// middleware to log request details
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// define routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB & listening on port ${PORT}...`)
    })
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error)
  })