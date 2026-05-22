import { AppDispatch } from "../..";
import {
  createOrderApi,
  getMyOrdersApi,
  getSellerOrdersApi,
  updateOrderStatusApi,
} from "./orderService";
import { orderAction } from "./orderSlice";

export const createOrderAction =
  (data: any) => async (dispatch: AppDispatch) => {
    console.log("Data", data);
    try {
      dispatch(orderAction.request());
      const res = await createOrderApi(data);
      console.log("createOrderActionRes", res);
      dispatch(orderAction.placeOrderSuccess(res.data));
    } catch (error: any) {
      dispatch(
        orderAction.fail(error.response?.data?.message) ||
          "Failed to fetch shops",
      );
    }
  };

export const getMyOrdersAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(orderAction.request());
    const res = await getMyOrdersApi();
    console.log("getMyOrdersActionResponse", res.data.orders);
    dispatch(orderAction.getOrdersSuccess(res.data.orders));
  } catch (error: any) {
    dispatch(orderAction.fail(error.response?.data?.message));
  }
};

export const getSellerOrdersAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(orderAction.request());

    const res = await getSellerOrdersApi();
    console.log("getSellerOrdersAction", res);

    dispatch(orderAction.getOrdersSuccess(res.data.orders));
  } catch (error: any) {
    dispatch(orderAction.fail(error.response?.data?.message));
  }
};

export const updateOrderStatusAction =
  (id: string, status: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(orderAction.request());
      const res = await updateOrderStatusApi(id, status);
      console.log("updateOrderStatusResponse", res);
      dispatch(getSellerOrdersAction());
    } catch (error: any) {
      dispatch(orderAction.fail(error.response?.data?.message));
    }
  };
