import { createSlice } from "@reduxjs/toolkit";
import { getGuardRequest } from "@/services/requestservice";
import { toast } from "react-toastify";
import { Category } from "@/types";

export interface CartState {
  categories: Category[];
  loading: boolean;
}

const initialState: CartState = {
  categories: [],
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
    },
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

export const { getCategories, loading } = categorySlice.actions;

export default categorySlice.reducer;
