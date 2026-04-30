import { toast } from "react-toastify";
import api from "../../../api/axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_ERROR,
  UPDATE_ADDRESS,
  UPDATE_PROFILE_IMAGE,
  // CREATE_SHOP,
} from "./constant";
import { AppDispatch } from "../../index";
import endpoint from "../../../api/endPoint";

export type Shop = {
  name: string;
  description: string;
  category: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  logo: string;
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

// const createShopSuccess = (shop: Shop) => {
//   return {
//     type: CREATE_SHOP,
//     payload: shop,
//   };
// };
// export const LoginAction =
//   (data: LoginData, auth: any) => async (dispatch: AppDispatch) => {
//     try {
//       const res = await api.post(endpoint.auth.login, data);
//       const token = res.data.token;

//       toast.success(res.data.message);

//       auth.login(token, res.data.user.role);

//       let shop = null;

//       try {
//         const shopRes = await api.get(endpoint.shop.get);
//         shop = shopRes.data.shop || null;
//       } catch (err) {
//         console.log("No shop found");
//       }

//       dispatch(
//         loginSuccess({
//           user: res.data.user,
//           token,
//           message: res.data.message,
//         }),
//       );

//       if (shop) {
//         dispatch({ type: "GET_SHOP", payload: shop });
//       }
//     } catch (error: any) {
//       dispatch(authError(error.response?.data?.message));
//       toast.error(error.response?.data?.message);
//     }
//   };
// LOGIN
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
        const shopRes = await api.get(endpoint.shop.get);
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
        }),
      );
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

      auth.signup(res.data.token, res.data.user.role);
    } catch (error: any) {
      dispatch(authError(error.response?.data?.message));

      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };
// sendOtp
export const sendOtp = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post(endpoint.auth.sendOtp, { email });
    toast.success(res.data.message);
    localStorage.setItem("otpUserId", res.data.user_id);
  } catch (error: any) {
    toast.error(error.response?.data?.error || "OTP failed");
  }
};

// ResetPassword 
export const resetPassword = (data:{ otp: string; new_password: string }, navigate: any) => async (dispatch:AppDispatch)=>
{
   try {
     const user_id = localStorage.getItem("otpUserId");
 
     const res = await api.post(endpoint.auth.resetPassword, {
       user_id,
       otp:data.otp,
       new_password:data.new_password
     });
 
     toast.success(res.data.message)
     localStorage.removeItem("otpUserId");
     setTimeout(()=>{
       navigate("/login")
     },1500)
   } catch (error:any) {
      toast.error(error.response?.data?.error || "Reset failed");
   }
}
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
// export const createShopAction =
//   (data: any, auth: any) => async (dispatch: AppDispatch) => {
//     try {
//       const res = await api.post(endpoint.shop.create, data);
//       console.log("createShopActionResponse", res);
//       dispatch(createShopSuccess(res.data.shop));
//       toast.success(res.data.message);
//       auth.goTo("/seller/dashboard", true);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to create shop");
//     }
//   };
