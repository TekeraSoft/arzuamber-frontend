import { createSlice } from "@reduxjs/toolkit";

// Ürün Tipi
export interface FavItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

const getInitialState = () => {
  if (typeof window === "undefined") {
    // Eğer sunucu tarafında çalışıyorsa, sadece varsayılan initial state dönüyoruz
    return {
      favsProducts: [],
      total: 0,
      loading: false,
    };
  }

  const savedFavs = localStorage.getItem("favs");
  if (savedFavs) {
    const parsedFavs = JSON.parse(savedFavs);
    return {
      favsProducts: parsedFavs.favsProducts || [],
      total: parsedFavs.total || 0,
    };
  }
  return {
    favsProducts: [],
    total: 0,
  };
};

const initialState = getInitialState();

export const favoritesSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    // Sepete ürün ekleme işlemi
    AddToFav: (state, action) => {
      state.loading = true;
      const { size, color, id, quantity } = action.payload;

      const existingFavs = state.favsProducts.find(
        (p) => p.id === id && p.color === color && p.size === size
      );

      if (existingFavs) {
        // Mevcut ürün varsa, sadece miktarı artır
        existingFavs.quantity += quantity;
      } else {
        // Ürün yoksa, yeni olarak ekle
        state.favsProducts.push(action.payload);
      }

      // Toplam fiyatı güncelle
      state.total = state.favsProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // localStorage güncelle
      localStorage.setItem(
        "favs",
        JSON.stringify({ favsProducts: state.favsProducts, total: state.total })
      );

      state.loading = false;
    },

    //Sepetten ürün silme işlemi
    removeFromFav: (state, action) => {
      state.loading = true;
      state.favsProducts = state.favsProducts.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          )
      );
      state.total = state.favsProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      localStorage.setItem(
        "favs",
        JSON.stringify({ favsProducts: state.favsProducts, total: state.total })
      );
      state.loading = false;
    },

    clearFavs: (state) => {
      state.loading = false;
      state.favsProducts = [];
      state.total = 0;
      localStorage.removeItem("favs");
      state.loading = false;
    },
  },
});

// Reducer'ları dışa aktarma
export const { AddToFav, removeFromFav, clearFavs } = favoritesSlice.actions;

export default favoritesSlice.reducer;
