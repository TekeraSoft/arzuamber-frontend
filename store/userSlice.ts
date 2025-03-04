import { createSlice } from "@reduxjs/toolkit";
import { getGuardRequest } from "./../services/requestservice";
import { toast } from "react-toastify";

// Başlangıç state
const initialState = {
  orders: [],
  loading: false,
};

// Slice oluştur
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const getUserOrdersDispatch = (email: string) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "order",
    action: "get-user-orders",
    params: { email: email },
  })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getOrders(res.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

export const { getOrders, loading } = userSlice.actions;
export default userSlice.reducer;
