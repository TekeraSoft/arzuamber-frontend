"use client";

import { CarouselType } from "@/constans/HomeSlider";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageProps {
  image: CarouselType;
}

function HomeSliderItem({ image }: ImageProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Ekran boyutunu takip etmek için useEffect kullanıyoruz
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px'den küçükse mobil, aksi takdirde masaüstü
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Sayfa yüklenince hemen çalıştır
    return () => window.removeEventListener("resize", handleResize); // Temizlik
  }, []);

  return (
    <div className="relative w-full h-[350px] bg-third md:h-[600px] ">
      <Image
        src={isMobile ? image.urlMobile : image.urlDesktop} // Mobil ve masaüstü için dinamik URL
        alt={image.description ? image.description : "Slider Description"}
        fill
        className="object-cover md:object-cover bg-center bg-cover"
      />
    </div>
  );
}

export default HomeSliderItem;
