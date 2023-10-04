import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

// Routes files
import workoutRoutes from "./routes/workout.js";
import { ROUTES } from "./common/constants.js";

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      `http://127.0.0.1:${process.env.VITE_APP_FRONTEND_PORT}`,
      `${process.env.VITE_APP_PRODUCTION_DOMAIN}`,
    ],
  })
);

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
    app.listen(process.env.VITE_APP_BACKEND_PORT, () => {
      console.log(
        `Connected to db & listening on http://localhost:${process.env.VITE_APP_BACKEND_PORT}`
      );
    });
  } catch (error) {
    console.log("MongoDb connection error:", error);
  }
})();
