/* eslint-disable react/prop-types */
import { formatDistanceToNow } from "date-fns";
import { FaTrash } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { workoutApi } from "~/api/workoutApi";
import { RESP_CODE } from "~/config/respCode";
import { reactQueryKey } from "~/utils/fetch";

const WorkoutDetails = ({ workout }) => {
  const queryClient = useQueryClient();

  async function delteWorkout() {
    try {
      const resp = await workoutApi.deleteWorkout(workout._id);
      console.log(
        "🚀 ~ file: WorkoutDetails.jsx:14 ~ delteWorkout ~ resp:",
        resp
      );

      if (resp.status !== RESP_CODE.SUCCESS) {
        console.log("Delete err");
        return;
      }
      queryClient.invalidateQueries({ queryKey: reactQueryKey.WORKOUT_LIST });
    } catch (error) {
      console.log(
        "🚀 ~ file: WorkoutDetails.jsx:10 ~ delteWorkout ~ error:",
        error
      );
    }
  }

  return (
    <div className="workout-details bg-white p-4 rounded-md shadow-md relative">
      <button
        onClick={delteWorkout}
        className="absolute top-4 right-4 text-red-500 hover:opacity-70"
      >
        <FaTrash />
      </button>
      <h3 className="mb-2 text-primary">{workout.title}</h3>
      <p className="text-sm">
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p className="text-sm">
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p className="text-sm">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default WorkoutDetails;
