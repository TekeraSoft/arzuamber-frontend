// src/store/footerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socialLinks: {
    facebook: "https://www.facebook.com/profile.php?id=61572463754368",
    instagram: "https://www.instagram.com/arzuamber.moda",
    whatsapp: "https://wa.me/905342608385",
  },
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},
});

export default footerSlice.reducer;
