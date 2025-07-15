"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {Product, ProductUi} from "@/types";
import { useTranslations } from "next-intl";
import { FaRegHeart } from "react-icons/fa";
import { setFavWarningModalStatus } from "@/store/modalsSlice";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addFavoritesDispatch } from "@/store/userSlice";
import { updateFavoritesDispatch } from "@/store/favoritesSlice";
import {colors} from "@/data/filterData";

interface ProductsSliderItemProps {
  product: ProductUi;
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
    dispatch(updateFavoritesDispatch(product));
  };

  return (
      <div className={'flex flex-col rounded-lg bg-white mt-4'}>
        <Link href={`/df/${product?.slug}`} className={'bg-white rounded-t-lg'}>
          <img className={'rounded-t-lg md:h-[450px] h-80 w-full object-cover'}
               src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${product.variations[0].images[0]}`}
               alt={product.variations[0].images[0]}/>
        </Link>
        <div className={'my-2 p-2 flex flex-col justify-between relative gap-y-2 h-40'}>
          <h3 className={'text-md font-semibold text-secondaryDark'}>{product.name}</h3>
          <div className="flex gap-2 flex-wrap mt-1">
            {product?.variations?.map((variation) => {
              const colorHex = colors?.find(
                  (col) => col.name === variation.color
              )?.hex;
              return (
                  <div
                      key={variation.id}
                      className="relative inline-block"
                  >
                    <div
                        className={`${variation.color === 'Beyaz' && 'border'} w-2.5 h-2.5 rounded-full outline-1 cursor-pointer peer`}
                        style={{ backgroundColor: colorHex }}
                    ></div>

                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 pointer-events-none peer-hover:opacity-100 transition-opacity whitespace-nowrap select-none z-10">
                                                                    {variation.color}
                                                                 </span>
                  </div>
              );
            })}
          </div>
          <div className={'flex flex-row w-full justify-between items-center'}>
            <h3 className={'font-semibold'}>{product.price?.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}</h3>
            <Link href={`/df/${product?.slug}`}
                  className={'p-2 border px-4 text-sm hover:scale-105 transition-transform ' +
                      'duration-100 rounded-lg'}>
              İncele
            </Link>
          </div>
        </div>
      </div>
  );
}

export default ProductCartItem;
