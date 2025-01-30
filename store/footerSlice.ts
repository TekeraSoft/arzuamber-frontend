// src/store/footerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},
});

export default footerSlice.reducer;
