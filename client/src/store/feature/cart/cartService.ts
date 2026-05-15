import api from "../../../api/axios";
import endpoint from "../../../api/endPoint";

export const addToCartApi = (productId: string) => {
  return api.post(endpoint.cart.addToCart, { productId });
};

export const getCartProductsApi = () => {
  return api.get(endpoint.cart.getCartProducts);
};

export const updateCartProductApi = (productId: string, action: string) => {
  return api.patch(endpoint.cart.updateCart, { productId, action });
};

export const deleteCartProductApi = (productId: string) => {
  console.log("deleteCartProductApiId", productId);
  
  return api.delete(endpoint.cart.deleteCart(productId));
};
