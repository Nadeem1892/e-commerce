import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {jwtDecode} from "jwt-decode";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.9:4000/user/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    // login End Point
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
      
    }),

    // Register End Point
    register: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        body: body,
      }),
    }),

    // Forgot password End Point
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
        url: "verify-forgot-password-otp",
        method: "PUT",
        body: body,
      }),
    }),

    // Reset Password OTP Endpoint
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "reset-password",
        method: "PUT",
        body: body,
      }),
    }),

    // User Details Endpoint
    userDetails: builder.query({
      query: () => {
        return {
          url: "user-details",
          method: "GET",

        };
      },
    }),
   // User logout Endpoint
   logout: builder.query({
    query: () => {
      return {
        url: "logout",
        method: "GET",

      };
    },
    invalidatesTags: ["user"],
  }),

     // User Update Endpoint
     updateUser: builder.mutation({
      query: (body) => {
        return {
          url: "update-user",
          method: "POST",
          body: body
        };
      },
    }),
        // Upload Avatar Endpoint
        uploadAvatar: builder.mutation({
          query: (body) => {
            return {
              url: "upload-avatar",
              method: "PUT",
              body: body
            };
          },
        }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFogotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useUserDetailsQuery,
  useLogoutQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation
} = userApi;
