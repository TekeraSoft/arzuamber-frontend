"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Product } from "@/types";
import { useTranslations } from "next-intl";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductCartItem({ product }: ProductsSliderItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();

  return (
    <div
      className="group flex flex-col justify-between space-y-2   transition duration-300  relative
    min-h-[500px]  md:border-none shadow-md  bg-slate-50 rounded-lg"
    >
      {/* Görsel Alanı */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full min-h-[400px] bg-center bg-cover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-cover rounded-t  md:rounded-none transition-opacity duration-700  ${
            isHovered ? "opacity-0" : "opacity-100 z-30"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[0]}`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <Image
          className={` object-cover rounded-t md:rounded-none transition-opacity duration-700  ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[1]}`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="   absolute right-3 top-5 md:top-2 lg:top-3 flex flex-col justify-center items-end gap-1 z-30">
          {product?.discountPrice > 0 && product?.price > 0 && (
            <div className="  w-16 h-6  flex justify-center items-center bg-red-600 text-mywhite rounded text-[10px] md:text-xs shadow-md ">
              %
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
            </div>
          )}

          {product.newSeason == true && (
            <div className="flex w-16 h-6 justify-center items-center bg-secondary text-mywhite rounded text-[10px] md:text-xs shadow-md ">
              {t("productDetail.newSeason")}
            </div>
          )}

          {product.populate == true && (
            <div className="flex  w-16 h-6  justify-center items-center bg-teal-700 text-mywhite rounded text-[10px] md:text-xs shadow-md ">
              {t("productDetail.populate")}
            </div>
          )}
        </div>
      </Link>

      <div className="px-3 pb-2">
        {/* Renk Seçenekleri */}
        <div className="flex flex-row gap-x-3 w-full">
          {product.colorSize.map((color, index) => (
            <Image
              key={index}
              className="object-cover rounded "
              src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${color.images[0]}`}
              alt={product?.name}
              width={30}
              height={30}
            />
          ))}
        </div>

        {/* Ürün Detayları */}
        <div className=" flex flex-col space-y-1  w-full mt-2">
          <h2 className="font-medium text-base  text-secondary   ">
            {product.name}
          </h2>

          <div className="flex  flex-row justify-between items-center">
            {product.discountPrice > 0 &&
            product.discountPrice !== product.price ? (
              <div className="flex flex-col justify-center items-start">
                <p className="text-xs line-through text-red-600 ">
                  {product.price}₺
                </p>
                <p className="text-green-600 font-medium">
                  {product.discountPrice}₺
                </p>
              </div>
            ) : (
              <p className="text-green-600 font-medium">{product.price}₺</p>
            )}

            <Link
              className="flex items-center justify-center "
              href={`/product/${product.slug}`}
            >
              <p className="text-mywhite  bg-secondary px-4 py-1 rounded text-sm transition-all hover:scale-105 duration-300">
                {t("productDetail.detail")}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
