import React from "react";
import Image from "next/image";
import Button from "../general/Button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface BrandProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  link: string;
}

function Brand({ title, description, buttonText, imageUrl, link }: BrandProps) {
  const t = useTranslations();

  return (
    <div className="w-full h-[700px] relative mt-3 md:mt-5">
      <Image
        className="object-cover bg-center"
        src={imageUrl} // Dinamik resim URL'si
        alt={title} // Dinamik başlık
        fill
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-35 text-white p-7 md:p-5 rounded-lg">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">
          {title} {/* Dinamik başlık */}
        </h2>
        <p className="text-base md:text-lg text-center mb-4">
          {description} {/* Dinamik açıklama */}
        </p>
        <Link href={link || `/products`}>
          <Button
            text={buttonText || t("brand.buttonText")} // Dinamik buton metni
            animation
            color="secondary"
            size="small"
          />
        </Link>
      </div>
    </div>
  );
}

export default Brand;
