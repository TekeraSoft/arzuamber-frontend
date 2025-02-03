import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Ürün Tipi
export interface FavItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

// Sepet Tipi
export interface CartState {
  favs: FavItem[];
}

// LocalStorage'dan sepete verileri çekme (İstemci tarafında çalıştırılacak)
const fetchFromLocalStorage = (): FavItem[] => {
  if (typeof window !== "undefined") {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      return JSON.parse(favorites);
    }
  }
  return [];
};

// Başlangıç durumu (initialState)
const initialState: CartState = {
  favs: fetchFromLocalStorage(),
};

// LocalStorage'a veri kaydetme
const storeInLocalStorage = (data: FavItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(data));
  }
};

export const cartSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // fav ürün ekleme işlemi
    addToFav: (state, action: PayloadAction<FavItem>) => {
      const isItemCart = state.favs.find((fav) => fav.id == action.payload.id);
      if (isItemCart) {
        const tempFav = state.favs.map((item) => {
          if (item.id == action.payload.id) {
            const tempQuantity = item.quantity + action.payload.quantity;
            return {
              ...item,
              quantity: tempQuantity,
            };
          } else {
            return item;
          }
        });

        state.favs = tempFav;
        storeInLocalStorage(state.favs);
      } else {
        state.favs.push(action.payload);
        storeInLocalStorage(state.favs);
      }
    },

    // Sepetten ürün silme işlemi
    removeFromFav: (state, action: PayloadAction<string>) => {
      const tempFav = state.favs.filter((item) => item.id != action.payload);
      state.favs = tempFav;
      storeInLocalStorage(state.favs);
    },
    clearFav: (state) => {
      state.favs = [];
      storeInLocalStorage(state.favs);
      // toast.warning(t("productDetail.productsClearedFav"));
    },
  },
});

// Reducer'ları dışa aktarma
export const { addToFav, removeFromFav, clearFav } = cartSlice.actions;

export default cartSlice.reducer;
