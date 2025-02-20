// src/store/footerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socialLinks: {
    facebook: "https://www.facebook.com/profile.php?id=61572463754368",
    instagram: "https://www.instagram.com/arzuamber.moda",
    whatsapp:
      "https://api.whatsapp.com/message/5BSDWLJIL4BSL1?autoload=1&app_absent=0",
  },
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},
});

export default footerSlice.reducer;
