import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postGuardRequest } from "./../services/requestservice";
import { toast } from "react-toastify";

// Kullanıcı siparişlerini almak için async thunk oluştur
export const getUserOrders = createAsyncThunk(
  "user/getUserOrders",
  async (value: { email: string }, { rejectWithValue }) => {
    try {
      const res = await postGuardRequest(
        { controller: "admin", action: "user-orders" },
        value
      );
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data || "Bir hata oluştu");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Başlangıç state
const initialState = {
  orders: {},
  loading: false,
};

// Slice oluştur
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Reducer'ı dışa aktarma
export default userSlice.reducer;
