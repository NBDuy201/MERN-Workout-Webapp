import WorkoutOrderModel from "../models/workoutOrderModel.js";

export async function getWorkoutsOrder() {
  const workoutsOrderResp = await WorkoutOrderModel.find({});
  const { workoutsOrder, _id } = workoutsOrderResp[0];

  return { _id: _id.toString(), workoutsOrder };
}
