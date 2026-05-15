import { toast } from "react-toastify";

import { AppDispatch } from "../../index";
import {
  craeteShopsApi,
  getAllShopsApi,
  getShopsApi,
  updateShopsApi,
  uploadShopLogoApi,
} from "./shopService";
import { shopAction } from "./shopSlice";

export const getAllShopsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(shopAction.request());
    const res = await getAllShopsApi();
    dispatch(shopAction.getAllSuccess(res.data.shops));
  } catch (error: any) {
    dispatch(
      shopAction.fail(error.response?.data?.message) || "Failed to fetch shops",
    );
  }
};

export const getShopAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(shopAction.request());
    const res = await getShopsApi();
    console.log("getShopActionRess", res);
    
    dispatch(shopAction.getShopSuccess(res.data.shop));
  } catch (error: any) {
    dispatch(
      shopAction.fail(error.response?.data?.message) || "Failed to fetch shops",
    );
  }
};

export const createShopAction =
  (data: any, auth: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(shopAction.request());
      const res = await craeteShopsApi(data);

      dispatch(shopAction.createShopSuccess(res.data.shop));

      auth.goTo("/seller/dashboard", true);
      toast.success(res.data.message);
    } catch (error: any) {
      dispatch(
        shopAction.fail(error.response?.data?.message) ||
          "Failed to fetch shops",
      );
      toast.error(error.response?.data?.message || "Failed  to create shop");
    }
  };

export const updateShopAction =
  (data: any, auth: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(shopAction.request());
      const res = await updateShopsApi(data);
      dispatch(shopAction.updateShopSuccess(res.data.shop));
      auth.goTo("/seller/shop", true);
      toast.success(res.data.message);
    } catch (error: any) {
      dispatch(
        shopAction.fail(error.response?.data?.message) ||
          "Failed to fetch shops",
      );
      toast.error(error.response?.data?.message || "Failed to update shop");
    }
  };

export const uploadShopLogoAction =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(shopAction.request());
      const res = await uploadShopLogoApi(formData);
      dispatch(shopAction.uploadLogoSuccess(res.data.shop));
      toast.success(res.data.message);
    } catch (error: any) {
      dispatch(
        shopAction.fail(error.response?.data?.message) ||
          "Failed to fetch shops",
      );
      toast.error(
        error.response?.data?.message || "Failed to upload shop logo",
      );
    }
  };
