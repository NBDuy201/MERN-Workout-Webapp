/* eslint-disable react/prop-types */
import React from "react";
import { workoutApi } from "~/api/workoutApi";
import { RESP_CODE } from "~/config/respCode";

const WorkoutForm = () => {
  const [title, setTitle] = React.useState("");
  const [load, setLoad] = React.useState(0);
  const [reps, setReps] = React.useState(0);
  const [err, setErr] = React.useState("");
  console.log("🚀 ~ file: WorkoutForm.jsx:11 ~ WorkoutForm ~ err:", err);

  function resetForm() {
    setTitle("");
    setLoad(0);
    setReps(0);
    setErr("");
  }

  async function onSubmit(e) {
    e.preventDefault();

    const workout = { title, load, reps };
    console.log("🚀 ~ file: WorkoutForm.jsx:13 ~ onSubmit ~ workout:", workout);

    try {
      const resp = await workoutApi.createWorkout(title, load, reps);
      console.log("🚀 ~ file: WorkoutForm.jsx:18 ~ onSubmit ~ resp:", resp);
      if (resp.status !== RESP_CODE.SUCCESS) {
        setErr(resp.error);
        return;
      }
      resetForm();
    } catch (error) {
      console.log("🚀 ~ file: WorkoutForm.jsx:18 ~ onSubmit ~ error:", error);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-y-2 bg-white rounded-md shadow-md p-4"
      >
        <h3 className="mb-2">Add New Workout</h3>
        <InputField
          label="Exercise title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="Load (kg)"
          type="number"
          name="load"
          onChange={(e) => setLoad(e.target.value)}
        />
        <InputField
          label="Reps"
          type="number"
          name="reps"
          onChange={(e) => setReps(e.target.value)}
        />

        <button
          type="submit"
          className="bg-primary text-white rounded-md p-2 mt-2 self-start"
        >
          Add workout
        </button>
      </form>
      {err ? (
        <div className="bg-red-100 text-red-400 p-4 border border-red-500 rounded-md mt-4">
          {err}
        </div>
      ) : null}
    </>
  );
};

const InputField = ({
  label = "",
  type = "text",
  name = "",
  onChange = () => {},
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        className="border rounded-md p-1"
        onChange={onChange}
      />
    </div>
  );
};

export default WorkoutForm;
