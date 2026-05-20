const endpoint = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    address: "/auth/address",
    sendOtp: "/auth/send-otp",
    verifyOtp: "/auth/verify-otp",
    resetPassword: "/auth/reset-password",
  },
  shop: {
    getAll: "/shop/all-shops",
    get: "/shop/my-shop",
    create: "/shop/create",
    update: "/shop/update",
    uploadLogo: "/shop/upload-logo",
  },
  upload: {
    image: "/auth/profile-image",
  },
  products: {
    getBuyProduct: "/product/buyProduct",
    getShopProducts: (shopId: string) => `/product/shops/${shopId}/products`,
    bulkUpload: "/product/bulk-upload",
    getMyproduct: "/product/my-products",
    updateProduct: (id: string) => `/product/update/${id}`,
    deleteProduct: (id: string) => `/product/delete/${id}`,
  },
  cart: {
    addToCart: "/cart/add",
    getCartProducts: "/cart/my-cart",
    updateCart: "/cart/update",
    deleteCart: (id: string) => `/cart/delete/${id}`,
  },
  order: {
    create: "/order/create",
    getMy:"/order/my-orders",
    seller:"/order/seller-orders",
    updateOrder:(id:string)=>`/order/update-status/${id}`
  },
};
export default endpoint;
