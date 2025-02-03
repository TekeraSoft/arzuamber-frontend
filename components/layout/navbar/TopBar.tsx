import React from "react";
// import { useTranslations } from "next-intl";

function TopBar() {
  // const t = useTranslations(); // Çevirileri almak için kullanılır.

  return (
    <div className="top-bar hidden md:flex justify-center items-center bg-secondaryLight text-sm py-2">
      {/* {t("topBar.discountMessage")} */}
      Up to 50% Off on New Season Products!!!
      <span className="text-myblack px-1 cursor-pointer hover:underline">
        {/* {t("topBar.checkItOut")} */}
        Check it out!
      </span>
    </div>
  );
}

export default TopBar;
