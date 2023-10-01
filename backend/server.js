import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

// Routes files
import workoutRoutes from "./routes/workout.js";
import { ROUTES } from "./common/constants.js";

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ mssg: "Welcom to the app" });
});

app.use(ROUTES.WORKOUT, workoutRoutes);

// Connect to MongoDb
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "workouts-mern-app",
    });
    // Listen to request
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to db & listening on http://localhost:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log("MongoDb connection error:", error);
  }
})();
