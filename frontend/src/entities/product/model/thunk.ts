import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IProduct } from "./types";
import axiosApi from "../../../shared/api/axiosApi";
import type { IGlobalError } from "../../../shared/types/error.types";
import { isAxiosError } from "axios";

export const getAllProducts = createAsyncThunk<
  IProduct[],
  void,
  { rejectValue: IGlobalError }
>("product/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IProduct[]>("/products");
    const data = response.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }

    throw error;
  }
});
