// store.js
import { configureStore, createReducer } from "@reduxjs/toolkit";
import productReducer from "./Reducers/productSlice";
import cartReducer from "./Reducers/cartSlice";
import wishlistReducer from "./Reducers/wishListSlice";
import authReducer from "./Reducers/authSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

export default store;
