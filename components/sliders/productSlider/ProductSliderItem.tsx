"use client";

import { useState } from "react";

// import { HiCheckCircle, HiXCircle } from "react-icons/hi";

import Image from "next/image";
import TextClip from "../../utils/TextClip";

import { Rating } from "@mui/material";
import { Product, Review } from "@/types/Props";
import { Link } from "@/i18n/routing";
import Button from "@/components/general/Button";
import { FaLongArrowAltRight } from "react-icons/fa";
// import { CartItem } from "@/store/cartSlice";
// import { FavItem } from "@/store/favoritesSlice";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductsSliderItem({ product }: ProductsSliderItemProps) {
  // IMAGE HOVER
  const [isHovered, setIsHovered] = useState(false);

  // Rating
  const productRating =
    product?.reviews && product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, item: Review) => acc + (item.rating || 0),
          0
        ) / product.reviews.length
      : 0;

  const ratingResult = isNaN(productRating) ? 0 : productRating;

  return (
    <div className="flex justify-center items-center flex-col space-y-1  rounded-lg   transition duration-500 h-[500px] p-6 w-[300px] relative ">
      <div
        className="w-[300px] md:w-[400px] h-[350px] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-contain  rounded transition-opacity duration-700  ${
            isHovered ? "opacity-0" : "opacity-100 z-20"
          }`}
          src={product?.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <Image
          className={` object-contain rounded transition-opacity duration-700  ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          src={product?.images[1]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <div className="flex justify-between items-center w-full mt-1">
          <h2 className="text-start text-secondary font-bold text-md  rounded-lg w-full ">
            {TextClip(product?.name)}
          </h2>
          <Rating
            name="read-only"
            value={ratingResult}
            precision={0.5}
            readOnly
            size="small"
          />
        </div>

        <hr className="w-full" />

        <div className="flex  lex-row justify-between items-center w-full">
          <div className="flex flex-row items-start justify-center gap-2">
            <p className="text-green-600 font-bold text-sm">
              {(
                product.price -
                (product.price * product.discountPercent) / 100
              ).toFixed(2)}
              ₺
            </p>
            <p className="text-red-700 text-sm line-through">
              {product.price}₺
            </p>
          </div>
          <Link
            className="flex items-center justify-center "
            href={`/product/${product.id}`}
          >
            <Button
              text="Detail"
              icon={FaLongArrowAltRight}
              size="large"
              iconSize={16}
              color="third"
              className="h-8 text-xs"
              animation
            />
          </Link>
        </div>
      </div>
      {/* <div className="flex items-center justify-center w-full">
        {product.inStock ? (
          <small className="flex items-center justify-center bg-secondary text-white text-md px-2 py-1 rounded-full w-full ">
            <HiCheckCircle className="mr-1" />
            In Stock
          </small>
        ) : (
          <small className="flex items-center justify-center bg-third text-white text-md  px-2 py-1 rounded-full w-full ">
            <HiXCircle className="mr-1" />
            Out of Stock
          </small>
        )}
      </div> */}
    </div>
  );
}

export default ProductsSliderItem;
