import {
  BULK_UPLOAD_FAIL,
  BULK_UPLOAD_REQUEST,
  BULK_UPLOAD_SUCCESS,
} from "./constant";

const initialState = {
  loading: false,
  result: null,
  error: null,
};

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case BULK_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case BULK_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload,
      };
    case BULK_UPLOAD_FAIL:
      return {
        ...state,
        loading: true,
        result: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
