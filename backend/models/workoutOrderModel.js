import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutOrderModel = new Schema(
  {
    workoutsOrder: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true, collection: "workout-orders" }
);

export default mongoose.model("WorkoutOrder", workoutOrderModel);
