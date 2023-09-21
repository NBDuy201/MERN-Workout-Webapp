import { useQuery } from "react-query";
import { workoutApi } from "~/api/workoutApi";
import WorkoutDetails from "~/components/WorkoutDetails";
import WorkoutForm from "~/components/WorkoutForm";
import { reactQueryKey } from "~/utils/fetch";

const Home = () => {
  const { data: workouts, isFetching } = useQuery(
    reactQueryKey.WORKOUT_LIST(),
    () => workoutApi.getWorkouts()
  );
  console.log("🚀 ~ file: Home.jsx:8 ~ Home ~ workouts:", workouts);

  return (
    <div className="page-container my-4 flex gap-x-4">
      <div className="workout-list w-3/4 flex flex-col gap-y-4">
        {isFetching
          ? "Loading..."
          : workouts?.data?.map((item) => (
              <WorkoutDetails key={item._id} workout={item} />
            ))}
      </div>
      <div className="flex-1 self-start sticky top-[calc(116px+1rem)]">
        <WorkoutForm />
      </div>
      {/* <h2>Home</h2> */}
    </div>
  );
};

export default Home;
