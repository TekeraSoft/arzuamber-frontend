import { getGuardRequest } from "@/services/requestservice";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Sepet Tipi
export interface CartState {
  homeSliderImages: [];
  loading: boolean;
}

// Başlangıç durumu (initialState)
const initialState: CartState = {
  homeSliderImages: [],
  loading: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    getHomeSliders: (state, action) => {
      state.homeSliderImages = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const getAllHomeSliderImages = () => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "slider" })
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
