import {
    LOGIN_USER,
    SIGNUP_USER,
    LOGOUT_USER,
    AUTH_ERROR,
  } from "./constant";
  
  const initialState = {
    user: null,
    token: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case LOGIN_USER:
      case SIGNUP_USER:
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          error: null,
        };
  
      case LOGOUT_USER:
        return {
          user: null,
          token: null,
          error: null,
        };
  
      case AUTH_ERROR:
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;