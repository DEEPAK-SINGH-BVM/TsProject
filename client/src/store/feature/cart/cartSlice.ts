import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  loading: boolean;
  error: string | null;
  cart: any[];
  deliveryFee: number | null;
  subtotal: number | null;
  total: number | null;
}

const initialState: CartState = {
  loading: false,
  error: null,
  cart: [],
  deliveryFee: 0,
  subtotal: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      console.log("addToCartSuccess", action.payload);
      state.loading = false;
      state.cart = action.payload.data;
      state.deliveryFee = action.payload.deliveryFee;
      state.total = action.payload.total;
    },
    getCartSuccess: (state, action) => {
      console.log("getCartSuccess", action);
      state.loading = false;
      state.cart = action.payload.data;
      state.deliveryFee = action.payload.deliveryFee;
      state.subtotal = action.payload.subtotal;
      state.total = action.payload.total;
    },
    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
