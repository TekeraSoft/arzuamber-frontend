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
  subcategories: string;
  length: string;
  inStock: boolean;
  discountPercent: number;
  images: string[];
  reviews: Review[];
  isNewSeason: boolean;
  isPopulate: boolean;
  sizes: string[];
  colors: { name: string; imageUrl: string }[];
}

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
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  tags: string[];
}

//! Cart Page Props

export interface CartSummaryProps {
  total: number;
  tax: number;
  savings: number;
}

//! Fav Page Props
export interface FavSummaryProps {
  total: number;
  tax: number;
  savings: number;
}
