import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { clearAuthState, loadAuthState, saveAuthState } from './authStorage';

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export interface AuthState {
  admin: AdminUser | null;
  token: AuthToken | null;
}

const persistedState = loadAuthState();

const initialState: AuthState = {
  admin: persistedState.admin,
  token: persistedState.token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        admin: AdminUser;
        token: AuthToken;
      }>,
    ) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      saveAuthState({
        admin: state.admin,
        token: state.token,
      });
    },
    setAdmin: (state, action: PayloadAction<AdminUser>) => {
      state.admin = action.payload;
      saveAuthState({
        admin: state.admin,
        token: state.token,
      });
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      clearAuthState();
    },
  },
});

export const { logout, setAdmin, setCredentials } = authSlice.actions;
export default authSlice.reducer;
