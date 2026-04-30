const endpoint = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    address: "/auth/address",
    sendOtp: "/auth/send-otp",
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
};
export default endpoint;