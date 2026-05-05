import api from "../../../api/axios";
import {
  BULK_UPLOAD_FAIL,
  BULK_UPLOAD_REQUEST,
  BULK_UPLOAD_SUCCESS,
} from "./constant";

export const bulkUploadProductsAction =
  (formData: FormData) => async (dispatch: any) => {
    try {
      dispatch({ type: BULK_UPLOAD_REQUEST });

      const res = await api.post("/product/bulk-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: BULK_UPLOAD_SUCCESS, payload: res.data });
    } catch (error: any) {
      dispatch({
        type: BULK_UPLOAD_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };
