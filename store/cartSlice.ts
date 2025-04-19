import { createSlice } from "@reduxjs/toolkit";
import { postGuardRequest } from "@/services/requestservice";

// Ürün Tipi
export interface CartItem {
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
      cartProducts: [],
      orderSummaryProducts: [],
      total: 0,
      loading: false,
    };
  }

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    return {
      cartProducts: parsedCart.cartProducts || [],
      total: parsedCart.total || 0,
    };
  }
  return {
    cartProducts: [],
    total: 0,
    orderSummaryProducts: [],
  };
};

const initialState = getInitialState();

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    // Sepete ürün ekleme işlemi
    addToCart: (state, action) => {
      state.loading = true;
      const { size, color, id, quantity } = action.payload;
      const existingProduct = state.cartProducts.find(
        (p) => p.id === id && p.color === color && p.size === size
      );
      if (existingProduct) {
        existingProduct.quantity = quantity;
        state.total = state.cartProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      } else {
        state.cartProducts.push(action.payload);
        state.total = state.cartProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartProducts: state.cartProducts,
          total: state.total,
        })
      );
      state.loading = false;
    },

    //Sepetten ürün silme işlemi
    removeFromCart: (state, action) => {
      state.loading = true;
      state.cartProducts = state.cartProducts.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          )
      );
      state.total = state.cartProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartProducts: state.cartProducts,
          total: state.total,
        })
      );
      state.loading = false;
    },
    clearCart: (state) => {
      state.loading = false;
      state.cartProducts = [];
      state.total = 0;
      localStorage.removeItem("cart");
    },
    // setOrderSummaryProducts: (state, action) => {
    //   state.orderSummaryProducts = action.payload;
    //   localStorage.setItem(
    //     "orderSummaryProducts",
    //     JSON.stringify(state.orderSummaryProducts)
    //   );
    // },
    clearOrderSummaryProduct: () => {
      localStorage.removeItem("orderSummaryProducts");
    },
  },
});

export const addToCartNotification = (value: object) => async () => {
  postGuardRequest({ controller: "product", action: "add-to-cart" }, value);
};

// Reducer'ları dışa aktarma
export const {
  addToCart,
  removeFromCart,
  clearCart,
  clearOrderSummaryProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
