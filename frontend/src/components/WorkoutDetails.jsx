/* eslint-disable react/prop-types */

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details bg-white p-4 rounded-md shadow-md">
      <h3 className="mb-2 text-primary">{workout.title}</h3>
      <p className="text-sm">
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p className="text-sm">
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p className="text-sm">{workout.createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
