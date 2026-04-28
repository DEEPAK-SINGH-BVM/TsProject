// import {
//     legacy_createStore as createStore,
//     combineReducers,
//   } from "redux";

//   import { authReducer } from "../pages/auth/redux";

//   const rootReducer = combineReducers({
//     auth: authReducer,
//   });

//   export const store = createStore(rootReducer);
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { authReducer } from "./feature/auth";
import { shopReducer } from "./feature/shop";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "shop"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk as any),
);

export const persistor = persistStore(store);

// RootState is the TypeScript type that represents the entire Redux store state structure
export type RootState = ReturnType<typeof rootReducer>;
// AppDispatch is the TypeScript type for the Redux dispatch function, which allows safe use of actions (including thunks).
export type AppDispatch = typeof store.dispatch;
