import { createSlice } from "@reduxjs/toolkit";
import type { IGlobalError } from "../../../shared/types/error.types";
import type { ICategory } from "./type";
import { getCategories } from "./thunk";

interface CategoryState {
  categories: ICategory[];
  fetchLoading: boolean;
  fetchError: IGlobalError | null;
}

const initialState: CategoryState = {
  categories: [],
  fetchLoading: false,
  fetchError: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state, { payload: categories }) => {
        state.fetchLoading = false;
        state.categories = categories;
      },
    );
    builder.addCase(getCategories.rejected, (state, { payload: error }) => {
      state.fetchLoading = false;
      state.fetchError = error || null;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
