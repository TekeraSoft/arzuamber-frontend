import { postGuardRequest } from "@/services/requestservice";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorState: "",
  user: {},
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorState: (state, action) => {
      state.errorState = action.payload;
    },
  },
});

export const registerUserDispatch =
  (value: object, resetForm: () => void, handleChangeModal: any, router) =>
  async (dispatch) => {
    postGuardRequest({ controller: "auth", action: "register" }, value)
      .then((res) => {
        toast.success(res.data.message);
        resetForm();
        handleChangeModal();
        router.push("/");
      })
      .catch((err) => {
        dispatch(setErrorState(err.response.data));
      });
  };

// Reducer'ları dışa aktarma
export const { setErrorState } = authSlice.actions;
export default authSlice.reducer;
