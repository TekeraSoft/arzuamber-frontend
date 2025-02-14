"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "../general/Button";
import Heading from "../general/Heading";
import { useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import TextClip from "../utils/TextClip";
import PageContainer from "../Containers/PageContainer";
import { useTranslations } from "next-intl";
import ColorPicker from "../general/ColorPicker";
import {Product} from "@/types";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const DetailClient = ({ product }: {product: Product}) => {
  const dispatch = useDispatch();

  const t = useTranslations();

  const [selectedColor, setSelectedColor] = useState<{ name: string } | null>(
    null
  );

  console.log(selectedColor?.name);


  const [open, setOpen] = useState(false);

  // line clamp state
  const [lineClamp, setLineClamp] = useState<boolean>(true);
  const handleClamp = () => {
    setLineClamp(!lineClamp);
  };

  // more details func
  const handleClose = () => {
    setOpen(false);
  };

  // color select func
  const handleColorSelect = (color: string) => {
    setSelectedColor({ name: color }); // Doğru şekilde nesne olarak atandı
  };

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row  justify-center items-start md:items-center lg:items-start gap-8 p-8 bg-gray-50 md:rounded-lg md:shadow-md mb-10 w-full h-full border-y md:border-none">
        {/* Image Section with Carousel */}
        <div className=" w-full md:w-1/2 h-[300px]  md:h-[700px] relative">
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            transitionDuration={500}
          >
            {product.colorSize?.flatMap((images, index) => (
                images.images?.map((image) => (
                        <div
                            key={index}
                            className=" w-full h-[300px]  md:h-[700px]  relative "
                        >
                          <Image
                              className="object-contain absolute "
                              src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image}`}
                              alt={image}
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                ))
            ))}
          </Carousel>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-2">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full ">
              {/* Product Name*/}
              <h1 className=" capitalize  text-4xl lg:text-3xl font-serif font-extrabold text-secondaryDark text-center">
                {product.name}
              </h1>

            </div>
          </div>

          {/* price and category */}
          <div className="flex flex-col justify-center items-start w-full gap-4 md:gap-2">
            <div className="w-full flex flex-col md:flex-row gap-3">
              {/* Price Section */}
              <div className="w-full md:w-2/4 font-semibold text-primary rounded-lg px-3 py-1 border-myblack">
                {product.discountPrice > 0 ? (
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-myblack text-md md:text-2xl">
                      {product.discountPrice}₺
                    </span>
                    <span className="line-through text-red-500 text-xs md:text-sm">
                      {product.price.toFixed(2)}{" "}
                      {t("productDetail.priceSymbol")}
                    </span>
                  </div>
                ) : (
                  <span>
                    {product.price.toFixed(2)} {t("productDetail.priceSymbol")}
                  </span>
                )}
              </div>
            </div>

            {/* Category and Subcategory */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
              {/* Category Section */}
              <div className="w-full flex items-center justify-center gap-2 text-md font-medium p-1 md:p-2 rounded-lg text-white bg-primary">
                <span className="text-xs font-semibold md:text-base tracking-wide">
                  {product.category}
                </span>

              </div>

              {/* Length Section */}
              <div className="w-full flex items-center justify-center gap-2 text-md font-medium p-2 md:p-2 rounded-lg text-white bg-primary">
                <span className="bg-white text-primary w-1/2 text-center px-1 md:px-2 md:py-1 rounded-md shadow-sm text-xs">
                  {product.length}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center flex-col md:flex-row gap-5  md:gap-3">


            <div className=" w-full flex justify-start items-xgz flex-wrap gap-3">
              {
                product.colorSize.flatMap((images,index)=> (
                    images.images?.slice(2).map((image) => (
                        <Image key={image} src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image}`} alt={image} width={40} height={40} className={'rounded'} />
                    ))
                ))
              }
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <p className={`font-sans text-gray-700 text-xs md:text-sm leading-relaxed`}>
              {product.description}
            </p>
          </div>

          {/* Counter and Add to Cart Button */}
          <div className="w-full flex justify-between  md:justify-center  items-center gap-4 flex-wrap ">
            <div className="w-full flex flex-col md:flex-row  justify-center items-center gap-10 lg:gap-10 ">

            </div>
          </div>
        </div>
      </div>

      <Heading text="Reviews" center textSize="3xl" />

    </PageContainer>
  );
};

export default DetailClient;
