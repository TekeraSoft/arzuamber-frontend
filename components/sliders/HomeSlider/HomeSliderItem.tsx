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
    <Image
      src={image.url}
      alt={image.description ? image.description : "Slider Description"}
      width={1920}
      height={840}
      priority
      className="object-cover"
    />
  );
}

export default HomeSliderItem;
