const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts for a specific user
const getWorkouts = async (req, res) => {
  try{
    // extract the user id from the authenticated user's request object (set by middleware)
    const user_id = req.user._id

    // fetch workouts that belong to the authenticated user and sort them by creation date (newest first)
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})

    // respond with the workouts
    res.status(200).json(workouts)
  } catch(error) {
    // handle any errors that occur
    res.status(500).json({error: error.message})
  }
}

// Get a single workout
const getWorkout = async (req, res) => {
  try {
    // extract the workout id from request parameters
    const { id } = req.params

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Invalid workout ID'})
    }

    // fetch the workout by its id
    const workout = await Workout.findById(id) 

    // check if null workout
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
      }

    // respond with the workout 
    res.status(200).json(workout) 
  } catch(error) {
    // handle any errors that occur
    res.status(500).json({error: error.message}) 
  }
}

// POST a new workout
const createWorkout = async (req, res) => {
  try {
    // destructure the workout data from the request body
    const {title, load, reps} = req.body

    // array to keep track of any empty fields (for client-side validation)
    let emptyFields = []

    // check for empty fields and add them to the emptyFields array
    if(!title) {
      emptyFields.push('title')
    }
    if(!load) {
      emptyFields.push('load')
    }
    if(!reps) {
      emptyFields.push('reps')
    }

    // include an error message and the list of empty fields for frontend validation
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'All fields must be filled', emptyFields })
    }

    // extract the user id from the authenticated user's request object (set by middleware)
    const user_id = req.user._id

    // create a new workout document in the database, linking it to the authenticated user
    const workout = await Workout.create({title, load, reps, user_id})

    // respond with the created workout
    res.status(200).json(workout)
  } catch (error) {
    // handle any errors that occur
    res.status(500).json({error: error.message})
  }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
  try { 
    // extract the workout id from request parameters
    const { id } = req.params

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    // const workout = await Workout.findOneAndDelete({_id: id})

    // find and delete the workout by its id
    const workout = await Workout.findByIdAndDelete(id)
  
    // check if null workout
    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    // respond with the deleted workout
    res.status(200).json(workout)
  } catch (error) {
    // handle any errors that occur
    res.status(500).json({error: error.message})
  }
}

// Update a workout
const updateWorkout = async (req, res) => {
  try {
    // extract the workout id from request parameters
    const { id } = req.params

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    // const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body })

    // update the workout and return the updated document
    const workout = await Workout.findByIdAndUpdate(id, {...req.body}, { new: true })
  
    // check if null workout
    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    // respond with the updated workout
    res.status(200).json(workout)
  } catch (error) {
    // handle any errors that occur
    res.status(500).json({error: error.message})
  }
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}