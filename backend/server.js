import express from "express";
import "dotenv/config";

// Routes files
import workoutRoutes from "./routes/workout.js";
import { ROUTES } from "./common/constants.js";

// Express app
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ mssg: "Welcom to the app" });
});

app.use(ROUTES.WORKOUT, workoutRoutes);

// Listen to request
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
