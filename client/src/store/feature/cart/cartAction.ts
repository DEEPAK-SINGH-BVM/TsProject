import { toast } from "react-toastify";

import { AppDispatch } from "../..";

import {
  addToCartApi,
  deleteCartProductApi,
  getCartProductsApi,
  updateCartProductApi,
} from "./cartService";

import { cartActions } from "./cartSlice";

export const addToCartAction =
  (productId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(cartActions.request());
      const res = await addToCartApi(productId);

      dispatch(getCartProductsAction());

      toast.success(res.data.message);
    } catch (error: any) {
      dispatch(cartActions.fail(error.response?.data?.message));
    }
  };
export const getCartProductsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(cartActions.request());

    const res = await getCartProductsApi();
    console.log("getCartProductsActionRes", res.data);

    dispatch(cartActions.getCartSuccess(res.data));
  } catch (error: any) {
    dispatch(cartActions.fail(error.response?.data?.message));
  }
};

export const updateCartProductAction =
  (productId: string, action: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(cartActions.request());

      await updateCartProductApi(productId, action);

      dispatch(getCartProductsAction());
    } catch (error: any) {
      dispatch(cartActions.fail(error.response?.data?.message));
    }
  };

export const deleteCartProductAction =
  (productId: string) => async (dispatch: AppDispatch) => {
    console.log("deleteCartProductActionId", productId);
    try {
      dispatch(cartActions.request());
      await deleteCartProductApi(productId);
      dispatch(getCartProductsAction());
    } catch (error: any) {
      dispatch(cartActions.fail(error.response?.data?.message));
    }
  };
