"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Button from "../general/Button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Product } from "@/types";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductCartItem({ product }: ProductsSliderItemProps) {
  // Rating
  const [isHovered, setIsHovered] = useState(false);

  console.log(product.colorSize);

  return (
    <div
      className="group flex flex-col justify-between space-y-2   transition duration-300  relative
    min-h-[700px]  md:border-none "
    >
      {/* Görsel Alanı */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full min-h-[600px] bg-center bg-cover"
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

        {product.discountPrice > 0 && product.price > 0 && (
          <div className="absolute right-3 top-5 md:top-2 lg:top-3 w-12 h-6 flex justify-center items-center bg-red-600 text-mywhite rounded text-sm shadow-md z-30">
            %
            {Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            )}
          </div>
        )}
      </Link>

      {/* Renk Seçenekleri */}
      <div className="flex items-start justify-start flex-wrap gap-2 w-full">
        {product.colorSize.map((color, index) => (
          <div key={index} className="relative w-16 h-8">
            <Image
              className="object-cover rounded border border-gray-300"
              src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${color.images[0]}`}
              alt={product?.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Ürün Detayları */}
      <div className=" flex flex-col space-y-1  gap-2 w-full">
        <h2 className="font-medium text-lg   text-secondary   ">
          {product.name}
        </h2>

        <div className="flex  flex-row justify-between items-center">
          {product.discountPrice > 0 &&
          product.discountPrice !== product.price ? (
            <div className="flex flex-col justify-center items-start">
              <p className="text-xs line-through text-red-600 ">
                {product.price}₺
              </p>
              <p className="text-green-600 font-semibold">
                {product.discountPrice}₺
              </p>
            </div>
          ) : (
            <p className="text-green-600 font-semibold">{product.price}₺</p>
          )}

          <Link
            className="flex items-center justify-center "
            href={`/product/${product.slug}`}
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
