import api from "../../../api/axios";
import endpoint from "../../../api/endPoint";

export const createOrderApi = (data: any) => {
  return api.post(endpoint.order.create, data);
};
