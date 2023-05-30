import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { buildUrl } from "../../utils/common";
import { base_url } from "../../utils/axiosconfig";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/product/${id}`,
      providesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (params) => buildUrl("/product", params),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
