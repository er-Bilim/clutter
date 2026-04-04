import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategory } from "./type";
import type { IGlobalError } from "../../../shared/types/error.types";
import { isAxiosError } from "axios";
import axiosApi from "../../../shared/api/axiosApi";

export const getCategories = createAsyncThunk<
  ICategory[],
  void,
  { rejectValue: IGlobalError }
>("category/getCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<ICategory[]>("/categories");
    const data = response.data;

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        rejectWithValue(error.response.data);
      }
    }

    throw error;
  }
});
