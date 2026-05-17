import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import shopReducer from "./feature/shop/shopSlice";
import productReducer from "./feature/products/productSlice";
import authReducer from "./feature/auth/authSlice";
import cartReducer from "./feature/cart/cartSlice";
import orderReducer from "./feature/order/orderSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "shop", "product", "cart"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer,
  product: productReducer,
  order: orderReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
//Ye object actual me localStorage me data save aur wapas laane ka kaam karta hai.

export type RootState = ReturnType<typeof rootReducer>;
// TypeScript ko batata hai ki Redux store ka pura structure kaisa hai.

export type AppDispatch = typeof store.dispatch;
// Ye TypeScript ko batata hai ki dispatch function ka type kya hai