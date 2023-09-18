import express from "express";
import {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

// Get all workouts
router.get("/", getAllWorkouts);

// Get single workout
router.get("/:id", getSingleWorkout);

// Post a new workout
router.post("/", createWorkout);

// Delete single workout
router.delete("/:id", (req, res) => {
  res.json({ msg: "Delete single workouts" });
});

// Update single workout
router.put("/:id", (req, res) => {
  res.json({ msg: "Update single workouts" });
});

export default router;
