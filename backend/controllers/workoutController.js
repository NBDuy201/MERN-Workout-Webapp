import WorkoutModel from "../models/WorkoutModel.js";
import { RESP_CODE } from "../common/respCode.js";
import mongoose from "mongoose";
import { WORKOUT_ERR_MSG } from "../common/errMsg.js";

// Get all workouts
export async function getAllWorkouts(req, res) {
  try {
    const workouts = await WorkoutModel.find({})?.sort({ createdAt: -1 }); // Descended order
    res
      .status(RESP_CODE.SUCCESS)
      .json({ status: RESP_CODE.SUCCESS, data: workouts });
  } catch (error) {
    console.log("Get all workout err: ", error);
    res
      .status(RESP_CODE.ERROR)
      .json({ status: RESP_CODE.ERROR, error: error.message });
  }
}

// Get single workout
export async function getSingleWorkout(req, res) {
  const { id } = req.params;

  // Check valid id
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

  // Check empty
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res.status(RESP_CODE.ERROR).json({
      status: RESP_CODE.ERROR,
      emptyFields,
      error: "Please fill in all the fields",
    });
  }

  try {
    const workout = await WorkoutModel.create({ title, load, reps });
    res
      .status(RESP_CODE.SUCCESS)
      .json({ status: RESP_CODE.SUCCESS, data: workout });
  } catch (error) {
    console.log("Create workout err: ", error);
    res
      .status(RESP_CODE.ERROR)
      .json({ status: RESP_CODE.ERROR, error: error.message });
  }
}

// Delete single workout
export async function deleteWorkout(req, res) {
  const { id } = req.params;

  // Check valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RESP_CODE.NOT_FOUND)
      .json({ error: WORKOUT_ERR_MSG.NOT_FOUND });
  }

  try {
    const workout = await WorkoutModel.findByIdAndDelete(id);
    if (!workout) {
      return res.status(RESP_CODE.NOT_FOUND).json({
        status: RESP_CODE.NOT_FOUND,
        error: WORKOUT_ERR_MSG.NOT_FOUND,
      });
    }
    res
      .status(RESP_CODE.SUCCESS)
      .json({ status: RESP_CODE.SUCCESS, data: workout });
  } catch (error) {
    console.log("Delete single workout err: ", error);
    res
      .status(RESP_CODE.ERROR)
      .json({ status: RESP_CODE.ERROR, error: error.message });
  }
}

// Update single workout
export async function updateWorkout(req, res) {
  const { id } = req.params;

  // Check valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RESP_CODE.NOT_FOUND)
      .json({ error: WORKOUT_ERR_MSG.NOT_FOUND });
  }

  try {
    const workout = await WorkoutModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) {
      return res
        .status(RESP_CODE.NOT_FOUND)
        .json({ error: WORKOUT_ERR_MSG.NOT_FOUND });
    }
    res.status(RESP_CODE.SUCCESS).json(workout);
  } catch (error) {
    console.log("Updae single workout err: ", error);
    res.status(RESP_CODE.ERROR).json({ error: error.message });
  }
}
