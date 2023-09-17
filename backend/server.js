import express from "express";
import "dotenv/config";

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

// Listen to request
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
