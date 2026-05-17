import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  loading: boolean;
  error: string | null;
  order: string | null;
  orders: any[],
}

const initialState: OrderState = {
  loading: true,
  error: null,
  order: null,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    getOrdersSuccess: (state, action) => {
      console.log('getOrdersSuccess',action.payload);
      state.loading = false;
      state.orders = action.payload;
    },
    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const orderAction = orderSlice.actions;
export default orderSlice.reducer;
