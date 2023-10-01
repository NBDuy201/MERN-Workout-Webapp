import express from "express";
import {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
  updateWorkoutOrder,
} from "../controllers/workoutController.js";

const router = express.Router();

// Get all workouts
router.get("/", getAllWorkouts);

// Get single workout
router.get("/:id", getSingleWorkout);

// Post a new workout
router.post("/", createWorkout);

// Delete single workout
router.delete("/:id", deleteWorkout);

// Update single workout
router.patch("/:id", updateWorkout);

// Update workouts order
router.post("/workout-order", updateWorkoutOrder);

export default router;
