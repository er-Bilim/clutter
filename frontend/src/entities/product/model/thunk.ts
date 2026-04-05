import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IProduct } from "./types";
import axiosApi from "../../../shared/api/axiosApi";
import type { IGlobalError } from "../../../shared/types/error.types";
import { isAxiosError } from "axios";

export const getAllProducts = createAsyncThunk<
  IProduct[],
  string | null,
  { rejectValue: IGlobalError }
>("product/getAll", async (category, { rejectWithValue }) => {
  try {
    let url: string = "/products";

    if (category) {
      url += `?category=${category}`;
    }

    const response = await axiosApi.get<IProduct[]>(url);
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

export const getProductByID = createAsyncThunk<
  IProduct,
  string,
  { rejectValue: IGlobalError }
>("product/getProductByID", async (product_id, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IProduct>(`/products/${product_id}`);
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
