// import {
//   BULK_UPLOAD_FAIL,
//   BULK_UPLOAD_REQUEST,
//   BULK_UPLOAD_SUCCESS,
// } from "./constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  products: [],
  uploadResult: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    uploadSuccess: (state, action) => {
      state.loading = false;
      state.uploadResult = action.payload;
    },
    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
// const productReducer = (state = initialState, action: any) => {
//   console.log("productReducerState", state);

//   switch (action.type) {
//     case BULK_UPLOAD_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//         uploadResult: null,
//       };
//     case BULK_UPLOAD_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         uploadResult: action.payload,
//       };
//     case BULK_UPLOAD_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
export const { request, getSuccess, uploadSuccess, fail } =
  productSlice.actions;

export default productSlice.reducer;
