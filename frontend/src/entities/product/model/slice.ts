import { createSlice } from "@reduxjs/toolkit";
import type {
  IGlobalError,
  IValidationError,
} from "../../../shared/types/error.types";
import type { IProduct } from "./types";
import { getAllProducts } from "./thunk";

interface ProductState {
  products: IProduct[];
  loading: {
    fetchLoading: boolean;
    createLoading: boolean;
  };
  errors: {
    createError: IValidationError | null;
    fetchError: IGlobalError | null;
  };
}

const initialState: ProductState = {
  products: [],
  loading: {
    fetchLoading: false,
    createLoading: false,
  },
  errors: {
    fetchError: null,
    createError: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading.fetchLoading = true;
      state.errors.fetchError = null;
    });
    builder.addCase(
      getAllProducts.fulfilled,
      (state, { payload: products }) => {
        state.loading.fetchLoading = false;
        state.errors.fetchError = null;
        state.products = products;
      },
    );
    builder.addCase(getAllProducts.rejected, (state, { payload: error }) => {
      state.loading.fetchLoading = false;
      state.errors.fetchError = error || null;
    });
  },
});

export const productReducer = productSlice.reducer;
