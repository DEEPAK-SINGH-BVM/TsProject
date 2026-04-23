import { toast } from "react-toastify";
import api from "../../../api/axios";
import { LOGIN_USER, SIGNUP_USER, AUTH_ERROR } from "./constant";
import { AppDispatch } from "../../../store";
import endpoint from "../../../api/endPoint";

export type User = {
  name: string;
  email: string;
  role: "buyer" | "seller";
};

export type AuthResponse = {
  user: User;
  token: string;
  message: string;
};

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

export const loginSuccess = (data:AuthResponse)=>{
  console.log("loginSuccessData", data);
  
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const  signupSuccess = (data:AuthResponse)=>{
  console.log("signupSuccessData", data);
    return {
        type: SIGNUP_USER,
        payload: data,
    };
};

export const authError = (error:AuthResponse)=>{
  return {
    type: AUTH_ERROR,
    payload: error,
  };
} 
// LOGIN
export const LoginAction = (data: LoginData, auth: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post(endpoint.auth.login, data);
    console.log("LoginActionResponse", res);
    dispatch(loginSuccess(res.data))

    toast.success(res.data.message);

    auth.login(res.data.token, res.data.user.role);

    if (res.data.user.role === "seller") {
      auth.goTo("/seller/dashboard", true);
    } else {
      auth.goTo("/home", true);
    }
  } catch (error: any) {
    dispatch(authError(error.response?.data?.message));

    toast.error(error.response?.data?.message);
  }
};

// SIGNUP
export const SignupAction = (data: SignupData, auth: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post(endpoint.auth.signup, data);
    console.log("SignupActionResponse", res);

    dispatch(signupSuccess(res.data));

    toast.success(res.data.message);

    auth.login(res.data.token, res.data.user.role);

    if (res.data.user.role === "seller") {
      auth.goTo("/seller/dashboard", true);
    } else {
      auth.goTo("/home", true);
    }
  } catch (error: any) {
    dispatch(authError(error.response?.data?.message));

    toast.error(error.response?.data?.message || "Signup Failed");
  }
};
