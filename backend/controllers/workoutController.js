import WorkoutModel from "../models/WorkoutModel.js";
import { RESP_CODE } from "../common/respCode.js";
import mongoose from "mongoose";
import { WORKOUT_ERR_MSG } from "../common/errMsg.js";

// Get all workouts
export async function getAllWorkouts(req, res) {
  try {
    const workouts = await WorkoutModel.find({})?.sort({ createdAt: -1 }); // Descended order
    res.status(RESP_CODE.SUCCESS).json(workouts);
  } catch (error) {
    console.log("Get all workout err: ", error);
    res.status(RESP_CODE.ERROR).json({ error: error.message });
  }
}

// Get single workout
export async function getSingleWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RESP_CODE.NOT_FOUND)
      .json({ error: WORKOUT_ERR_MSG.NOT_FOUND });
  }

  try {
    const workout = await WorkoutModel.findById(id);
    if (!workout) {
      return res
        .status(RESP_CODE.NOT_FOUND)
        .json({ error: WORKOUT_ERR_MSG.NOT_FOUND });
    }
    res.status(RESP_CODE.SUCCESS).json(workout);
  } catch (error) {
    console.log("Get single workout err: ", error);
    res.status(RESP_CODE.ERROR).json({ error: error.message });
  }
}

// Create new workout
export async function createWorkout(req, res) {
  const { title, load, reps } = req.body;

  try {
    const workout = await WorkoutModel.create({ title, load, reps });
    res.status(RESP_CODE.SUCCESS).json(workout);
  } catch (error) {
    console.log("Create workout err: ", error);
    res.status(RESP_CODE.ERROR).json({ error: error.message });
  }
}
