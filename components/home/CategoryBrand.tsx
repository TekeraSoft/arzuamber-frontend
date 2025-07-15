"use client";

import React, { useEffect } from "react";
import Loading from "../utils/Loading";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {categories} from "@/data/filterData";

export default function CategoryBrand() {
  const t = useTranslations();


  return (
    <div className="  flex flex-col justify-center items-center w-full  mt-8 px-4">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-5 uppercase tracking-widest">
        {t("Filter.categories")}
      </h2>
        <div className="HomeSliderContainer grid grid-cols-2 gap-6">
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
                  src={category.image}
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
    </div>
  );
}
