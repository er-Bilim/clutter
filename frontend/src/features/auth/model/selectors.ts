import type { RootState } from "../../../app/store/store";

export const selectUser = (state: RootState) => state.auth.user;

export const selectRegisterLoading = (state: RootState) =>
  state.auth.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.auth.registerError;

export const selectLoginLoading = (state: RootState) => state.auth.loginLoading;
export const selectLoginError = (state: RootState) => state.auth.loginError;

export const selectLogoutLoading = (state: RootState) =>
  state.auth.logoutLoading;
export const selectLogoutError = (state: RootState) => state.auth.logoutError;
