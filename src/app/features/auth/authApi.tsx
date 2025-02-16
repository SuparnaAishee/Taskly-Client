import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setToken, logout } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/auth", // Adjust your API URL
  credentials: "include", // Send cookies with requests
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(logout()); // Clear Redux state
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
export default authApi;
