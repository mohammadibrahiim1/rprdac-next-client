import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 1️⃣ Define your tag types (can extend later)
export type ApiTagTypes = "Mail" | "User" | "Other";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1", // backend URL
    credentials: "include", // important for cookie auth
  }),
  tagTypes: ["Mail", "User", "Other"],
  endpoints: () => ({}), // empty initially
});
