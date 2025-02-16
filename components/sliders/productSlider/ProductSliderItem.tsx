"use client";

import { useState } from "react";

import Image from "next/image";
import { Product } from "@/types/Props";
import { Link } from "@/i18n/routing";
import Button from "@/components/general/Button";
import { FaLongArrowAltRight } from "react-icons/fa";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductsSliderItem({ product }: ProductsSliderItemProps) {
  // IMAGE HOVER
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="flex justify-center items-center flex-col space-y-1  rounded-lg   transition duration-500 h-[500px] p-6 w-[300px] relative ">
      <div
        className="w-[300px] md:w-[400px] h-[350px] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-contain transition-opacity duration-700  ${
            isHovered ? "opacity-0" : "opacity-100 z-20"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[0]}`}
          alt={product?.name}
          fill
        />

        <Image
          className={` object-contain rounded transition-opacity duration-700  ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[1]}`}
          alt={product?.name}
          fill
        />
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <div className="flex justify-between items-center w-full mt-1">
          <h2 className="text-start text-secondary font-bold text-md  rounded-lg w-full ">
              {product.name}
          </h2>

        </div>

        <div className="flex  lex-row justify-between items-center w-full">
          <div className="flex flex-row items-start justify-center gap-2">
            {
                product.discountPrice !== 0 && (
                    <p className="text-red-600 text-lg line-through font-bold">
                      {product.price} ₺
                    </p>
                )
            }
            <p className="text-secondaryDark text-lg font-bold">
              {product.discountPrice === 0 ? product.price : product.discountPrice} ₺
            </p>
          </div>
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
              className="h-8 text-xs"
              animation
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsSliderItem;
