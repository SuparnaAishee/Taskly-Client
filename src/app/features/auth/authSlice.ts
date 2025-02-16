import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

// Load token and user from localStorage or Cookies on app start
const storedToken =
  localStorage.getItem("accessToken") || Cookies.get("accessToken");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("accessToken", action.payload);
      Cookies.set("accessToken", action.payload, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      Cookies.remove("accessToken");
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// // Define Auth State Type
// interface AuthState {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   user: any | null;
//   token: string | null;
// }

// // Load token from localStorage or Cookies on app start
// const storedToken =
//   localStorage.getItem("accessToken") || Cookies.get("accessToken");

// const initialState: AuthState = {
//   user: null,
//   token: storedToken || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     setUser: (state, action: PayloadAction<any>) => {
//       state.user = action.payload;
//     },
//     setToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//       localStorage.setItem("accessToken", action.payload); // Store in localStorage
//       Cookies.set("accessToken", action.payload, {
//         expires: 7,
//         secure: true,
//         sameSite: "strict",
//       }); // Store in cookies
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("accessToken");
//       Cookies.remove("accessToken");
//     },
//   },
// });

// export const { setUser, setToken, logout } = authSlice.actions;
// export default authSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// import {jwtDecode} from "jwt-decode";

// interface CustomJwtPayload {
//   email: string;
//   username: string;
//   exp: number;
// }

// export interface AuthState {
//   isAuthenticated: boolean;
//   user: null | { email: string; username: string };
//   error: string | null;
//   loading: boolean;
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
//   error: null,
//   loading: true, // Initially loading is true, until auth check completes
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // ✅ Register User
//     register: (
//       state,
//       action: PayloadAction<{ email: string; username: string }>
//     ) => {
//       state.isAuthenticated = false;
//       state.user = {
//         email: action.payload.email,
//         username: action.payload.username,
//       };
//       state.error = null;
//       state.loading = false;
//     },

//     // ✅ Register Success (Auto Login)
//     registerSuccess: (
//       state,
//       action: PayloadAction<{ token: string; email: string; username: string }>
//     ) => {
//       const { token, email, username } = action.payload;
//       Cookies.set("accessToken", token, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//       });
//       state.isAuthenticated = true;
//       state.user = { email, username };
//       state.error = null;
//       state.loading = false;
//     },

//     registerFailure: (state, action: PayloadAction<string>) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.error = action.payload;
//       state.loading = false;
//     },

//     // ✅ Login Success
//     loginSuccess: (
//       state,
//       action: PayloadAction<{ token: string; email: string; username: string }>
//     ) => {
//       const { token, email, username } = action.payload;
//       Cookies.set("accessToken", token, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//       });
//       state.isAuthenticated = true;
//       state.user = { email, username };
//       state.error = null;
//       state.loading = false;
//     },

//     loginFailure: (state, action: PayloadAction<string>) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.error = action.payload;
//       state.loading = false;
//     },

//     // ✅ Logout
//     logout: (state) => {
//       Cookies.remove("accessToken");
//       state.isAuthenticated = false;
//       state.user = null;
//       state.error = null;
//       state.loading = false;
//     },

//     // ✅ Check Auth (on page load or refresh)
//     checkAuth: (state) => {
//       const token = Cookies.get("accessToken");

//       if (!token) {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.loading = false;
//         return;
//       }

//       try {
//         const decodedToken = jwtDecode<CustomJwtPayload>(token);
//         const currentTime = Date.now() / 1000;

//         if (decodedToken.exp > currentTime) {
//           state.isAuthenticated = true;
//           state.user = {
//             email: decodedToken.email,
//             username: decodedToken.username,
//           };
//         } else {
//           // Token expired, clear authentication
//           Cookies.remove("accessToken");
//           state.isAuthenticated = false;
//           state.user = null;
//         }
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (error) {
//         // Invalid token, clear authentication
//         Cookies.remove("accessToken");
//         state.isAuthenticated = false;
//         state.user = null;
//       }

//       state.loading = false; // Ensure loading is false after authentication check
//     },
//   },
// });

// export const {
//   register,
//   registerSuccess,
//   registerFailure,
//   loginSuccess,
//   loginFailure,
//   logout,
//   checkAuth,
// } = authSlice.actions;

// export default authSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import {jwtDecode} from "jwt-decode"; // Correct import for jwtDecode

// // Define the structure of the decoded JWT payload
// interface CustomJwtPayload {
//   email: string;
//   username: string;
//   exp: number; // Expiry time of the token (in seconds)
// }

// export interface AuthState {
//   isAuthenticated: boolean;
//   user: null | { email: string; username: string };
//   error: string | null;
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
//   error: null,
// };

// // Create a slice for authentication
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // Register the user (after successful registration)
//     register: (
//       state,
//       action: PayloadAction<{ email: string; username: string }>
//     ) => {
//       const { email, username } = action.payload;
//       state.isAuthenticated = true;
//       state.user = { email, username };
//       state.error = null;
//     },

//     // Handle the login action
//     login: (
//       state,
//       action: PayloadAction<{ email: string; password: string }>
//     ) => {
//       axios
//         .post("http://localhost:5000/api/auth/login", action.payload)
//         .then((response) => {
//           const token = response.data.token; // Assuming token is returned in the response
//           localStorage.setItem("authToken", token); // Store token in localStorage

//           // Decode the token to get user info
//           const decodedToken = jwtDecode<CustomJwtPayload>(token); // Use custom JwtPayload type
//           state.isAuthenticated = true;
//           state.user = {
//             email: decodedToken.email,
//             username: decodedToken.username,
//           };
//           state.error = null;
//         })
//         .catch((error) => {
//           state.isAuthenticated = false;
//           state.user = null;
//           state.error = error.response
//             ? error.response.data.message
//             : "Login failed!";
//         });
//     },

//     // Handle the logout action
//     logout: (state) => {
//       localStorage.removeItem("authToken"); // Remove token from localStorage
//       state.isAuthenticated = false;
//       state.user = null;
//       state.error = null;
//     },

//     // Check authentication status from token stored in localStorage
//     checkAuth: (state) => {
//       const token = localStorage.getItem("authToken");
//       if (token) {
//         // Decode the token
//         const decodedToken = jwtDecode<CustomJwtPayload>(token);

//         // Check if the token is expired
//         const currentTime = Date.now() / 1000; // Current time in seconds
//         if (decodedToken.exp > currentTime) {
//           state.isAuthenticated = true;
//           state.user = {
//             email: decodedToken.email,
//             username: decodedToken.username,
//           };
//         } else {
//           state.isAuthenticated = false;
//           state.user = null;
//           localStorage.removeItem("authToken"); // Remove expired token
//         }
//       } else {
//         state.isAuthenticated = false;
//         state.user = null;
//       }
//     },
//   },
// });

// export const { register, login, logout, checkAuth } = authSlice.actions;

// export default authSlice.reducer;
