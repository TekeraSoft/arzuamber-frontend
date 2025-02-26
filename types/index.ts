export type RequestOptions = {
  id?: string;
  controller: string;
  lang?: string;
  action?: string;
  params?: object;
};

export interface ProductProps {
  product: Product;
  products: Product[];
  categories: Category[];
  colors: Color[];
  orders: Order[];
  loading: boolean;
  page: {size: number; totalElements: number; totalPages: number, number: number};
}

export type Order = {
  buyer: Buyer;
  shippingAddress: ShippingAddress;
  basketItems: OrderBasketItem[];
  totalPrice: number;
  status: string;
  paymentId: string;
}

export type Buyer = {
  name: string;
  surname: string;
  gsmNumber: string;
  email: string;
  ip: string;
  identityNumber: string;
}

export type ShippingAddress = {
  contactName: string;
  city: string;
  state: string;
  country: string;
  address: string;
  street: string;
  zipCode: string;
}

export type OrderBasketItem = {
  name: string;
  price: string;
  quantity: number;
  size: string;
  color: string;
  stockSizeId: string,
  stockCode: string;
}

export type Color = {
  name: string;
}

export type Product = {
  id: string;
  name: string;
  slug: string;
  populate: boolean;
  category: string;
  newSeason: boolean;
  purchasePrice: number;
  subCategory: string;
  description: string;
  price: number;
  length: string;
  discountPrice: number;
  colorSize: ColorSize[];
};

export type Category = {
  id: string;
  name: string;
  subCategories: string[];
  lang: string;
};

export type BasketItem = {
  id: string;
  name: string;
  category1: string;
  category2: string;
  price: number;
  quantity: number;
};

export type ColorSize = {
  color: string;
  stockCode: string;
  stockSize: { id: string; size: string; stock: number }[];
  images: string[];
};
