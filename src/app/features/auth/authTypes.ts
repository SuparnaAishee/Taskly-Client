// src/app/features/auth/authTypes.ts

// Define the user type based on your application's requirements
export interface TUser {
  id: string;
  name: string;
  email: string;
  // Add other user fields as necessary
}

// Auth state structure
export interface AuthState {
  user: TUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
}
