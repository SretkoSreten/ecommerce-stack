// store.ts
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "../reducers/auth.reducer";
import { persistConfig } from "./persist.config";
import homeReducer from "../reducers/home.reducer";
import layoutReducer from "../reducers/layout.reducer";
import productReducer from "../reducers/product.reducer";
import cartReducer from "../reducers/cart.reducer";

const rootReducer = {
  home: homeReducer,
  layout: layoutReducer,
  product: productReducer,
  cart: cartReducer,
  auth: persistReducer(persistConfig, authReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
