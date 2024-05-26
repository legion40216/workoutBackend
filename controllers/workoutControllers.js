const Workout = require('../modals/WorkoutModal')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) =>{
  const workouts = await Workout.find({}).sort({createAt:-1}) 

  res.status(200).json(workouts)
} 

// get single workout
const getWorkout = async (req, res) =>{
const { id } = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error: "no such workout"})
}

const workout = await Workout.findById(id)

if(!workout){
  return res.status(404).json({error: "no such workout"})
}

res.status(200).json(workout)
}

// create new workout
const createNewWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    let emptyFields = []

    if(!title){
     emptyFields.push('title')
    }
    if(!load){
      emptyFields.push('load')
    }
    if(!reps){
      emptyFields.push('reps')
    }
    if(emptyFields.length > 0)
    {
      return res.status(400).json ({error:"please fill in all the fields", emptyFields})
    }
    //add doc db
    try{
     const workout = await Workout.create({title, load, reps})
     res.status(200).json(workout)
    }
    catch (error){
      res.status(400).json ({error:error.message})
    }

}


// delete workout

const deleteWorkout = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such workout"})
  }

  try{
    const workout = await Workout.findByIdAndDelete({_id: id})
    res.status(200).json(workout)
  }
  catch{
    res.status(400).json ({error:error.message})
  }

}


// update workout
const updateWorkout = async (req, res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such workout"})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!workout){
    return res.status(400).json({error:"No such workout"})
  }
  res.status(200).json(workout)
}

module.exports = {
    getWorkouts, 
    getWorkout,  
    createNewWorkout,
    deleteWorkout,
    updateWorkout
}