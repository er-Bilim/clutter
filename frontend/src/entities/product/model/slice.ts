import { createSlice } from "@reduxjs/toolkit";
import type {
  IGlobalError,
  IValidationError,
} from "../../../shared/types/error.types";
import type { IProduct } from "./types";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
} from "./thunk";

interface ProductState {
  products: IProduct[];
  product: IProduct | null;
  loading: {
    fetchLoading: boolean;
    deleteLoading: boolean;
    createLoading: boolean;
  };
  errors: {
    createError: IValidationError | null;
    deleteError: IGlobalError | null;
    fetchError: IGlobalError | null;
  };
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: {
    fetchLoading: false,
    deleteLoading: false,
    createLoading: false,
  },
  errors: {
    fetchError: null,
    deleteError: null,
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
        state.products = products;
      },
    );
    builder.addCase(getAllProducts.rejected, (state, { payload: error }) => {
      state.loading.fetchLoading = false;
      state.errors.fetchError = error || null;
    });

    builder.addCase(getProductByID.pending, (state) => {
      state.loading.fetchLoading = true;
      state.errors.fetchError = null;
    });

    builder.addCase(getProductByID.fulfilled, (state, { payload: product }) => {
      state.loading.fetchLoading = false;
      state.product = product;
    });

    builder.addCase(getProductByID.rejected, (state, { payload: error }) => {
      state.loading.fetchLoading = false;
      state.errors.fetchError = error || null;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.loading.createLoading = true;
      state.errors.createError = null;
    });

    builder.addCase(createProduct.fulfilled, (state) => {
      state.loading.createLoading = false;
    });

    builder.addCase(createProduct.rejected, (state, { payload: error }) => {
      state.loading.createLoading = false;
      state.errors.createError = error || null;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading.deleteLoading = true;
      state.errors.deleteError = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.product = null;
      state.loading.deleteLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, { payload: error }) => {
      state.loading.deleteLoading = false;
      state.errors.deleteError = error || null;
    });
  },
});

export const productReducer = productSlice.reducer;
