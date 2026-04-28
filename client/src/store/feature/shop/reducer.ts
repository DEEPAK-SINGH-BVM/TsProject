import {
  CREATE_SHOP,
  GET_SHOP,
} from "./constant";

const initialState = {
  shop: null,
  error: null,
};

const shopReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SHOP:
      return {
        ...state,
        shop: action.payload,
        error: null,
      };
      case CREATE_SHOP:
        return {
          ...state,
          shop: action.payload,
          error: null,
        };
    default:
      return state;
  }
};

export default shopReducer;
