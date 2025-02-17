import {createSlice} from "@reduxjs/toolkit";

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
      total: 0,
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
  };
};

interface CartState {
  cartProducts: CartItem[];
  total: number;
}
const initialState = getInitialState()

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    // Sepete ürün ekleme işlemi
    addToCart: (state, action) => {
      const {size, color, name, id, image, price, quantity} = action.payload
      const existingProduct = state.cartProducts.find((p) => p.id === id && p.color === color);
      if (existingProduct) {
          state.total = price * quantity;
          existingProduct.quantity = quantity;
      } else {
        state.cartProducts.push(action.payload);
        state.total += price * action.payload.quantity;
      }
      localStorage.setItem('cart',JSON.stringify({cartProducts:state.cartProducts,total:state.total}))
    },

    //Sepetten ürün silme işlemi
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
          (item) => !(item.id === action.payload.id && item.color === action.payload.color)
      );
      state.total = state.cartProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
      );
      localStorage.setItem(
          "cart",
          JSON.stringify({ cartProducts: state.cartProducts, total: state.total })
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
      state.total = 0;
      localStorage.removeItem('cart');
      // toast.warning(t("productDetail.productsClearedCart"));
    },
  },
});

// Reducer'ları dışa aktarma
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
