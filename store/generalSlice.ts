import { carouselList, CarouselType } from "@/constans/HomeSlider";
import { createSlice } from "@reduxjs/toolkit";

// Sepet Tipi
export interface CartState {
  images: CarouselType[];
  //   product: Product |null;
  loading: boolean;
}

// Başlangıç durumu (initialState)
const initialState: CartState = {
  images: carouselList,
  loading: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
});

// Reducer'ları dışa aktarma
export const {} = generalSlice.actions;

export default generalSlice.reducer;
