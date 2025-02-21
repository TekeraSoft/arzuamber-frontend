"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Button from "@/components/general/Button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Product } from "@/types";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductsSliderItem({ product }: ProductsSliderItemProps) {
  // IMAGE HOVER
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center flex-col space-y-2 rounded-lg transition duration-500 h-[650px] w-[300px] relative">
      <Link
        href={`/product/${product?.slug}`}
        className="w-[300px] h-[500px] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-cover rounded transition-opacity duration-700 ${
            isHovered ? "opacity-0" : "opacity-100 z-20"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0]?.images[0]}`}
          alt={product?.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {product.colorSize[0]?.images[1] && (
          <Image
            className={`object-cover rounded transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0]?.images[1]}`}
            alt={product?.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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

      <div className="flex flex-col justify-start items-start gap-1 w-full">
        <div className="flex justify-between items-center w-full min-h-12">
          <h2 className="text-start text-secondary font-bold text-md rounded-lg w-full">
            {product.name}
          </h2>
        </div>

        <hr className="w-full" />

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex justify-center items-center gap-2">
            {product.discountPrice > 0 ? (
              <>
                <span className="text-red-700 text-sm line-through">
                  {product.price}₺
                </span>
                <p className="text-secondary text-base font-semibold">
                  {product.discountPrice}₺
                </p>
              </>
            ) : (
              <p className="text-secondary text-base font-semibold">
                {product.price}₺
              </p>
            )}
          </div>

          <Link
            className="flex items-center justify-center"
            href={`/product/${product?.slug}`}
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
