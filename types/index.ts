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
  loading: boolean;
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
  stockSize: { size: string; stock: number }[];
  images: string[];
};
