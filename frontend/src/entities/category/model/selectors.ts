import type { RootState } from "../../../app/store/store";

export const selectCategories = (state: RootState) => state.category.categories;
export const selectFetchLoading = (state: RootState) =>
  state.category.fetchLoading;
export const selectFetchError = (state: RootState) => state.category.fetchError;
