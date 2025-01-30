import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favReducer from "./favoritesSlice";
import productReducer from "./productSlice";
import generalReducer from "./generalSlice";
import categoryReducer from "./categorySlice";
import footerReducer from "./footerSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favReducer,
    products: productReducer,
    categories: categoryReducer,
    general: generalReducer,
    auth: authReducer,

    footer: footerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
