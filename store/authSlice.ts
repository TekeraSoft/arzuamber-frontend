import { postGuardRequest } from "./../services/requestservice";
import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";
import { user } from "@/constans/User";

const initialState = {
  // user: {},
  user: user,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const registerUserDispatch = (value: object,resetForm:()=> void) => async () => {
  postGuardRequest({ controller: "auth", action: "register" }, value)
    .then((res) => {
      toast.success(res.data.message);
      resetForm()
    })
    .catch((err) => {
      toast.error(err.response.data);
    });
};

// Reducer'ları dışa aktarma
export const {} = authSlice.actions;

export default authSlice.reducer;
