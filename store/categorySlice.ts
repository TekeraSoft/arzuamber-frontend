import { createSlice } from "@reduxjs/toolkit";
import { getGuardRequest } from "@/services/requestservice";
import { toast } from "react-toastify";
import { Category } from "@/types";

export interface CartState {
  categories: Category[];
  loading: boolean;
  shortCategory: string;
}

const initialState: CartState = {
  categories: [],
  loading: false,
  shortCategory: "",
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
    },
    setShortCategory: (state, action) => {
      state.shortCategory = action.payload;
    },
    resetFilters: (state, action) => {
      state.loading = true;
      state.shortCategory = ""
      state.loading = false
    }
  },
});

export const getCategoriesDispatch = () => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "category", action: "get-categories" })
    .then((res) => {
      dispatch(getCategories(res.data));
      dispatch(loading(false));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const {
  getCategories,
  loading,
  setShortCategory,
  resetFilters} =
  categorySlice.actions;

export default categorySlice.reducer;
