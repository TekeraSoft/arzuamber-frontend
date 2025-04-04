"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Product } from "@/types";
import { useTranslations } from "next-intl";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { AddToFav } from "@/store/favoritesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Dialog } from "primereact/dialog"; // PrimeReact Modal
import { Dropdown } from "primereact/dropdown"; // PrimeReact Dropdown

interface ProductsSliderItemProps {
  product: Product;
}

function ProductsSliderItem({ product }: ProductsSliderItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedColor, setSelectedColor] = useState(
    product?.colorSize?.length > 0 ? product.colorSize[0] : {},
  );

  const [selectedSize, setSelectedSize] = useState(
    selectedColor?.stockSize?.length > 0 ? selectedColor.stockSize[0] : {},
  );

  const handleAddToFav = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Lütfen renk ve beden seçin.");
      return;
    }

    dispatch(
      AddToFav({
        id: product.id,
        name: product.name,
        category: product.category,
        subCategory: product.subCategory,
        slug: product.slug,
        color: selectedColor?.color,
        image: selectedColor?.images?.[0],
        size: selectedSize?.size,
        stockSizeId: selectedSize?.stockSizeId,
        stockCode: selectedSize?.stockCode,
        quantity: 1,
        price:
          product.discountPrice !== 0 ? product.discountPrice : product.price,
      }),
    );

    toast.success("Ürün favorilere eklendi.");
    // closeModal();
  };

  return (
    <div className="flex justify-center items-start flex-col space-y-2 rounded-lg transition duration-500 pb-0.5 w-[190px] md:w-[290px] h-[400px] md:h-[500px]  relative bg-slate-50 shadow-md">
      <Link
        href={`/product/${product?.slug}`}
        className=" w-full h-full  relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`absolute object-cover  transition-opacity duration-700 rounded-t ${
            isHovered ? "opacity-0" : "opacity-100 z-20"
          }`}
          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0]?.images[0]}`}
          alt={product?.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {product.colorSize[0]?.images[1] && (
          <Image
            className={`object-cover border  transition-opacity duration-700 rounded-t ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0]?.images[1]}`}
            alt={product?.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute right-3 top-5 md:top-2 lg:top-3 flex flex-col justify-center items-end gap-1 z-30">
          {product?.discountPrice > 0 && product?.price > 0 && (
            <div className="  w-10 h-4 md:w-16 md:h-6  flex justify-center items-center bg-red-600 text-mywhite rounded  text-[7px] md:text-[10px] md:text-xs shadow-md ">
              %
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100,
              )}
            </div>
          )}

          {product.newSeason == true && (
            <div className="flex w-10 md:w-16  h-4  md:h-6 justify-center items-center bg-secondary text-mywhite rounded text-[7px] md:text-[10px] md:text-xs shadow-md ">
              {t("productDetail.newSeason")}
            </div>
          )}

          {product.populate == true && (
            <div className="flex w-10 md:w-16 h-4  md:h-6   justify-center items-center bg-teal-700 text-mywhite rounded  text-[7px] md:text-[10px] md:text-xs shadow-md ">
              {t("productDetail.populate")}
            </div>
          )}
        </div>
      </Link>
      {/*       
      <div
        className="absolute left-2 top-1 flex flex-col justify-center items-end gap-1 z-30"
        onClick={() => {
          openModal();
        }}
      >
        <button className=" z-30 border rounded-full p-1.5 bg-primary text-white hover:bg-secondary focus:outline-none transition duration-300">
          <FaRegHeart className="text-base  md:text-lg" />
        </button>
      </div>{" "} */}

      <div className=" flex flex-col  space-y-1 px-2 w-full pb-2">
        {/* Renk Seçenekleri */}
        <div className="flex flex-row gap-x-3 w-full">
          {product.colorSize.map((color, index) => (
            <Image
              key={index}
              className="object-cover rounded "
              src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${color.images[0]}`}
              alt={product?.name}
              width={20}
              height={30}
            />
          ))}
        </div>

        <div className="flex flex-col justify-start items-start  w-full">
          <div className="flex justify-start items-center w-full h-8 my-2 ">
            <h2 className="text-start text-secondary  font-bold text-[12px] md:text-base w-full">
              {product.name}
            </h2>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex justify-center items-center gap-2">
              {product.discountPrice > 0 &&
              product.discountPrice !== product.price ? (
                <>
                  <span className="text-red-700 text-xs md:text-sm line-through">
                    {product.price.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </span>
                  <p className="text-xs text-secondary md:text-base font-extrabold">
                    {product.discountPrice.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </p>
                </>
              ) : (
                <p className="text-xs text-secondary md:text-base font-extrabold">
                  {product.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
              )}
            </div>
            <Link
              className="flex items-center justify-center "
              href={`/product/${product.slug}`}
            >
              <p className="text-mywhite  px-2 py-0.5 bg-secondary md:px-4 md:py-1 rounded text-[9px] md:text-sm transition-all hover:scale-105 duration-300">
                {t("productDetail.detail")}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Dialog
        header={"beden ve renkler"}
        visible={showModal}
        // onHide={closeModal}
        className="w-[300px] md:w-[400px]  p-3"
      >
        <div className="flex flex-col gap-3 w-f">
          {/* Renk Seçimi */}
          <Dropdown
            value={selectedColor}
            options={product.colorSize}
            onChange={(e) => {
              setSelectedColor(e.value);
              setSelectedSize(e.value.stockSize?.[0] || {}); // Yeni rengi seçince ilk bedeni ata
            }}
            optionLabel="color"
            placeholder="Renk"
          />

          {/* Beden Seçimi */}
          <Dropdown
            value={selectedSize}
            options={
              selectedColor?.stockSize?.map((size) => ({
                label: size.size, // UI'de görünen değer
                value: size, // Seçildiğinde dönen obje
              })) || []
            }
            onChange={(e) => {
              setSelectedSize(e.value);
            }}
            optionLabel="label"
            placeholder="Beden"
          />
        </div>

        <div className="flex justify-end gap-3 mt-3">
          <button
            className="p-2 bg-primary text-white rounded"
            onClick={handleAddToFav}
          >
            Favoriye ekle
          </button>
          <button
            className="p-2 bg-secondary text-white rounded"
            // onClick={closeModal}
          >
            kapat
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default ProductsSliderItem;
