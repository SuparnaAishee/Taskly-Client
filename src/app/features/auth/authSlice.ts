import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; username: string };
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

// Define a slice for authentication, with login, register, and logout actions
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload;
      // In a real scenario, check credentials against an API
      if (email === "test@example.com" && password === "password") {
        state.isAuthenticated = true;
        state.user = { email, username: "TestUser" };
        state.error = null;
      } else {
        state.error = "Invalid credentials";
      }
    },
    register: (
      state,
      action: PayloadAction<{ email: string; username: string }>
    ) => {
      const { email, username } = action.payload;
      // In a real scenario, create the user in your backend
      state.isAuthenticated = true;
      state.user = { email, username };
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;
