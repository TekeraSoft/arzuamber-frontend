import { categoryList } from "@/constans/Categories";
import { Category } from "@/types/Props";

import { createSlice } from "@reduxjs/toolkit";
import {putGuardRequest} from "@/services/requestservice";
import {toast} from "react-toastify";
import loading = toast.loading;

export interface CartState {
  categories: Category[];
  loading: boolean;
}

const initialState: CartState = {
  categories: categoryList,
  loading: false,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    }
  },
});


export const {} = categorySlice.actions

export default categorySlice.reducer;
