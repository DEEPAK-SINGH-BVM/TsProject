import { toast } from "react-toastify";
import api from "../../../api/axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_ERROR,
  UPDATE_ADDRESS,
  UPDATE_PROFILE_IMAGE,
} from "./constant";
import { AppDispatch } from "../../../store";
import endpoint from "../../../api/endPoint";

export type Shop = {
  _id: string;
  name: string;
  description: string;
  category: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  logo: string;
  owner: string;
};

export type User = {
  name: string;
  email: string;
  role: "buyer" | "seller";
  profileImage?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
  message?: string;
  shop?: Shop | null;
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

export const loginSuccess = (data: AuthResponse) => {
  console.log("loginSuccessData", data);

  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const signupSuccess = (data: AuthResponse) => {
  console.log("signupSuccessData", data);
  return {
    type: SIGNUP_USER,
    payload: data,
  };
};

export const authError = (error: AuthResponse) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

const updateAddressSuccess = (address: string) => {
  return {
    type: UPDATE_ADDRESS,
    payload: address,
  };
};

const updateProfileImageSuccess = (user: User) => {
  return {
    type: UPDATE_PROFILE_IMAGE,
    payload: user,
  };
};
// LOGIN
// export const LoginAction =
//   (data: LoginData, auth: any) => async (dispatch: AppDispatch) => {
//     try {
//       const res = await api.post(endpoint.auth.login, data);
//       const token = res.data.token;
      
//       console.log("LoginActionResponse", res);
//       // dispatch(loginSuccess(res.data));
  
//       toast.success(res.data.message);
   
//       auth.login(res.data.token, res.data.user.role);
  
//       const shopRes = await api.get(endpoint.auth.shop);
//       console.log('shopRes', shopRes);

//       const { user, shop } = shopRes.data;
//       dispatch(
//         loginSuccess({
//           user,
//           token,
//           shop,
//           message: res.data.message
//         }),
//       );
//       if (user.role === "seller") {
//         if (shop) {
//         auth.goTo("/seller/dashboard", true);
//       } else {
//           auth.goTo("/seller/create-shop", true);
//         }
//       } else {
//         auth.goTo("/home", true);
//       }
//     } catch (error: any) {
//       dispatch(authError(error.response?.data?.message));
  
//       toast.error(error.response?.data?.message);
//     }
//   };
export const LoginAction =
  (data: LoginData, auth: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.post(endpoint.auth.login, data);
      const token = res.data.token;

      toast.success(res.data.message);

      auth.login(token, res.data.user.role);

      let user = res.data.user;
      let shop = null;

      try {
        const shopRes = await api.get(endpoint.auth.shop);
        console.log("shopRes", shopRes);

        user = shopRes.data.user || user;
        shop = shopRes.data.shop || null;
      } catch (shopError: any) {
        console.log("No shop found");
      }

      dispatch(
        loginSuccess({
          user,
          token,
          shop,
          message: res.data.message,
        })
      );

      if (user.role === "seller" && !shop) {
        if (shop) {
          auth.goTo("/seller/dashboard", true);
        } else {
          auth.goTo("/seller/create-shop", true);
        }
      } else {
        auth.goTo("/home", true);
      }

    } catch (error: any) {
      dispatch(authError(error.response?.data?.message));
      toast.error(error.response?.data?.message);
    }
  };


// SIGNUP
export const SignupAction =
  (data: SignupData, auth: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.post(endpoint.auth.signup, data);
      console.log("SignupActionResponse", res);

      dispatch(signupSuccess(res.data));

      toast.success(res.data.message);

      auth.login(res.data.token, res.data.user.role);

      if (res.data.user.role === "seller") {
        auth.goTo("/seller/create-shop", true);
      } else {
        auth.goTo("/home", true);
      }
    } catch (error: any) {
      dispatch(authError(error.response?.data?.message));

      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };

export const UpdateAddressAction =
  (address: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.put(endpoint.auth.address, { address });
      console.log("UpdateAddressActionResponse", res);

      dispatch(updateAddressSuccess(res.data.user));
      toast.success("Address updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update address");
    }
  };

export const uploadProfileImageAction =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.put(endpoint.upload.image, formData);

      dispatch(updateProfileImageSuccess(res.data.user));

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to upload profile image",
      );
    }
  };
