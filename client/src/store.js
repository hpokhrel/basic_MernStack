import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice.js";
import authReducer from "./features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
});

export default store;
