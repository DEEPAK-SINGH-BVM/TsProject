import { createSlice } from "@reduxjs/toolkit";
interface ProductState {
  loading: boolean;
  error: string | null;
  products: any[];
  buyNowProduct:any| null ;
  uploadResult: any;
}
const initialState :ProductState= {
  loading: false,
  error: null,
  products:[],
  buyNowProduct:null,
  uploadResult: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getBuyProduct:(state,action)=>{
      state.loading = false;
      state.buyNowProduct = action.payload
    },
    getShopProduct: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    uploadSuccess: (state, action) => {
      state.loading = false;
      state.uploadResult = action.payload;
    },
    updateProduct: (state, action) => {
      state.loading = false;
      console.log(
        "updateProductProducts",
        JSON.parse(JSON.stringify(state.products)),
      );
      state.products = state.products.map((item: any) =>
        item._id === action.payload._id ? action.payload : item,
      );
    },
    
    deleteProduct: (state, action) => {
      state.loading = false;
    
      state.products = state.products.filter(
        (item: any) => item._id !== action.payload,
      );
    },
    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
