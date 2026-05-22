import { AppDispatch } from "../..";
import api from "../../../api/axios";
import endpoint from "../../../api/endPoint";

export const bulkUploadApi = (formData: FormData) => {
  return api.post(endpoint.products.bulkUpload, formData);
};

export const getBuyProductApi = (productId:string)=>{
  return api.post(endpoint.products.getBuyProduct, { productId });
}

export const getMyProductsApi = () => {
  return api.get(endpoint.products.getMyproduct);
};

export const getShopProductApi = (shopId: string) => {
  return api.get(endpoint.products.getShopProducts(shopId));
};

export const updateProductApi = (id: string, data: any) => {
  return api.put(endpoint.products.updateProduct(id), data);
};

export const deleteProductApi = (id: string) => {
  return api.delete(endpoint.products.deleteProduct(id));
};
