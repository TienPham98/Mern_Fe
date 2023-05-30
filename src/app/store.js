import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/user/userSlice";
import blogReducer from "../features/blogs/blogSlice";
import productReducer from "../features/products/productSlice";
import colorReducer from "../features/color/colorSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    blog: blogReducer,
    product: productReducer,
    color: colorReducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
