import { createSlice } from "@reduxjs/toolkit";
import { getGuardRequest, patchRequest } from "@/services/requestservice";
import { toast } from "react-toastify";

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    users: [],
    page: {},
    loading: false,
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload?._embedded.userAdminDtoes;
      state.page = action.payload?.page;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    changeRole: (state, action) => {
      let user = state.users.find((u) => u.id === action.payload.userId);
      user.role = [action.payload.role];
    },
  },
});

export const getUsersDispatch = (page, size) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "super-admin",
    action: "get-all-users",
    params: { page: page, size: size },
  })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getUsers(res?.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

export const changeUserRoleDispatch =
  (id: string, role: string) => async (dispatch) => {
    dispatch(loading(true));
    patchRequest({
      controller: "super-admin",
      action: "change-role",
      params: { id: id, role: role },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(changeRole({ userId: id, role: role }));
        toast.success(res.data?.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

export const { getUsers, loading, changeRole } = superAdminSlice.actions;
export default superAdminSlice.reducer;
