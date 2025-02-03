"use client";

import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Loading from "../utils/Loading";

function Category() {
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  return (
    <div className="category-container p-4 md:p-8">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto container">
          {categories.map((category) => (
            <div
              key={category.id} // Eğer kategori verisinde id varsa, bu daha güvenilir bir key kullanımıdır
              className="relative flex flex-col items-center justify-start cursor-pointer text-white bg-gradient-to-r from-secondary to-primary hover:scale-105 shadow-lg overflow-hidden transform transition-all duration-300 rounded-lg h-[200px] md:h-full"
            >
              {/* Kategori Resmi */}
              <div className="relative w-full h-[400px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transition-all duration-500 hover:opacity-80 object-cover object-center"
                />
              </div>

              {/* Kategori Adı */}
              <span className="absolute mt-5 font-semibold text-xl md:text-2xl lg:text-3xl bg-black bg-opacity-50 px-4 py-2 rounded-lg shadow-lg capitalize">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
