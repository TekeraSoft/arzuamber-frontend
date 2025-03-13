"use client";

import { CarouselType } from "@/constans/HomeSlider";
import Image from "next/image";

interface ImageProps {
  image: CarouselType;
}

function HomeSliderItem({ image }: ImageProps) {
  console.log(image)
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image.url}`}
      alt={image.url}
      width={1920}
      height={840}
      priority
      className="object-cover"
    />
  );
}

export default HomeSliderItem;
