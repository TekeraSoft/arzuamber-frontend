import { postGuardRequest } from "@/services/requestservice";
import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";
import { user } from "@/constans/User";

const initialState = {
  errorState: '',
  user: user,
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
    removeErrorState: (state, action) => {
      state.errorState = action.payload;
    }
  },
});

export const registerUserDispatch = (value: object,resetForm:()=> void, handleChangeModal: any) => async (dispatch) => {
  postGuardRequest({ controller: "auth", action: "register" }, value)
    .then((res) => {
      toast.success(res.data.message);
      resetForm()
      handleChangeModal()
    })
    .catch((err) => {
      dispatch(setErrorState(err.response.data))
    }).finally(()=> {
      null
  })
};

// Reducer'ları dışa aktarma
export const {setErrorState,removeErrorState} = authSlice.actions;

export default authSlice.reducer;
