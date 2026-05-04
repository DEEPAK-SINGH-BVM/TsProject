import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_ERROR,
  UPDATE_ADDRESS,
  UPDATE_PROFILE_IMAGE,
  // CREATE_SHOP,
} from "./constant";

const initialState = {
  user: null,
  token: null,
  shop: null,
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
        // shop: action.payload.shop || null,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
      case "LOGOUT_CLEAR":
        return {
          user: null,
          token: null,
          shop: null,
        };
      // case CREATE_SHOP:
      //   return {
      //     ...state,
      //     shop: action.payload,
      //     error: null,
      //   };
    default:  
      return state;
  }
};

export default authReducer;
