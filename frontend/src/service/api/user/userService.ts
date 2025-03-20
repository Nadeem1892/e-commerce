import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/user/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth");
      if (token) {
        headers.set("x-access-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    // login End point
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
    }),

    // Register End point
    register: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        body: body,
      }),
    }),

    // Forgot password End point
    fogotPassword: builder.mutation({
      query: (body) => ({
        url: "forgot-password",
        method: "PUT",
        body: body,
      }),
    }),
    // Verify Forgot Password OTP Endpoint
    verifyForgotPasswordOtp: builder.mutation({
      query: (body) => ({
        url: "verify-forgot-password-otp", // Make sure this matches your backend route
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFogotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
} = userApi;
