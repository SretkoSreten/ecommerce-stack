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
import shopReducer from "../reducers/shop.reducer";
import { orderReducer, accOrdersReducer, orderDetailsReducer } from "../reducers/order.reducers";
import accountReducer from "../reducers/account.reducers";
import { addressReducer, addressesReducer } from "../reducers/addresses.reducers";
import countryReducer from "../reducers/country.reducers";

const rootReducer = {
  home: homeReducer,
  layout: layoutReducer,
  product: productReducer,
  cart: cartReducer,
  auth: persistReducer(persistConfig, authReducer),
  shop: shopReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  accOrders: accOrdersReducer,
  account: accountReducer,
  addresses: addressesReducer,
  address: addressReducer,
  country: countryReducer
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
