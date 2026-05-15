import api from "../../../api/axios";
import endpoint from "../../../api/endPoint";

export const loginApi = (data: any) => {
  return api.post(endpoint.auth.login, data);
};

export const signupApi = (data: any) => {
  return api.post(endpoint.auth.signup, data);
};

export const updateAddressApi = (address: string) => {
  return api.put(endpoint.auth.address, { address });
};

export const uploadProfileImageApi = (formData: FormData) => {
  return api.put(endpoint.upload.image, formData);
};

export const sendOtpApi = (email: string) => {
  return api.post(endpoint.auth.sendOtp, { email });
};

export const verifyOtpApi = (data: any) => {
  return api.post(endpoint.auth.verifyOtp, data);
};

export const resetPasswordApi = (data: any) => {
  return api.post(endpoint.auth.resetPassword, data);
};
