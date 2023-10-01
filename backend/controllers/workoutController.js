import WorkoutModel from "../models/WorkoutModel.js";
import WorkoutOrderModel from "../models/workoutOrderModel.js";
import { RESP_CODE } from "../common/respCode.js";
import mongoose from "mongoose";
import { WORKOUT_ERR_MSG } from "../common/errMsg.js";
import { getWorkoutsOrder } from "../utils/workoutHelper.js";

// Get all workouts
export async function getAllWorkouts(req, res) {
  try {
    const unSortWorkouts = await WorkoutModel.find({}); // Descended order

    const { workoutsOrder } = await getWorkoutsOrder();

    // Create workouts order array if not exists
    if (!workoutsOrder || !workoutsOrder?.length === 0) {
      return res.status(RESP_CODE.ERROR).json({ status: RESP_CODE.ERROR });
    } else {
      const sortedWorkouts = [...unSortWorkouts].sort(
        (a, b) =>
          workoutsOrder.indexOf(a?._id?.toString()) -
          workoutsOrder.indexOf(b?._id?.toString())
      );

      return res
        .status(RESP_CODE.SUCCESS)
        .json({ status: RESP_CODE.SUCCESS, data: sortedWorkouts });
    }
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
    const { _id: workoutsOrderId, workoutsOrder } = await getWorkoutsOrder();

    // Create workouts order array if not exists
    if (!workoutsOrder || workoutsOrder?.length === 0) {
      await WorkoutOrderModel.create({
        workoutsOrder: [workout.id],
      });
    } else {
      // Push new workout to workouts order
      await WorkoutOrderModel.findByIdAndUpdate(workoutsOrderId, {
        $push: { workoutsOrder: workout._id.toString() },
      });
    }

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
    const { _id, workoutsOrder } = await getWorkoutsOrder();
    if (!workout) {
      return res.status(RESP_CODE.NOT_FOUND).json({
        status: RESP_CODE.NOT_FOUND,
        error: WORKOUT_ERR_MSG.NOT_FOUND,
      });
    }

    // Update workouts order
    const updatedWorkoutsOrder = workoutsOrder.filter(
      (item) => item !== workout?._id?.toString()
    );
    await WorkoutOrderModel.findByIdAndUpdate(_id, {
      workoutsOrder: updatedWorkoutsOrder,
    });
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

// Update workout order
export async function updateWorkoutOrder(req, res) {
  const { workoutsOrder } = req.body;

  // Check valid data
  if (!workoutsOrder || workoutsOrder?.length === 0) {
    return res.status(RESP_CODE.ERROR).json({ error: WORKOUT_ERR_MSG.ERROR });
  }

  // Check valid all ids valid
  const isAllIdValid = workoutsOrder.every((item) => {
    if (!mongoose.Types.ObjectId.isValid(item)) {
      return false;
    }
    return true;
  });
  if (!isAllIdValid) {
    return res
      .status(RESP_CODE.NOT_FOUND)
      .json({ error: WORKOUT_ERR_MSG.NOT_FOUND });
  }

  // Process data
  try {
    const { _id } = await getWorkoutsOrder();
    const resp = await WorkoutOrderModel.findByIdAndUpdate(_id, {
      workoutsOrder,
    });
    if (!resp) {
      return res
        .status(RESP_CODE.NOT_FOUND)
        .json({ error: WORKOUT_ERR_MSG.NOT_FOUND });
    }
    res.status(RESP_CODE.SUCCESS).json({
      status: RESP_CODE.SUCCESS,
      data: { workoutsOrder: resp.workoutsOrder },
    });
  } catch (error) {
    console.log("Update workouts order err: ", error);
    res.status(RESP_CODE.ERROR).json({ error: error.message });
  }
}
