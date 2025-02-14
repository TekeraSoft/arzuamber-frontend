"use client";

import { useState } from "react";
import Image from "next/image";
import TextClip from "../utils/TextClip";
import { Link } from "@/i18n/routing";
import Button from "../general/Button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import {Product} from "@/types";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductCartItem({ product }: ProductsSliderItemProps) {
  // Rating
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("");

  return (
    <div
      className="group flex flex-col justify-between space-y-1  bg-white transition duration-300  relative
     h-[650px] md:h-[600px]  md:border-none "
    >
      {/* Görsel Alanı */}
      <div
        className="relative w-full h-full bg-center bg-cover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-cover rounded  md:rounded-none transition-opacity duration-700  ${
            isHovered ? "opacity-0" : "opacity-100 z-30"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[0]}`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <Image
          className={` object-cover rounded md:rounded-none transition-opacity duration-700  ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[1]}`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className=" absolute right-3 top-5 md:top-2 lg:top-3  w-12 h-6 flex justify-center items-center bg-red-600 text-mywhite rounded text-sm shadow-md z-30 ">
          %{Math.round(product.discountPrice)}
        </div>
      </div>

      {/* Ürün Detayları */}
      <div className=" flex flex-col space-y-1  gap-2 w-full">
        <h2 className="font-medium text-xl  text-secondary  ">
          {product.name}
        </h2>

        <div className="flex  lex-row justify-between items-center">
          <div className="flex  md:flex-col-reverse flex-row items-start justify-center  gap-2">
            <p className="text-green-600 font-bold text-base">
              {(
                product.price -
                (product.price * product.discountPrice) / 100
              ).toFixed(2)}
              {t("productDetail.priceSymbol")}
            </p>
            <p className="text-red-700 text-sm line-through">
              {product.price} {t("productDetail.priceSymbol")}
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
              className="h-8"
              animation
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
