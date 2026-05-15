// import { AppDispatch } from "../..";
// import api from "../../../api/axios";
// import endpoint from "../../../api/endPoint";
// import { fail, getSuccess, request } from "./proReducer";
// // import {
// //   BULK_UPLOAD_FAIL,
// //   BULK_UPLOAD_REQUEST,
// //   BULK_UPLOAD_SUCCESS,
// // } from "./constant";

// export const bulkUploadProductsAction =
//   (formData: FormData) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(request());
//       const res = await api.post(endpoint.products.bulkUpload, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("bulkUploadProductsActionResponse", res);

//       dispatch(getSuccess(res.data));
//     } catch (error: any) {
//       dispatch(fail(error.response?.data?.message));
//     }
//   };

// export const getMyProductsAction = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(request());
//     const res = await api.get(endpoint.products.getMyproduct);
//     console.log("getMyProducts", res);

//     dispatch(getSuccess(res.data));
//   } catch (error: any) {
//     dispatch(fail(error.response?.data?.message));
//   }
// };
