import React from "react";
import { BsBox } from "react-icons/bs";
import { FaRegCreditCard, FaTruck } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { useTranslations } from "next-intl";

function FooterIcons() {
  const t = useTranslations();

  return (
    <div className="flex justify-center items-center gap-4 py-4 md:py-5 bg-gray-50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <GoArrowSwitch className="text-2xl md:text-3xl" />
          <span className="text-primary text-xs md:text-sm text-center">
            {t("footer.freeReturn")}
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <FaTruck className="text-2xl md:text-3xl" />
          <span className="text-primary text-xs md:text-sm text-center">
            {t("footer.fastDelivery")}
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <FaRegCreditCard className="text-2xl md:text-3xl" />
          <span className="text-primary text-xs md:text-sm text-center">
            {t("footer.securePayment")}
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <BsBox className="text-2xl md:text-3xl" />
          <span className="text-primary text-xs md:text-sm text-center">
            {t("footer.carefulPackaging")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FooterIcons;
