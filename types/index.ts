export type RequestOptions = {
  id?: string;
  controller: string;
  lang?: string;
  action?: string;
  params?: object;
};

export interface AdminProps {
  product: Product;
  products: Product[];
  categories: Category[];
  colors: Color[];
  orders: Order[];
  blogs: Blog[];
  sliders: Slider[];
  loading: boolean;
  blogPage: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
  contactForms: [];
}

export type Slider = {
  id: string;
  url: string;
  lang: string;
  isActive: boolean;
};

export type Order = {
  buyer: Buyer;
  shippingAddress: ShippingAddress;
  basketItems: OrderBasketItem[];
  totalPrice: number;
  status: string;
  paymentId: string;
};

export type Buyer = {
  name: string;
  surname: string;
  gsmNumber: string;
  email: string;
  ip: string;
  identityNumber: string;
};

export type ShippingAddress = {
  contactName: string;
  city: string;
  state: string;
  country: string;
  address: string;
  street: string;
  zipCode: string;
};

export type OrderBasketItem = {
  name: string;
  price: string;
  quantity: number;
  size: string;
  color: string;
  stockSizeId: string;
  stockCode: string;
};

export type Color = {
  name: string;
};

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
  image: string;
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

export type Blog = {
  title: string;
  category: string;
  image: string;
  content: string;
  createdAt: string;
};

export interface PaymentFormValues {
  paymentCard: {
    cardHolderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
    cvc: string;
  };
  buyer: {
    id: string;
    name: string;
    surname: string;
    gsmNumber: string;
    email: string;
    identityNumber: string;
    ip: string;
    lastLoginDate: string;
    registrationDate: string;
  };
  shippingAddress: {
    contactName?: string;
    city: string;
    state?: string;
    country: string;
    address: string;
    street?: string;
    zipCode: string;
  };
  billingAddress: {
    contactName?: string;
    city: string;
    country: string;
    state?: string;
    address: string;
    zipCode: string;
    street?: string;
    apartment?: string;
  };
}

export interface CarouselType {
  id: string;
  url: string;
  lang: string;
}
