import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface BrandProps {
  title: string;
  description: string;
  buttonText: string;
  mobileImageUrl: string;
  desktopImageUrl: string;
  link: string;
  color: "standart" | "black"; // İleride farklı renkler eklenebilir
}

function Brand({
  title,
  description,
  buttonText,
  mobileImageUrl,
  desktopImageUrl,
  link,
  color,
}: BrandProps) {
  const t = useTranslations();
  const [imageUrl, setImageUrl] = useState(desktopImageUrl);

  useEffect(() => {
    const updateImage = () => {
      setImageUrl(window.innerWidth < 768 ? mobileImageUrl : desktopImageUrl);
    };

    updateImage(); // İlk değer ataması
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, [mobileImageUrl, desktopImageUrl]);

  // Renk sınıflarını tanımla
  const colorClasses: { [key in BrandProps["color"]]: string } = {
    standart: " text-white",
    black: "bg-myblack bg-opacity-25  bg-black text-white",
  };

  return (
    <div className=" md:container md:mx-auto w-full h-[200px] md:h-[500px] relative mt-3 md:mt-5">
      <Image
        className="object-cover bg-center"
        src={imageUrl} // Dinamik resim (mobil veya desktop)
        alt={title}
        fill
      />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-7 md:p-5 rounded-lg  ${colorClasses[color]}`}
      >
        <h2 className="text-sm md:text-4xl font-bold mb-2">{title}</h2>
        <p className="text-xs md:text-lg text-center mb-4">{description}</p>
        <Link href={link || `/products`}>
          <button className="bg-secondary text-xs md:text-base text-white rounded-lg px-4 py-1">
            {buttonText || t("brand.buttonText")}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Brand;
