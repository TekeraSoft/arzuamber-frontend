"use client";

import { clearFavs, removeFromFav } from "@/store/favoritesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { openCartModal } from "@/store/modalsSlice";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { addToCart } from "@/store/cartSlice";
import { useState } from "react";

function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const { favsProducts, total, loading } = useSelector(
    (state: RootState) => state.favs
  );

  const [selectedColor, setSelectedColor] = useState(
    fav?.colorSize?.length > 0 ? fav.colorSize[0] : {}
  );

  const [selectedSize, setSelectedSize] = useState(
    selectedColor?.stockSize?.length > 0 ? selectedColor.stockSize[0] : {}
  );

  const deleteFav = (fav: any) => {
    dispatch(
      removeFromFav({
        id: fav.id,
        color: fav.color,
        size: fav.size,
      })
    );
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Başlık ve Toplam */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary">Favori Ürünlerim</h2>
        <div className="text-lg font-semibold text-primary">
          Toplam: {total}₺
        </div>
      </div>

      {/* Yükleniyor Göstergesi */}
      {loading && (
        <div className="flex justify-center items-center">
          <ProgressSpinner />
        </div>
      )}

      {/* Favori Ürünler Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favsProducts.map((fav: any) => (
          <div key={fav.id} className="card shadow-lg rounded-lg bg-white p-4">
            {/* Ürün Görseli */}
            <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-gray-100">
              <Image
                src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${fav.image}`}
                alt={fav.name}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>

            {/* Ürün Bilgileri */}
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg">{fav.name}</h3>
              <p className="text-xs text-gray-500">
                {fav.color} | {fav.size}
              </p>
              <p className="font-semibold text-primary">{fav.price}₺</p>
            </div>

            {/* İşlemler ve Detay Butonları */}
            <div className="flex justify-between items-center">
              <Button
                icon={<FaTrashAlt />}
                className="p-button-danger p-button-rounded p-button-text"
                onClick={() => deleteFav(fav)}
              />
              <Link href={`/product/${fav.slug}`}>
                <Button
                  label="Detay"
                  className="p-button-primary p-button-rounded p-button-text"
                />
              </Link>

              <Button
                loading={loading}
                onClick={() => {
                  if (!selectedSize) {
                    toast.error(t("productDetail.sizeError"));
                  } else {
                    dispatch(
                      addToCart({
                        id: fav.id,
                        name: fav.name,
                        category: fav.category,
                        subCategory: fav.subCategory,
                        color: fav.color,
                        image: fav?.images[0],
                        size: fav.size,
                        stockSizeId: fav?.stockSizeId,
                        stockCode: fav?.stockCode,
                        quantity: fav.quantity,
                        price:
                          fav.discountPrice !== 0 && fav.discountPrice
                            ? fav.discountPrice
                            : fav.price,
                      })
                    );
                    toast.success(t("productDetail.productAddedCartSuccess"));
                    openCartModal();
                  }
                }}
                className={
                  "!bg-secondary h-12 w-3/4 !border-none !outline-0 flex justify-center rounded-lg text-xl text-white font-semibold  hover:opacity-85  transition-all duration-300"
                }
              >
                {t("productDetail.productAddCart")}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Favorileri Temizle Butonu */}
      {favsProducts.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            label="Favorileri Temizle"
            icon="pi pi-trash"
            className="bg-primary text-white text-xs p-button-rounded shadow-md"
            onClick={() => dispatch(clearFavs())}
          />
        </div>
      )}
    </div>
  );
}

export default Page;
