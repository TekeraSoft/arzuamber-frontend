import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Ürün Tipi
export interface CartItem {
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
  carts: CartItem[];
}

// LocalStorage'dan sepete verileri çekme (İstemci tarafında çalıştırılacak)
const fetchFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    }
  }
  return [];
};

// Başlangıç durumu (initialState)
const initialState: CartState = {
  carts: fetchFromLocalStorage(),
};

// LocalStorage'a veri kaydetme
const storeInLocalStorage = (data: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(data));
  }
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    // Sepete ürün ekleme işlemi
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const isItemCart = state.carts.find(
        (cart) => cart.id == action.payload.id
      );
      if (isItemCart) {
        const tempCart = state.carts.map((item) => {
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

        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },

    // Sepetten ürün silme işlemi
    removeFromCart: (state, action: PayloadAction<string>) => {
      const tempCart = state.carts.filter((item) => item.id != action.payload);
      state.carts = tempCart;
      toast.success("Product Deleted From Cart !");
      storeInLocalStorage(state.carts);
    },
    clearCart: (state) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },
  },
});

// Reducer'ları dışa aktarma
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
