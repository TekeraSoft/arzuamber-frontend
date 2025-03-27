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
import blogsReducer from "@/store/blogSlice";
import userReducer from "@/store/userSlice";
import searchSlice from "@/store/searchSlice";
import orderSlice from "@/store/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favs: favReducer,
    products: productReducer,
    category: categoryReducer,
    general: generalReducer,
    blog: blogsReducer,
    user: userReducer,
    auth: authReducer,
    admin: adminSlice,
    footer: footerReducer,
    modals: modalsSlice,
    search: searchSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
