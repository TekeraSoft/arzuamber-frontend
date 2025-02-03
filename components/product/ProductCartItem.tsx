"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import Image from "next/image";

import { Rating } from "@mui/material";
import TextClip from "../utils/TextClip";

import { Product, Review } from "@/types/Props";
import { Link } from "@/i18n/routing";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductCartItem({ product }: ProductsSliderItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const productRating =
    product?.reviews && product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, item: Review) => acc + (item.rating || 0),
          0
        ) / product.reviews.length
      : 0;

  const ratingResult = isNaN(productRating) ? 0 : productRating;

  return (
    <div
      className="group flex flex-col justify-between shadow-md border  rounded-lg bg-white hover:shadow-xl transition duration-300 overflow-hidden relative h-[500px] "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Görsel Alanı */}
      <div className="relative w-full h-full bg-center bg-cover">
        <Image
          src={isHovered ? product?.images[1] : product?.images[0]}
          alt={product.name}
          fill
          className="object-contain  p-3  transition-all duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-8 md:left-14 lg:left-14  xl:left-16  top-5   flex flex-col gap-2 opacity-100 group-hover:opacity-100 transition-opacity md:opacity-0">
          <button className="w-8 h-8 grid items-center justify-center bg-primary text-mywhite rounded-lg hover:bg-primaryLight hover:scale-110 transition-all shadow-md">
            <IoCart className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 grid items-center justify-center bg-secondary text-mywhite rounded-lg hover:bg-secondaryLight hover:text-primary hover:scale-110 transition-all shadow-md">
            <FaHeart className="w-4 h-4 " />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-8 h-8 grid items-center justify-center bg-third text-mywhite rounded-lg hover:bg-thirdLight hover:scale-110 transition-all shadow-md"
          >
            <IoMdEye className="w-4 h-4" />
          </Link>
        </div>
        <div className=" absolute right-8  md:right-14  lg:right-7 xl:right-16 lg:top-5 top-5 md:top-5 w-9 h-6 flex justify-center items-center bg-ratingcolor text-mywhite rounded text-sm shadow-md ">
          %{Math.round(product.discountPercent)}
        </div>
      </div>

      {/* Ürün Detayları */}
      <div className="p-4 flex flex-col space-y-1  gap-2">
        <div className="flex  lg:flex-row xl:flex-col justify-between items-center w-full gap-2">
          <h2 className="font-bold text-xl xl:text-2xl text-gray-800 ">
            {TextClip(product.name)}
          </h2>

          <Rating
            name="read-only"
            value={ratingResult}
            precision={0.5}
            readOnly
          />
        </div>
        <hr className="bg-black" />

        <div className="flex flex-col items-start justify-center ">
          <p className="text-gray-700 text-md line-through">
            Original: {product.price}₺
          </p>
          <p className="text-green-600 font-bold text-lg">
            Discounted:{" "}
            {(
              product.price -
              (product.price * product.discountPercent) / 100
            ).toFixed(2)}
            ₺
          </p>
        </div>
        <div className="flex items-center justify-center w-full">
          {product.inStock ? (
            <small className="flex items-center justify-center bg-third text-white text-md px-2 py-1 rounded-full w-full ">
              <HiCheckCircle className="mr-1" />
              In Stock
            </small>
          ) : (
            <small className="flex items-center justify-center bg-fourthLight text-white text-md  px-2 py-1 rounded-full w-full ">
              <HiXCircle className="mr-1" />
              Out of Stock
            </small>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
