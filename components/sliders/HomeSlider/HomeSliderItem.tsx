"use client";

import { CarouselType } from "@/constans/HomeSlider";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageProps {
  image: CarouselType;
}

function HomeSliderItem({ image }: ImageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[370px] bg-third md:h-[600px] ">
      <Image
        src={isMobile ? image.urlDesktop : image.urlMobile}
        alt={image.description ? image.description : "Slider Description"}
        fill
        priority
        className="object-cover md:object-cover bg-center bg-cover"
      />
    </div>
  );
}

export default HomeSliderItem;
