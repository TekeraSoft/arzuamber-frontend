"use client";

import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import Loading from "../utils/Loading";
import { getCategoriesDispatch } from "@/store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Link } from "@/i18n/routing";
// import { useTranslations } from "next-intl";
import { motion } from "framer-motion"; // Framer Motion'ı dahil ettik
import AOS from "aos"; // AOS kütüphanesini dahil ettik
import "aos/dist/aos.css"; // AOS CSS'i dahil ettik

export default function CategoryBrand() {
  const dispatch = useDispatch<AppDispatch>();
  // const t = useTranslations();

  useEffect(() => {
    dispatch(getCategoriesDispatch());
    AOS.init(); // AOS animasyonlarını başlatıyoruz
  }, [dispatch]);

  const { categories, loading } = useSelector(
    (state: RootState) => state.category
  );

  return (
    <div className="md:container mx-2 md:mx-auto mt-24 lg:mt-28 my-2">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }} // Başlangıç animasyonu
              animate={{ opacity: 1, scale: 1 }} // Hedef animasyonu
              transition={{ duration: 0.5 }} // Geçiş süresi
              data-aos="fade-up" // AOS animasyonu
            >
              <Link
                href={`/category/${category.name}`}
                className="relative w-full"
              >
                {/* Kategori Resmi */}
                <div className="relative w-full h-64 mb-2 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${category.image}`}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="transition-transform transform hover:scale-110" // Hover efekti
                  />

                  {/* Kategori İsmi */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md transition-opacity duration-300 hover:bg-opacity-60">
                    <h3 className="text-white text-xl md:text-2xl font-bold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
