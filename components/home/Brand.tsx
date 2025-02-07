"use client";

import React from "react";
import Image from "next/image";
import Button from "../general/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function Brand() {
  const t = useTranslations();
  const router = useRouter();

  const handleClick = () => {
    router.push("products");
  };

  return (
    <div className="w-full h-[700px] relative mt-3 md:mt-5 ">
      <Image
        className="object-cover bg-center "
        src="/images/Brand/single-campaign.png"
        alt={t("brand.title")}
        fill
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-35 text-white p-7 md:p-5 rounded-lg">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">
          {/* {t("brand.title")} */}
          New Season Collection
        </h2>
        <p className="text-base md:text-lg text-center mb-4">
          {/* {t("brand.description")} */}
          Discover the latest products that are perfect for every occasion!
        </p>

        <Button
          animation
          color="secondary"
          size="small"
          // text={t("brand.buttonText")}
          text="View Products"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Brand;
