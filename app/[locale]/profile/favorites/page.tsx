"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaHeartBroken } from "react-icons/fa";
import { Skeleton } from "primereact/skeleton";
import { deleteToFav, getAllFavorites } from "@/store/favoritesSlice";

function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites, loading } = useSelector((state: RootState) => state.favs);

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  const handleDeleteFavorite = (productId) => {
    dispatch(deleteToFav(productId));
  };

  return (
    <div className="flex flex-col items-center justify-start w-full ">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow-md">
              <Skeleton width="100%" height="12rem" className="mb-2" />
              <Skeleton width="80%" className="mb-1" />
              <Skeleton width="60%" className="mb-1" />
              <Skeleton width="40%" className="mb-2" />
              <Skeleton width="30%" />
            </div>
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center border rounded-lg  text-center h-full w-full">
          <FaRegHeart className="text-5xl text-red-300 mb-4 animate-pulse" />
          <p className="text-xl font-medium text-gray-600 mb-2">
            Favori listeniz boş
          </p>
          <p className="text-gray-500 mb-4">
            Beğendiğiniz ürünleri favorilere ekleyin, burada gözüksün!
          </p>
          <Link
            href="/tr/products"
            className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            Ürünleri Keşfet
          </Link>
        </div>
      ) : (
        <div className="border w-full p-2 rounded-lg">
          <h1 className="text-2xl font-bold mb-6 flex items-center w-full justify-center mt-2 gap-2 border-b">
            <FaHeart className="text-red-500" />
            Favori Ürünlerim
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {favorites.map((product, index) => (
              <div
                key={index}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col h-full"
              >
                {/* Resim kısmı */}
                <div className="relative w-full h-52 md:h-72 flex-shrink ">
                  <Image
                    src={
                      product.colorSize?.[0]?.images?.[1]
                        ? `${process.env.NEXT_PUBLIC_RESOURCE_API}/${product.colorSize[0].images[1]}`
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  25vw"
                    priority
                  />
                </div>

                {/* İçerik kısmı */}
                <div className="p-3 flex flex-col justify-between flex-1 overflow-hidden">
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <h2 className="font-semibold text-[11px] md:text-sm text-gray-800 min-h-10 line-clamp-2">
                      {product.name}
                    </h2>

                    {/* Renkler */}
                    <div className="text-xs text-gray-700 flex flex-wrap gap-1 overflow-y-auto pr-1">
                      {product.colorSize?.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 h-5 border border-gray-300 rounded-full text-[10px] text-gray-700 whitespace-nowrap"
                        >
                          {c.color}
                        </span>
                      ))}
                    </div>

                    {/* Fiyat ve etiketler */}
                    <div className="text-xs md:text-sm mt-1">
                      {product.discountPrice ? (
                        <>
                          <span className="text-red-600 font-semibold mr-2">
                            {product.discountPrice} ₺
                          </span>
                          <span className="line-through text-gray-500">
                            {product.price} ₺
                          </span>
                        </>
                      ) : (
                        <span className="text-primary font-semibold">
                          {product.price} ₺
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between md:justify-start gap-2 mt-1">
                      {product.newSeason && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Yeni Sezon
                        </span>
                      )}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          product.totalStock > 0
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        Stok: {product.totalStock > 0 ? "Var" : "Yok"}
                      </span>
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="mt-2 flex items-center justify-between">
                    <Link
                      href={`/tr/product/${product.slug}`}
                      className="flex items-center justify-center gap-1 bg-primary text-white text-[11px] md:text-sm font-medium px-4  py-1 md:py-1.5 rounded-md hover:bg-primary/90 transition-all shadow-sm"
                    >
                      <span>Detay</span>
                    </Link>

                    <button
                      onClick={() => handleDeleteFavorite(product)}
                      className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:text-red-700 transition-all text-[11px] md:text-sm font-medium rounded-md px-2 md:px-4  py-1 md:py-1.5 shadow-sm"
                      aria-label="Favori"
                    >
                      <FaHeartBroken className="text-sm md:text-base" />
                      <span>Kaldır</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
