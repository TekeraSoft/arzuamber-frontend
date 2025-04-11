"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Product } from "@/types";
import { useTranslations } from "next-intl";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { setFavWarningModalStatus } from "@/store/modalsSlice";
import { addToFav } from "@/store/favoritesSlice";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addFavoritesDispatch } from "@/store/userSlice";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductCartItem({ product }: ProductsSliderItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const t = useTranslations();

  const [isHovered, setIsHovered] = useState(false);

  const handleAddToFav = () => {
    if (!session?.user) {
      dispatch(setFavWarningModalStatus(true));
      return;
    }
    dispatch(addFavoritesDispatch(session.user.id, product.id));
  };

  return (
    <div
      className=" flex flex-col justify-between space-y-2 w-full   transition duration-300  relative h-[450px]
    md:min-h-[575px] pb-0.5 md:border-none shadow-md  bg-slate-50 rounded-lg"
    >
      {/* Görsel Alanı */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full h-[400px] md:h-full md:min-h-[400px] bg-center bg-cover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-cover rounded-t  transition-opacity duration-700 h-auto w-auto  ${
            isHovered ? "opacity-0" : "opacity-100 z-30"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[0]}`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        <Image
          className={` object-cover  rounded-t transition-opacity duration-700 h-full w-full  ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[1]}`}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className=" absolute right-3 top-5 md:top-2 lg:top-3 flex flex-col justify-center items-end gap-1 z-30">
          {product?.discountPrice > 0 && product?.price > 0 && (
            <div className="  w-16 h-4 md:w-16 md:h-6  flex justify-center items-center bg-red-600 text-mywhite rounded text-[10px]  shadow-md  px-1">
              %
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
            </div>
          )}

          {product.newSeason == true && (
            <div className="flex w-16 h-4 md:w-16 md:h-6 justify-center items-center bg-secondary text-mywhite rounded text-[10px]  shadow-md  px-1">
              {t("productDetail.newSeason")}
            </div>
          )}

          {product.populate == true && (
            <div className="flex  w-16 h-4 md:w-16 md:h-6  justify-center items-center bg-teal-700 text-mywhite rounded text-[10px]  shadow-md  px-1">
              {t("productDetail.populate")}
            </div>
          )}
        </div>
      </Link>

      <div
        className="absolute left-1 md:left-3 md:top-3 flex flex-col justify-center items-end gap-1 z-30"
        onClick={handleAddToFav}
      >
        <button className=" border rounded-lg p-2 bg-primaryLight text-white hover:bg-secondary focus:outline-none transition duration-300">
          <FaRegHeart className="text-base  md:text-lg" />
        </button>
      </div>

      <div className="flex flex-col  space-y-1 px-2 w-full">
        {/* Renk Seçenekleri */}
        <div className="flex flex-row justify-start items-center flex-wrap gap-3 w-full">
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
        <div className=" flex flex-col space-y-1  w-full mt-2 min-h-20">
          <h2 className="font-medium text-sm lg:text-base  text-secondary   ">
            {product.name}
          </h2>

          <div className="flex  flex-row justify-between items-center ">
            <div className="flex justify-center items-center gap-2">
              {product.discountPrice > 0 &&
              product.discountPrice !== product.price ? (
                <>
                  <span className="text-red-700 text-[10px] md:text-sm line-through">
                    {product.price.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </span>
                  <p className="text-xs text-secondary md:text-sm font-extrabold">
                    {product.discountPrice.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </p>
                </>
              ) : (
                <p className="text-xs text-secondary  md:text-sm font-extrabold">
                  {product.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
              )}
            </div>

            <Link
              className="flex items-center justify-center "
              href={`/product/${product.slug}`}
            >
              <p className="text-mywhite  bg-secondary px-2 py-0.5 md:px-4  md:py-1 rounded text-sm transition-all hover:scale-105 duration-300">
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
