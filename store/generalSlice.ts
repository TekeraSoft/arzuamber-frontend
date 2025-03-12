import { getGuardRequest } from "@/services/requestservice";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Sepet Tipi
export interface CartState {
  homesliderImages: [];
  loading: boolean;
}

// Başlangıç durumu (initialState)
const initialState: CartState = {
  homesliderImages: [],
  loading: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    getHomeSliders: (state, action) => {
      state.homesliderImages = action.payload._embedded?.productDtoes;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const getlAllHomeSliderImages = () => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "slider", action: "get-all-slider" })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getHomeSliders(res.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

// Reducer'ları dışa aktarma
export const { getHomeSliders, loading } = generalSlice.actions;

export default generalSlice.reducer;
