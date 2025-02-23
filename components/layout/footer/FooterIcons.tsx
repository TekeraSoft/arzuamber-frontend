import React from "react";
import { BsBox } from "react-icons/bs";
import { FaRegCreditCard, FaTruck } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { useTranslations } from "next-intl";

function FooterIcons() {
  const t = useTranslations();

  return (
    <div className="flex justify-center items-center gap-2 h-28 md:h-20 bg-gray-50 ">
      <div className="grid grid-cols-2 md:grid-cols-4 h-full px-2 md:px-12 w-full font-mono">
        <div className="flex justify-center items-center h-full gap-2">
          <GoArrowSwitch size={25} />
          <span className="text-primary text-xs md:text-sm ">
            {t("footer.freeReturn")}
          </span>
        </div>
        <div className="flex justify-center items-center gap-2 ">
          <FaTruck size={25} />
          <span className="text-primary text-xs md:text-sm">
            {t("footer.fastDelivery")}
          </span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaRegCreditCard size={25} />
          <span className="text-primary text-xs md:text-sm">
            {t("footer.securePayment")}
          </span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <BsBox size={25} />
          <span className="text-primary text-xs md:text-sm">
            {t("footer.carefulPackaging")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FooterIcons;
