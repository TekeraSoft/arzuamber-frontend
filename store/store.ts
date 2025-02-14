import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favReducer from "./favoritesSlice";
import productReducer from "./productSlice";
import generalReducer from "./generalSlice";
import categoryReducer from "./categorySlice";
import footerReducer from "./footerSlice";
import authReducer from "./authSlice";
import adminSlice from "@/store/adminSlice";
import modalsSlice from "@/store/modalsSlice";
import blogsReducer from "./blogSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favReducer,
    products: productReducer,
    categories: categoryReducer,
    general: generalReducer,
    blogs: blogsReducer,
    auth: authReducer,
    admin: adminSlice,
    footer: footerReducer,
    modals: modalsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
