import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favReducer from "./favoritesSlice";
import productReducer from "./productSlice";
import generalReducer from "./generalSlice";
import categoryReducer from "./categorySlice";
import blogsReducer from "./blogSlice";
import footerReducer from "./footerSlice";
import authReducer from "./authSlice";
import modalsReducer from "./modalsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favReducer,
    products: productReducer,
    categories: categoryReducer,
    blogs: blogsReducer,
    general: generalReducer,
    auth: authReducer,
    modals: modalsReducer,
    footer: footerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
