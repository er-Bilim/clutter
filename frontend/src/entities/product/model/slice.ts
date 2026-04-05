import { createSlice } from "@reduxjs/toolkit";
import type {
  IGlobalError,
  IValidationError,
} from "../../../shared/types/error.types";
import type { IProduct } from "./types";
import { getAllProducts, getProductByID } from "./thunk";

interface ProductState {
  products: IProduct[];
  product: IProduct | null;
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
  product: null,
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
  },
});

export const productReducer = productSlice.reducer;
