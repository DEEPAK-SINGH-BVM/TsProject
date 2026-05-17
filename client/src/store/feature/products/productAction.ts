import { toast } from "react-toastify";
import { AppDispatch } from "../..";
import api from "../../../api/axios";
import {
  blukUploadApi,
  deleteProductApi,
  getBuyProductApi,
  getMyProductsApi,
  getShopProductApi,
  updateProductApi,
} from "./productService";
import { productActions } from "./productSlice";

export const bulkUploadProductsAction =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productActions.request());
      const res = await blukUploadApi(formData);
      dispatch(productActions.uploadSuccess(res.data));
    } catch (error: any) {
      dispatch(productActions.fail(error.response?.data?.message));
    }
  };

export const getMyProductsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(productActions.request());
    const res = await getMyProductsApi();
    dispatch(productActions.getSuccess(res.data));
  } catch (error: any) {
    dispatch(productActions.fail(error.response?.data?.message));
  }
};

export const getBuyProductAction =
  (productId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productActions.request());
      const res = await getBuyProductApi(productId);
      console.log("getBuyProductActionRes", res);

      dispatch(productActions.getBuyProduct(res.data));
    } catch (error: any) {
      dispatch(productActions.fail(error.response?.data?.message));
    }
  };

export const getShopProductAction =
  (shopId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productActions.request());
      const res = await getShopProductApi(shopId);
      console.log("getShopProductActionRes", res.data.data);
      dispatch(productActions.getShopProduct(res.data));
    } catch (error: any) {
      dispatch(productActions.fail(error.response?.data?.message));
    }
  };
export const updateProductAction =
  (id: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productActions.request());

      const res = await updateProductApi(id, data);

      dispatch(productActions.updateProduct(res.data.data));

      toast.success(res.data.message);
    } catch (error: any) {
      dispatch(productActions.fail(error.response?.data?.message));

      toast.error(error.response?.data?.message);
    }
  };

export const deleteProductAction =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productActions.request());

      const res = await deleteProductApi(id);

      dispatch(productActions.deleteProduct(id));

      toast.success(res.data.message);
    } catch (error: any) {
      dispatch(productActions.fail(error.response?.data?.message));

      toast.error(error.response?.data?.message);
    }
  };
