import { createSlice } from "@reduxjs/toolkit";
import { GrAction } from "react-icons/gr";

const initialState = {
  shops: [],
  shop: null,
  isFetched: false,
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllSuccess: (state, action) => {
      state.loading = false;
      state.shops = action.payload;
    },
    getShopSuccess: (state, action) => {
      state.loading = false;
      state.shop = action.payload;
    },
    createShopSuccess: (state, action) => {
      state.loading = false;
      state.shop = action.payload;
      state.isFetched = true;
    },

    updateShopSuccess: (state, action) => {
      state.loading = false;
      state.shop = action.payload;
    },

    uploadLogoSuccess: (state, action) => {
      state.loading = false;
      state.shop = action.payload;
    },

    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const shopAction = shopSlice.actions;
export default shopSlice.reducer;
