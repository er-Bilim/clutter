import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IGlobalError,
  IValidationError,
} from "../../../shared/types/error.types";
import type { ILoginMutation, IRegisterMutation, IUser } from "./types";
import axiosApi from "../../../shared/api/axiosApi";
import { isAxiosError } from "axios";
import type { RootState } from "../../../app/store/store";
import { toast } from "react-toastify";

export const register = createAsyncThunk<
  IUser,
  IRegisterMutation,
  { rejectValue: IValidationError }
>("users/register", async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post("/users/register", registerMutation);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.status === 400) {
        return rejectWithValue(error.response.data);
      }
    }

    throw error;
  }
});

export const login = createAsyncThunk<
  IUser,
  ILoginMutation,
  { rejectValue: IGlobalError }
>("users/login", async (LoginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post("/users/login", LoginMutation);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }

    throw error;
  }
});

export const logout = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: IGlobalError }
>("users/logout", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.user?.token;
    const response = await axiosApi.delete("/users/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const message = response.data.message;
    toast.success(message);
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        rejectWithValue(error.response.data);
      }
    }

    throw error;
  }
});
