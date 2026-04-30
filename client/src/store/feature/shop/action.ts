import { toast } from "react-toastify";
import { CREATE_SHOP, GET_ALL_SHOPS, GET_SHOP, UPDATE_SHOP, UPLOAD_SHOP_LOGO } from "./constant";
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
const getAllShopsSuccess = (shops: Shop[]) => {
  return {
    type: GET_ALL_SHOPS,
    payload: shops,
  };
}
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

const updateShopSuccess = (shop: Shop) => {
  return {
    type: UPDATE_SHOP,
    payload: shop,
  };
};
const uploadShopLogoSuccess = (shop: Shop) => {
  return {
    type: UPLOAD_SHOP_LOGO,
    payload: shop,
  };
};


export const getAllShopsAction = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get(endpoint.shop.getAll);
    console.log("allShop", res);
    
    dispatch(getAllShopsSuccess(res.data.shops));
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch shops");
  }
}

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

export const updateShopAction =
  (data: any, auth: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.put(endpoint.shop.update, data);
      dispatch(updateShopSuccess(res.data.shop));
      auth.goTo("/seller/shop", true);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update shop");
    }
  };

export const uploadShopLogoAction =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.post(endpoint.shop.uploadLogo, formData);
      dispatch(uploadShopLogoSuccess(res.data.shop));
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to upload shop logo",
      );
    }
  };
