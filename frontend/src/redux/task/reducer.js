import * as types from "./actionTypes";

const TOKEN = localStorage.getItem("token");
const initialState = {
  tasks: [],
  isTaskLoading: false,
  isTaskError: false,
  isTask: false,
};

export default function taskReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_TASK_REQUEST:
      return { ...state, isTaskLoading: true };
    case types.GET_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload,
        isTaskLoading: false,
        isTaskError: false,
        isTask: true,
      };
    case types.GET_TASK_FAILURE:
      return {
        ...state,
        isTaskLoading: false,
        isTaskError: true,
        isTask: false,
      };
    default:
      return state;
  }
}
