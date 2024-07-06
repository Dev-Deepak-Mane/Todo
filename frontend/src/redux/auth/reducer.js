import * as types from "./actionTypes";

const TOKEN = localStorage.getItem("token");
const initialState = {
  isAuth: false,
  userData: null,
  isAuthLoading: false,
  isAuthError: false,
  AuthMessage: "",
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return { ...state, isAuthLoading: true };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        AuthMessage: payload.message,
        isAuth: true,
        isAuthError: false,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        AuthMessage: payload.message,
        isAuth: false,
        isAuthError: true,
      };
    case types.USER_REGISTER_REQUEST:
      return { ...state, isAuthLoading: true };
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        AuthMessage: payload.message,
        isAuth: true,
        isAuthError: false,
      };

    case types.USER_REGISTER_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        AuthMessage: payload.message,
        isAuth: false,
        isAuthError: true,
      };

    case types.USER_PROFILE_REQUEST:
      return { ...state, isAuthLoading: true };
    case types.USER_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        AuthMessage: payload.message,
        isAuth: true,
        userData: payload.user,
        isAuthError: false,
      };

    case types.USER_PROFILE_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        AuthMessage: payload.message,
        isAuth: false,
        isAuthError: true,
        userData: null,
      };

    case types.USER_LOGOUT:
      return {
        isAuthLoading: false,
        AuthMessage: payload.message,
        isAuth: false,
        isAuthError: false,
        userData: null,
      };
    default:
      return state;
  }
}
