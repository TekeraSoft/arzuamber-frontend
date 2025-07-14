"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Product } from "@/types";
import { useTranslations } from "next-intl";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { updateFavoritesDispatch } from "@/store/favoritesSlice";
import { setFavWarningModalStatus } from "@/store/modalsSlice";
import { addFavoritesDispatch } from "@/store/userSlice";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductsSliderItem({ product }: ProductsSliderItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const t = useTranslations();

  const [isHovered, setIsHovered] = useState(false);

  const handleAddToFav = () => {
    if (!session?.user) {
      dispatch(setFavWarningModalStatus(true));
      return;
    }
    dispatch(addFavoritesDispatch(session.user?.id, product.id));
    dispatch(updateFavoritesDispatch(product));
  };


  return (
    <div className="flex justify-center items-start flex-col space-y-2 rounded-lg transition duration-500 pb-0.5 w-44 xs:w-[220px] md:w-[290px] h-[400px] md:h-[500px]  relative bg-slate-50 shadow-md">
      <Link
        href={`/df/${product?.slug}`}
        className=" w-full h-full  relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-cover  transition-opacity duration-700 rounded-t ${
            isHovered ? "opacity-0" : "opacity-100 z-20"
          }`}
          src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${product.variations[0]?.images[0]}`}
          alt={product?.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {product.variations[0]?.images[1] && (
          <Image
            className={`object-cover border  transition-opacity duration-700 rounded-t ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${product.variations[0]?.images[1]}`}
            alt={product?.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute right-3 top-5 md:top-2 lg:top-3 flex flex-col justify-center items-end gap-1 z-30">
          {product?.variations[0]?.attributes[0].discountPrice > 0 && product?.variations[0]?.attributes[0].price > 0 && (
            <div className="  w-10 h-4 md:w-16 md:h-6  flex justify-center items-center bg-red-600 text-mywhite rounded  text-[7px] md:text-[10px] md:text-xs shadow-md ">
              %
              {Math.round(
                ((product?.variations[0]?.attributes[0]?.price - product?.variations[0]?.attributes[0]?.discountPrice) / product?.variations[0]?.attributes[0]?.price) * 100
              )}
            </div>
          )}

            <div className="flex w-10 md:w-16  h-4  md:h-6 justify-center items-center bg-secondary text-mywhite rounded text-[7px] md:text-[10px] md:text-xs shadow-md ">
              {t("productDetail.newSeason")}
            </div>
        </div>
      </Link>

      <div
        className="absolute left-2 top-1 flex flex-col justify-center items-end gap-1 z-30"
        onClick={handleAddToFav}
      >
        <button className=" border rounded-lg p-2 bg-primaryLight text-white hover:bg-secondary focus:outline-none transition duration-300">
          <FaRegHeart className="text-base  md:text-lg" />
        </button>
      </div>

      <div className=" flex flex-col  space-y-1 px-2 w-full pb-2">
        {/* Renk Seçenekleri */}
        <div className="flex flex-row flex-wrap gap-x-3 w-full">
          {product.variations.map((color, index) => (
            <Image
              key={index}
              className="object-cover rounded "
              src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${color?.images[0]}`}
              alt={product?.name}
              width={20}
              height={30}
            />
          ))}
        </div>

        <div className="flex flex-col justify-start items-start  w-full">
          <div className="flex justify-start items-center w-full h-8 my-2 ">
            <h2 className="text-start text-secondary  font-bold text-[12px] md:text-base w-full">
              {product?.name}
            </h2>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex justify-center items-center gap-2">
              {product?.variations[0]?.attributes[0]?.discountPrice > 0 &&
              product?.variations[0]?.attributes[0]?.discountPrice !== product?.variations[0]?.attributes[0]?.price ? (
                <>
                  <span className="text-red-700 text-[9px] xs:text-xs md:text-sm line-through">
                    {product?.variations[0]?.attributes[0]?.price.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </span>
                  <p className="text-[9px] xs:text-xs text-secondary md:text-base font-extrabold">
                    {product?.variations[0]?.attributes[0]?.discountPrice.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </p>
                </>
              ) : (
                <p className="text-[9px] xs:text-xs text-secondary md:text-base font-extrabold">
                  {product?.variations[0]?.attributes[0]?.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
              )}
            </div>
            <Link
              className="flex items-center justify-center "
              href={`/df/${product?.slug}`}
            >
              <p className="text-mywhite  px-2 py-0.5 bg-secondary md:px-4 md:py-1 rounded text-[9px] md:text-sm transition-all hover:scale-105 duration-300">
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
