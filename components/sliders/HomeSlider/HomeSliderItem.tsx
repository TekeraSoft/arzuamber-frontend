"use client";

import { CarouselType } from "@/constans/HomeSlider";
import Image from "next/image";
import React from "react";

interface ImageProps {
  image: CarouselType;
}

function HomeSliderItem({ image }: ImageProps) {
  return (
    <div className="relative w-screen h-96 md:h-[700px] ">
      <Image
        src={image.url}
        alt={image.description ? image.description : "Slider Description"}
        fill
        className='object-contain'
      />
    </div>
  );
}

export default HomeSliderItem;
