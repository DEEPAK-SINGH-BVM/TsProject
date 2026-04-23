import { toast } from "react-toastify";
import api from "../../../api/axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
  AUTH_ERROR,
} from "./constant";

// LOGIN
export const LoginAction = (data: any, auth: any) => async (dispatch: any) => {
    try {
      const res = await api.post("/auth/login", data);
  
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
  
      toast.success(res.data.message);
   
      auth.login(res.data.token, res.data.user.role);
  
      if (res.data.user.role === "seller") {
        auth.goTo("/seller/dashboard", true);
      } else {
        auth.goTo("/home", true);
      }
    } catch (error: any) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response?.data?.message,
      });
  
      toast.error(error.response?.data?.message);
    }
  };

// SIGNUP
export const SignupAction =
  (data: any, auth: any) => async (dispatch: any) => {
    try {
      const res = await api.post("/auth/signup", data);

      dispatch({
        type: SIGNUP_USER,
        payload: res.data,
      });

      toast.success(res.data.message);

      auth.login(res.data.token, res.data.user.role);

      if (res.data.user.role === "seller") {
        auth.goTo("/seller/dashboard", true);
      } else {
        auth.goTo("/home", true);
      }
    } catch (error: any) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response?.data?.message,
      });

      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };