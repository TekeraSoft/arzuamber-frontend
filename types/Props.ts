// import { IconType } from "react-icons";

//! Review User
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  phoneNumber: string;
}

//! Review Props
export interface Review {
  id: string;
  userId: string;
  productId: string;
  comment: string;
  rating: number;
  createDate: string;
  user: User;
}

//! Product Props
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  length: string;
  discountPrice: number;
  colorSize: ColorSize;
}

export type ColorSize = {
  color: string;
  size: string;
  stock: number;
  images: string[];
};

//! Cart adding Props

export type CardProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
  size: string;
  color: string;
  discountPercent: number;
};

//! Product Select Modal  Props

export type ProductSelectModalProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
  sizes: string[];
  colors: string[];
  discountPercent: number;
};

//! Category Props
export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}

//! BlogProps
export interface BlogProps {
  category: string;
  title: string;
  content: string;
  image: string;
}

//! Cart Page Props

export interface CartSummaryProps {
  total: number;
}

//! Fav Page Props
export interface FavSummaryProps {
  total: number;
  tax: number;
}

//! Slider Product
export interface ProductSliderProps {
  showNewSeason?: boolean;
  isPopulate?: boolean;
}

//! ArrowProps
export interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

//! Warning page props
export interface WarningTextProps {
  title: string;
  text: string;
  href?: string;
  buttonText: string;
}
