import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  selectedCategoryName?: string;
  selectedSubCategoryName?: string;
  selectedComplementaryCategoryName?: string;
}

const initialState: CategoryState = {};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<CategoryState>) {
      return action.payload;
    },
    clearSelectedCategory(state) {
      return {};
    },
  },
});

export const { setSelectedCategory, clearSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
