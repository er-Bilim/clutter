import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IProduct, IProductMutation } from "./types";
import axiosApi from "../../../shared/api/axiosApi";
import type {
  IGlobalError,
  IValidationError,
} from "../../../shared/types/error.types";
import { isAxiosError } from "axios";
import type { RootState } from "../../../app/store/store";
import { toast } from "react-toastify";

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

export const createProduct = createAsyncThunk<
  void,
  IProductMutation,
  { rejectValue: IValidationError; state: RootState }
>("product/createProduct", async (product, { getState, rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(product) as (keyof IProductMutation)[];

    keys.forEach((key) => {
      const value = product[key];

      if (value) {
        formData.append(key, value);
      }
    });

    const token = getState().auth.user?.token;
    await axiosApi.post("/products", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        rejectWithValue(error.response.data);
      }
    }

    throw error;
  }
});

export const deleteProduct = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: IGlobalError }
>(
  "product/deleteProduct",
  async (product_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      console.log(token);

      const response = await axiosApi.delete(`/products/${product_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          rejectWithValue(error.response.data);
        }
      }

      throw error;
    }
  },
);
