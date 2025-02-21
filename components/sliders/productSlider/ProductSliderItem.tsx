"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Product } from "@/types";
import { useTranslations } from "next-intl";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductsSliderItem({ product }: ProductsSliderItemProps) {
  // IMAGE HOVER
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();

  return (
    <div className="flex justify-center items-start flex-col space-y-2 rounded-lg transition duration-500  w-full md:w-[270px] h-[550px]  relative bg-slate-50">
      <Link
        href={`/product/${product?.slug}`}
        className=" w-full h-[400px] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-cover rounded-t transition-opacity duration-700 ${
            isHovered ? "opacity-0" : "opacity-100 z-20"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0]?.images[0]}`}
          alt={product?.name}
          fill
        />

        {product.colorSize[0]?.images[1] && (
          <Image
            className={`object-cover rounded-ttransition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0]?.images[1]}`}
            alt={product?.name}
            fill
          />
        )}
        <div className="absolute right-3 top-5 md:top-2 lg:top-3 flex flex-col justify-center items-end gap-1 z-30">
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

      <div className="px-2 w-full pb-2">
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

        <div className="flex flex-col justify-start items-start  w-full">
          <div className="flex justify-start items-center w-full h-16 ">
            <h2 className="text-start text-secondary font-semibold text-md w-full">
              {product.name}
            </h2>
          </div>

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
                  {product.price} ₺
                </p>
              )}
            </div>
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

export default ProductsSliderItem;
