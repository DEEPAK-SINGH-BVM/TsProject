import api from "../../../api/axios";
import endpoint from "../../../api/endPoint";

export const getAllShopsApi = () => {
  return api.get(endpoint.shop.getAll);
};

export const getShopsApi = () => {
  return api.get(endpoint.shop.get);
};

export const craeteShopsApi = (data: any) => {
  return api.post(endpoint.shop.create, data);
};

export const updateShopsApi = (data: any) => {
  return api.put(endpoint.shop.update, data);
};

export const uploadShopLogoApi = (formData: FormData) => {
  return api.post(endpoint.shop.uploadLogo, formData);
};
