import { createSlice } from "@reduxjs/toolkit";
import { postGuardRequest } from "@/services/requestservice";
import { toast } from "react-toastify";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderLoading: false,
  },
  reducers: {
    loading: (state, action) => {
      state.orderLoading = action.payload;
    },
  },
});

export const createPayAtDoor = (value: object, router) => async (dispatch) => {
  dispatch(loading(true));
  postGuardRequest(
    { controller: "order", action: "create-pay-at-door-order" },
    value
  )
    .then((res) => {
      dispatch(loading(false));
      router.push("/tr/payment-success");
      toast.success(res.data?.message);
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response?.data);
    });
};

export const { loading } = orderSlice.actions;
export default orderSlice.reducer;
