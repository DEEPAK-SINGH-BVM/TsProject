import { toast } from "react-toastify";
import { CREATE_SHOP, GET_SHOP } from "./constant";
import { AppDispatch } from "../../index";
import api from "../../../api/axios";
import endpoint from "../../../api/endPoint";

export type Shop = {
  name: string;
  description: string;
  category: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  logo: string;
};

const getShopSuccess = (shop: Shop) => {
  return {
    type: GET_SHOP,
    payload: shop,
  };
};

const createShopSuccess = (shop: Shop) => {
  return {
    type: CREATE_SHOP,
    payload: shop,
  };
};
export const getShopAction = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get(endpoint.shop.get);
    dispatch(getShopSuccess(res.data.shop));
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch shop");
  }
};

export const createShopAction =
  (data: any, auth: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.post(endpoint.shop.create, data);

      dispatch(createShopSuccess(res.data.shop));

      auth.goTo("/seller/dashboard", true);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed  to create shop");
    }
  };
