"use client";

import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import Loading from "../utils/Loading";
import { getCategoriesDispatch, setShortCategory } from "@/store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {categories} from "@/data/filterData";

function Category() {
  const t = useTranslations();

  return (
    <div className=" flex justify-center items-center  w-full md:mt-12 lg:mt-0 mb-2 ">

        <div
          className="flex items-center justify-between overflow-x-auto space-x-4 p-0.5 md:py-0.5  SliderContainer w-full md:px-3"
          style={{
            scrollbarWidth: "none", // Firefox'ta kaydırma çubuğunu gizler
            msOverflowStyle: "none", // Internet Explorer ve Edge tarayıcıları için
          }}
        >
          <Link
            href={"/products"}
            className="flex flex-col items-center justify-center  cursor-pointer"
          >
            {/* Kategori Resmi ve İsim */}
            <div className="flex flex-col items-center">
              {/* Kategori Resmi */}
              <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg hover:border-green-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                <Image
                  src={`/images/Brand/all-product-cat-image.jpg`}
                  alt={"brandDescription"}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Kategori İsmi */}
              <h3 className="text-center text-xs md:text-sm max-w-[5rem] truncate">
                {t("allProduct.allProducts")}
              </h3>
            </div>
          </Link>

          <Link
              href={"/collections"}
              className="flex flex-col items-center justify-center  cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg hover:border-green-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                <Image
                    src={`/images/logo/collection-img.webp`}
                    alt={"brandDescription"}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-center w-16 md:w-20 text-xs md:text-sm">
                Koleksiyon
              </h3>
            </div>
          </Link>

          <Link
              href={"/df"}
              className="flex flex-col items-center justify-center  cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg hover:border-green-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                <Image
                    src={`/images/logo/df-img.gif`}
                    alt={"brandDescription"}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-center w-16 md:w-20 text-xs md:text-sm">
                Dijital Giyim
              </h3>
            </div>
          </Link>

          {categories.map((category, index) => (
            <Link
              href={`/category/${category.name}`}
              key={index}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              {/* Kategori Resmi ve İsim */}
              <div className="flex flex-col items-center">
                {/* Kategori Resmi */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105  hover:border-green-400">
                  <Image
                    src={`${category.image}`}
                    alt={category.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-center text-xs md:text-sm max-w-[5rem] truncate">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}

export default Category;
