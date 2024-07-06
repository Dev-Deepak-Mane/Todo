import * as types from "./actionTypes";
import axios from "axios";

export const getTasks = () => (dispatch) => {
  try {
    dispatch({ type: types.GET_TASK_REQUEST });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: types.GET_TASK_SUCCESS, payload: res.data.tasks });
      });
  } catch (error) {
    dispatch({ type: types.GET_TASK_FAILURE });
  }
};
