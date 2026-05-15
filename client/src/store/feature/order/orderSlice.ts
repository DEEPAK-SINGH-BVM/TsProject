import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  loading: Boolean;
  error: string | null;
  order: string | null;
}

const initialState: OrderState = {
  loading: true,
  error: null,
  order: null,
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
    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const orderAction = orderSlice.actions;
export default orderSlice.reducer;
