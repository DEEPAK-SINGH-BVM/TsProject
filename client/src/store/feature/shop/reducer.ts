import {
  CREATE_SHOP,
  GET_ALL_SHOPS,
  GET_SHOP,
  UPDATE_SHOP,
  UPLOAD_SHOP_LOGO,
} from "./constant";

const initialState = {
  shops: [],
  shop: null,
  error: null,
};

const shopReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_SHOPS:
      return {
        ...state,
        shops: action.payload,
        error: null,
      };
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
    case UPDATE_SHOP:
      return {
        ...state,
        shop: action.payload,
        error: null,
      };
    case "CLEAR_SHOP":
      return {
        ...state,
        shop: null,
        shops: [],
      };
    case UPLOAD_SHOP_LOGO:
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
