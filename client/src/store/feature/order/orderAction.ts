import { AppDispatch } from "../..";
import { createOrderApi } from "./orderService";
import { orderAction } from "./orderSlice";

export const createOrderAction =
  (data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(orderAction.request());
      const res = await createOrderApi(data);
      dispatch(orderAction.placeOrderSuccess(res.data));
    } catch (error: any) {
      dispatch(
        orderAction.fail(error.response?.data?.message) ||
          "Failed to fetch shops",
      );
    }
  };
