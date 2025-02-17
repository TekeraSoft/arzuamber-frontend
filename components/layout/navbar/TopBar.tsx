import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

function TopBar() {
  const t = useTranslations();

  return (
    <div className="top-bar hidden md:flex justify-center items-center bg-secondaryLight text-sm py-2">
      {t("topBar.discountMessage")}
      <Link href={`/products`}>
        <span className="text-myblack px-1 cursor-pointer hover:underline">
          {t("topBar.checkItOut")}
        </span>
      </Link>
    </div>
  );
}

export default TopBar;
