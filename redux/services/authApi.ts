import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //signup
    register: builder.mutation({
      query: (data: { name: string; email: string; password: string }) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    //login
    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    //logout
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
