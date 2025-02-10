import {Category} from "@/types/Props";

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
}

export type Product = {
  name: string;
  slug: string;
  populate: boolean;
  category: string;
  subCategory: string,
  description: string;
  price: number;
  discountPrice: number;
  colorSize: ColorSize
}

export type ColorSize = {
  color: string;
  size: string;
  stock: number;
  images: string[]
}
