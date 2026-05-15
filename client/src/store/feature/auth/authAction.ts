import { toast } from "react-toastify";
import { AppDispatch } from "../..";
import {
  loginApi,
  resetPasswordApi,
  sendOtpApi,
  signupApi,
  updateAddressApi,
  uploadProfileImageApi,
  verifyOtpApi,
} from "./authService";
import { authActions } from "./authSlice";
import { getShopAction } from "../shop/shopAction";

export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller";
};

export const LoginAction =
  (data: LoginData, login: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authActions.request());

      const res = await loginApi(data);
      console.log("LoginActionNew", res);

      const token = res.data.token;

      toast.success(res.data.message);

      login(token);

      dispatch(
        authActions.loginSuccess({
          user: res.data.user,
          token,
        }),
      );

      await dispatch(getShopAction());
    } catch (error: any) {
      dispatch(authActions.authError(error.response?.data?.message));
      toast.error(error.response?.data?.message);
    }
  };

export const SignupAction =
  (data: SignupData, signup: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authActions.request());

      const res = await signupApi(data);
      console.log("SignupActionRes", res);

      dispatch(
        authActions.signupSuccess({
          user: res.data.user,
          token: res.data.token,
        }),
      );

      toast.success(res.data.message);

      signup(res.data.token);
    } catch (error: any) {
      dispatch(authActions.authError(error.response?.data?.message));
      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };

export const UpdateAddressAction =
  (address: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await updateAddressApi(address);

      dispatch(authActions.updateAddressSuccess(res.data.user));
      toast.success("Address updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

export const uploadProfileImageAction =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      const res = await uploadProfileImageApi(formData);
      dispatch(authActions.updateProfileImageSuccess(res.data.user));
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

export const sendOtp = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await sendOtpApi(email);

    toast.success(res.data.message);

    localStorage.setItem("otpUserId", res.data.user_id);
    localStorage.setItem("otpEmail", email);
  } catch (error: any) {
    toast.error(error.response?.data?.error || "OTP failed");
  }
};

export const verifyOtp = (data: { otp: string }, navigate: any) => async () => {
  try {
    const user_id = localStorage.getItem("otpUserId");

    if (!user_id) {
      toast.error("Session expired");
      return;
    }

    const res = await verifyOtpApi({
      user_id,
      otp: data.otp,
    });

    toast.success(res.data.message);
    navigate("/reset-password");
  } catch (error: any) {
    toast.error(error.response?.data?.error);
  }
};

export const resetPassword =
  (data: { new_password: string }, navigate: any) => async () => {
    try {
      const user_id = localStorage.getItem("otpUserId");

      if (!user_id) {
        toast.error("Session expired");
        return;
      }

      const res = await resetPasswordApi({
        user_id,
        new_password: data.new_password,
      });

      toast.success(res.data.message);

      localStorage.removeItem("otpUserId");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.error);
    }
  };
