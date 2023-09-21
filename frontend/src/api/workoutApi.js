import { API_PATH } from "~/config/apiPath";
import { handleDelete, handleGet, handlePost } from "~/utils/fetch";

export const workoutApi = {
  getWorkouts: async () => {
    try {
      const res = await handleGet(API_PATH.WORKOUTS_BASE);
      return res;
    } catch (error) {
      console.log("🚀 ~ file: workoutApi.js:13 ~ getWorkouts: ~ error:", error);
    }
  },
  createWorkout: async (title = "", load = 0, reps = 0) => {
    try {
      const workout = { title, load, reps };
      const res = await handlePost(API_PATH.WORKOUTS_BASE, workout);
      return res;
    } catch (error) {
      console.log(
        "🚀 ~ file: workoutApi.js:18 ~ createWorkout: ~ error:",
        error
      );
    }
  },
  deleteWorkout: async (workoutId) => {
    try {
      const res = await handleDelete(API_PATH.WORKOUTS_BASE, workoutId);
      return res;
    } catch (error) {
      console.log(
        "🚀 ~ file: workoutApi.js:31 ~ deleteWorkout: ~ error:",
        error
      );
    }
  },
};
