import { createSlice } from "@reduxjs/toolkit";
import { getGuardRequest } from "@/services/requestservice";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchProducts: [],
    loading: false,
    filterStatus: false,
  },
  reducers: {
    getSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
    },
    clearState: (state) => {
      state.searchProducts = [];
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const searchProductsDispatch =
  (searchTerm: string) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "product",
      action: "search-product",
      params: { searchTerm: searchTerm },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(getSearchProducts(res.data));
      })
      .catch((err) => {
        dispatch(loading(false));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const searechgElement = (formData: any) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "admin", action: "sarch" }).then((res) => {
    dispatch(load);
  });
};

export const { getSearchProducts, clearState, setFilterStatus, loading } =
  searchSlice.actions;
export default searchSlice.reducer;
