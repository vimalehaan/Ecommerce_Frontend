// store.js
import { configureStore, createReducer } from "@reduxjs/toolkit";
import productReducer from "./Reducers/productSlice";
import cartReducer from "./Reducers/cartSlice";
import wishlistReducer from "./Reducers/wishListSlice";
import authReducer from "./Reducers/authSlice";
import shippingDetailReducer from "./Reducers/shippingDetailSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    shippingDetail: shippingDetailReducer,
  },
});

export default store;
