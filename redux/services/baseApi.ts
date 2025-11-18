import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/v1", // backend URL
    credentials: "include", // important for cookie auth
  }),
  endpoints: () => ({}), // empty initially
});
