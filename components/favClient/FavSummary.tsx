"use client";

import { FavSummaryProps } from "@/types/Props";
import Button from "../general/Button";
import Heading from "../general/Heading";
// import { useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";

const FavSummary = ({ total, tax, savings }: FavSummaryProps) => {
  // const t = useTranslations();

  return (
    <div className="w-full sm:w-2/6 h-full p-4 bg-gray-50 border border-gray-200 shadow-lg rounded-lg">
      <Heading
        text="Sepet özeti"
        // text={t("FavPage.favSummary.title")}
        font="bold"
        textSize="3xl"
        hr
      />

      {/* Toplam */}
      <div className="flex justify-between items-center mb-4 p-3  rounded-md ">
        <span className="text-sm font-medium">
          {/* {t("FavPage.favSummary.total")} */}
          Toplam:
        </span>
        <span className="text-lg font-semibold text-primary">
          {/* {t("FavPage.favSummary.symbol")} */}${total.toFixed(2)}
        </span>
      </div>

      {/* Kargo */}
      <div className="flex justify-between items-center mb-4 p-3  rounded-md ">
        <span className="text-sm font-medium">
          {/* {t("FavPage.favSummary.shipping")} */}
          Kargo:
        </span>
        <span className="text-sm font-semibold text-primary">
          {/* {t("FavPage.favSummary.freeShipping")} */}
          Ücretsiz
        </span>
      </div>

      {/* Vergi */}
      <div className="flex justify-between items-center mb-4 p-3  rounded-md ">
        <span className="text-sm font-medium">
          {/* {t("FavPage.favSummary.tax")} */}
          Vergi:
        </span>
        <span className="text-sm font-semibold text-primary">
          {/* {t("FavPage.favSummary.symbol")} */}${tax.toFixed(2)}
        </span>
      </div>

      {/* Toplam Tasarruf */}
      <div className="flex justify-between items-center mb-4 p-3  rounded-md ">
        <span className="text-sm font-medium">
          {/* {t("FavPage.favSummary.savings")} */}
          Toplam Kazanç:
        </span>
        <span className="text-sm font-semibold text-primary">
          {/* {t("FavPage.favSummary.symbol")} */}${savings.toFixed(2)}
        </span>
      </div>

      {/* Buttons ve Input */}
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <hr className="w-full bg-secondary" />
        <div className="flex w-full justify-center items-center gap-3">
          <Button
            text="Alışverişe Devam Et"
            // text={t("FavPage.favSummary.continueShopping")}
            color="primary"
            size="large"
            onClick={() => {}}
            icon={FaArrowRightLong}
            iconSize={15}
            animation
            className="text-xs md:text-xs lg:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default FavSummary;
