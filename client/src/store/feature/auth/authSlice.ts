import { createSlice } from "@reduxjs/toolkit";

export type User = {
  _id?: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
  address?: string;
  profileImage?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateAddressSuccess: (state, action) => {
      state.user = action.payload;
    },

    updateProfileImageSuccess: (state, action) => {
      state.user = action.payload;
    },

    authError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
