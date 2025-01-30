import { createSlice } from "@reduxjs/toolkit";
//  PayloadAction

import { products } from "@/constans/Product";
import { Product } from "@/types/Props";

// Sepet Tipi
export interface CartState {
  products: Product[];
  //   product: Product |null;
  loading: boolean;
}

// Başlangıç durumu (initialState)
const initialState: CartState = {
  products: products,
  //   product:{}
  loading: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

// Reducer'ları dışa aktarma
export const {} = productSlice.actions;

export default productSlice.reducer;
