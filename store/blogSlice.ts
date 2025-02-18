import blogs from "@/constans/Blogs";
import { BlogProps } from "@/types/Props";

import { createSlice } from "@reduxjs/toolkit";

export interface blogState {
  blogs: BlogProps[];
  loading: boolean;
  error: boolean;
}

const initialState: blogState = {
  blogs: blogs,
  loading: false,
  error: true,
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
});

export default blogSlice.reducer;
