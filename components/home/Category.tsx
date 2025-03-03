"use client";

import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import Loading from "../utils/Loading";
import { getCategoriesDispatch } from "@/store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

function Category() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategoriesDispatch());
  }, [dispatch]);

  const { categories, loading } = useSelector(
    (state: RootState) => state.category
  );

  console.log(categories);

  return (
    <div className="container mx-auto mt-28 mb-2">
      {loading ? (
        <Loading />
      ) : (
        <div
          className="flex items-center justify-start overflow-x-auto space-x-5 p-1"
          style={{
            scrollbarWidth: "none", // Firefox'ta kaydırma çubuğunu gizler
            msOverflowStyle: "none", // Internet Explorer ve Edge tarayıcıları için
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              //! Kategorilere göre arama için event
              onClick={() => {
                console.log(category.name);
              }}
              className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              {/* Kategori Resmi ve İsim */}
              <div className="flex flex-col items-center">
                {/* Kategori Resmi */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg">
                  <Image
                    src={`/images/product/siyah diğer.jpg`} //! Kategoriye ait dinamik resim
                    alt={category.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Kategori İsmi */}
                <h3 className="text-center text-xs md:text-sm max-w-[5rem] truncate">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
