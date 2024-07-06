import * as types from "./actionTypes";
import axios from "axios";

export const userRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_REGISTER_REQUEST });

    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/users/new`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log('res: ', res);

    dispatch({
      type: types.USER_REGISTER_SUCCESS,
      payload: {
        message: res.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAILURE,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

export const userLogin = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGIN_REQUEST });

    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/login`,
      payload,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: {
        message: res.data.message,
      },
    });
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: types.USER_LOGIN_FAILURE,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: types.USER_PROFILE_REQUEST });
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/users/me`,
      {
        withCredentials: true,
      }
    );
    // console.log(res);

    dispatch({
      type: types.USER_PROFILE_SUCCESS,
      payload: { user: res.data.user },
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: types.USER_PROFILE_FAILURE,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

export const userLogout = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/logout`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: types.USER_LOGOUT,
        payload: { message: res.data.message },
      });
      console.log(res.data.message);
    })
    .catch((error) => console.log(error));
};
