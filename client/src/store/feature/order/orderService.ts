import api from "../../../api/axios";
import endpoint from "../../../api/endPoint";

export const createOrderApi = (data: any) => {
  return api.post(endpoint.order.create, data);
};

export const getMyOrdersApi = async () => {
  return api.get(endpoint.order.getMy);
};

export const getSellerOrdersApi = async () => {
  return api.get(endpoint.order.seller);
};
