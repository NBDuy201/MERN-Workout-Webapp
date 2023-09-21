/* eslint-disable react/prop-types */
import React from "react";
import { useQueryClient } from "react-query";
import { workoutApi } from "~/api/workoutApi";
import { RESP_CODE } from "~/config/respCode";
import { reactQueryKey } from "~/utils/fetch";

const formFields = {
  TITLE: "title",
  LOAD: "load",
  REPS: "reps",
};

const defFormVal = {
  [formFields.TITLE]: "",
  [formFields.LOAD]: "",
  [formFields.REPS]: "",
};

const WorkoutForm = () => {
  // const [title, setTitle] = React.useState("");
  // const [load, setLoad] = React.useState("");
  // const [reps, setReps] = React.useState("");
  const [formData, setFormData] = React.useState(defFormVal);
  const [err, setErr] = React.useState("");
  const [emptyFields, setEmptyFiels] = React.useState([]);

  const queryClient = useQueryClient();

  function resetForm() {
    setFormData(defFormVal);
    setErr("");
  }

  function handleChangeField(value, field) {
    setFormData((prv) => ({ ...prv, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const { title, load, reps } = formData;
    console.log(
      "🚀 ~ file: WorkoutForm.jsx:13 ~ onSubmit ~ workout:",
      formData
    );

    try {
      const resp = await workoutApi.createWorkout(title, load, reps);
      console.log("🚀 ~ file: WorkoutForm.jsx:18 ~ onSubmit ~ resp:", resp);
      if (resp.status !== RESP_CODE.SUCCESS) {
        setErr(resp.error);
        setEmptyFiels(resp.emptyFields);
        return;
      }
      queryClient.invalidateQueries({ queryKey: reactQueryKey.WORKOUT_LIST });
      resetForm();
    } catch (error) {
      console.log("🚀 ~ file: WorkoutForm.jsx:18 ~ onSubmit ~ error:", error);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-y-4 bg-white rounded-md shadow-md p-4"
      >
        <h3 className="mb-2">Add New Workout</h3>
        <InputField
          label="Exercise title"
          name={formFields.TITLE}
          value={formData.title}
          onChange={(e) => handleChangeField(e.target.value, formFields.TITLE)}
          isErr={emptyFields.includes(formFields.TITLE)}
        />
        <InputField
          label="Load (kg)"
          type="number"
          name={formFields.LOAD}
          value={formData.load}
          onChange={(e) => handleChangeField(e.target.value, formFields.LOAD)}
          isErr={emptyFields.includes(formFields.LOAD)}
        />
        <InputField
          label="Reps"
          type="number"
          name={formFields.REPS}
          value={formData.reps}
          onChange={(e) => handleChangeField(e.target.value, formFields.REPS)}
          isErr={emptyFields.includes(formFields.REPS)}
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
  value = "",
  onChange = () => {},
  isErr = false,
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className={`${isErr ? "text-red-500" : ""}`}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        className={`border rounded-md p-1 
        ${isErr ? "border border-red-500" : ""}`}
        onChange={onChange}
      />
    </div>
  );
};

export default WorkoutForm;
