import { authActionTypes } from "../constants/Auth.ActionTypes";

const initialState = {
  authUser: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      console.log("case--Login");
      return {
        ...state,
        authUser: action.payload,
      };
    case authActionTypes.SIGNUP:
      console.log("case--Signup");
      return {
        ...state,
        authUser: action.payload,
      };
    case authActionTypes.VERIFY_EMAIL:
      console.log("case--Verify");
      return {
        ...state,
        authUser: action.payload,
      };
    case authActionTypes.LOGOUT:
      console.log("case--Logout");
      return {
        ...state,
        authUser: null,
      };
    case authActionTypes.RESET_PASSWORD:
      console.log("case--reset");
      return {
        ...state,
        authUser: null,
      };
    case authActionTypes.SET_USER:
      return {
        ...state,
        authUser: action.payload,
      };
    default:
      return state;
  }
};
