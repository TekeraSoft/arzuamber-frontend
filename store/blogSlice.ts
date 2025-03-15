import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "@/types";
import { getGuardRequest } from "@/services/requestservice";
import { toast } from "react-toastify";

export interface BlogProps {
  blogs: Blog[];
  blog: Blog;
  loading: boolean;
  error: boolean;
}

const initialState: BlogProps = {
  blogs: [],
  page: {},
  loading: false,
  error: true,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogs: (state, action) => {
      state.blogs = action.payload._embedded.blogDtoes;
      state.page = action.payload.page;
    },
    getBlog: (state, action) => {
      state.blog = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const getBlogsDispatch =
  (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "blog",
      action: "get-all-blog",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(getBlogs(res?.data));
        dispatch(loading(false));
      })
      .catch((err) => {
        toast.error(err.response?.data);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getBlogDispatch = (slug: string) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "blog",
    action: "get-blog",
    params: { slug: slug },
  })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getBlog(res.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

export const { getBlogs, getBlog, loading } = blogSlice.actions;
export default blogSlice.reducer;
