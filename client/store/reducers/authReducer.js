import { AUTHENTICATE, SIGNOUT_AUTH, SIGNUP_AUTH, SIGNIN_AUTH } from "../actionTypes";
import { HYDRATE } from "next-redux-wrapper";

const authReducer = (state = { token: null, isSignedin: false, isLoggedin: false }, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case AUTHENTICATE:
      return { ...state, token: action.payload, isLoggedin: true };
    case SIGNUP_AUTH:
      return { ...state, token: action.payload, isSignedin: true, isLoggedin: false };
    case SIGNIN_AUTH:
      return { ...state, token: action.payload, isSignedin: true, isLoggedin: true };
    case SIGNOUT_AUTH:
      return { token: null, isSignedin: true, isLoggedin: false };
    default:
      return state;
  }
};

export default authReducer;
