import axios from "axios";

export const handlePost = async (api, data) => {
  try {
    const resp = await axios.post(api, data);
    return resp.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const handleGet = async (api) => {
  try {
    const resp = await axios.get(api);
    return resp.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const handlePatch = async (api, data) => {
  try {
    const resp = await axios.patch(api, data);
    return resp.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const handleDelete = async (api, id) => {
  try {
    const resp = await axios.delete(`${api}/${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const reactQueryKey = {
  WORKOUT_LIST: (workoutId) =>
    workoutId ? ["workoutList", workoutId] : ["workoutList"],
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
