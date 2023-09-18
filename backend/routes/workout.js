import express from "express";

const router = express.Router();

// Get all workouts
router.get("/", (req, res) => {
  res.json({ msg: "Get all workouts" });
});

// Get single workout
router.get("/:id", (req, res) => {
  res.json({ msg: "Get single workouts" });
});

// Post a new workout
router.post("/", (req, res) => {
  res.json({ msg: "Post single workouts" });
});

// Delete single workout
router.delete("/:id", (req, res) => {
  res.json({ msg: "Delete single workouts" });
});

// Update single workout
router.put("/:id", (req, res) => {
  res.json({ msg: "Update single workouts" });
});

export default router;
