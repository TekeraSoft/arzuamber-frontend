"use client";

import { CarouselType } from "@/constans/HomeSlider";
import Image from "next/image";

interface ImageProps {
  image: CarouselType;
}

function HomeSliderItem({ image }: ImageProps) {
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
