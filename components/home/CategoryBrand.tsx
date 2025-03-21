"use client";

import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import Loading from "../utils/Loading";
import { getCategoriesDispatch } from "@/store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion"; // Animasyonlar için
import { useTranslations } from "next-intl";

export default function CategoryBrand() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  useEffect(() => {
    dispatch(getCategoriesDispatch());
  }, [dispatch]);

  const { categories, loading } = useSelector(
    (state: RootState) => state.category
  );

  return (
    <div className="container mx-auto  mt-8 px-4">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-5 uppercase tracking-widest">
        {t("Filter.categories")}
      </h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <Link href={`/category/${category.name}`} className="block">
                {/* Kategori Görseli */}
                <Image
                  src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${category.image}`}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Kategori İsmi */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-medium uppercase tracking-wider opacity-100 transition-opacity duration-300">
                  {category.name}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
