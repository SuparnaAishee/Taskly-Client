// import {
//   BaseQueryApi,
//   createApi,
//   FetchArgs,
//   fetchBaseQuery,
  
// } from "@reduxjs/toolkit/query/react";

// import { RootState } from "../store/store";
// import { logout, setCredentials } from "../features/auth/authSlice";

// // Base query definition
// const baseQuery = fetchBaseQuery({
//   baseUrl: "https://meeting-room-booking-server.vercel.app/api", // Your API base URL
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// // Middleware to handle token refresh
// export const baseQueryWithRefreshToken = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   extraOptions: {}
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   // If token is expired (401), attempt to refresh
//   if (result.error?.status === 401) {
//     const refreshToken = (api.getState() as RootState).auth.refreshToken;

//     const refreshResult = await fetch(
//       "http://localhost:5000/api/auth/refresh", // Adjust URL if needed
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refreshToken }),
//         credentials: "include",
//       }
//     );

//     if (refreshResult.ok) {
//       const data = await refreshResult.json();
//       const newToken = data.token;
//       const user = (api.getState() as RootState).auth.user;

//       // Store new token and user in Redux
//       api.dispatch(setCredentials({ user, token: newToken, refreshToken }));

//       // Retry the original request with the new token
//       result = await baseQuery(
//         {
//           ...args,
//           headers: {
//             ...(args as FetchArgs).headers,
//             Authorization: `Bearer ${newToken}`,
//           },
//         },
//         api,
//         extraOptions
//       );
//     } else {
//       // Logout if refresh fails
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

// // Create the base API
// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithRefreshToken,
//   endpoints: () => ({}), // You can define endpoints here
// });
