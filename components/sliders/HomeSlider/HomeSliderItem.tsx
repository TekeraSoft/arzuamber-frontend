"use client";

import { Link } from "@/i18n/routing";
import { CarouselType } from "@/types";
import Image from "next/image";

interface ImageProps {
  image: CarouselType;
}

function HomeSliderItem({ image }: ImageProps) {
  return (
    <Link href={"/products"}>
      <Image
        src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image.url}`}
        alt={image.url}
        width={1920}
        height={840}
        priority
        className="object-cover"
      />
    </Link>
  );
}

export default HomeSliderItem;
