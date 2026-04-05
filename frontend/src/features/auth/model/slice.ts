import { createSlice } from "@reduxjs/toolkit";
import type {
  IGlobalError,
  IValidationError,
} from "../../../shared/types/error.types";
import type { IUser } from "./types";
import { login, logout, register } from "./thunks";

interface AuthState {
  user: IUser | null;

  logoutLoading: boolean;

  registerLoading: boolean;
  registerError: IValidationError | null;

  loginLoading: boolean;
  loginError: IGlobalError | null;

  logoutError: IGlobalError | null;
}

const initialState: AuthState = {
  user: null,
  logoutLoading: false,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logoutError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });

    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.user = user;
      state.registerLoading = false;
    });

    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });

    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.user = user;
      state.loginLoading = false;
    });

    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutError = null;
      state.logoutLoading = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.loginLoading = false;
    });

    builder.addCase(logout.rejected, (state, { payload: error }) => {
      state.logoutLoading = false;
      state.logoutError = error || null;
    });
  },
});

export const { unsetUser, clearLoginError } = authSlice.actions;
export const authReducer = authSlice.reducer;
