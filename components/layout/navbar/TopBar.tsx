import React from "react";
// import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GoDotFill } from "react-icons/go";
import { FaHandsHelping } from "react-icons/fa";
import { LuCircleHelp } from "react-icons/lu";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setHowToBuyModalStatus } from "@/store/generalSlice";
import { BiLogoWhatsapp } from "react-icons/bi";

function TopBar() {
  // const t = useTranslations();
  const phoneNumber = "https://wa.me/905342608385";
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-center items-center bg-secondaryLight  py-2">
      {/* <div className="left-section flex items-center">
        <span>{t("topBar.discountMessage")}</span>
        <Link href={`/products`}>
          <span className="text-myblack px-1 cursor-pointer hover:underline">
            {t("topBar.checkItOut")}
          </span>
        </Link>
      </div> */}

      <div className="flex justify-between items-center navbarContainer text-white px-5 md:my-0.5">
        <Link
          href={phoneNumber}
          target="_blank"
          className="w-full flex justify-start items-center gap-0.5   hover:underline "
        >
          <GoDotFill size={14} className=" hidden md:block" />
          <BiLogoWhatsapp size={14} className="  block  md:hidden" />
          <span className="flex gap-1 text-[9px] md:text-xs whitespace-nowrap">
            +90 (534) 260 8385 -{" "}
            <span className=" hidden md:grid">Destek Hattı</span> (10:00 -
            18:00)
          </span>
        </Link>

        <div className="flex items-center justify-end gap-2 w-full text-[9px] md:text-xs">
          <Link
            href="/help"
            className=" cursor-pointer hover:underline flex items-center gap-1"
          >
            Yardım
            <FaHandsHelping size={14} />
          </Link>
          <span className="text-white md:mx-1 border-l border-white h-3"></span>
          <button
            onClick={() => {
              dispatch(setHowToBuyModalStatus(true));
            }}
            className=" cursor-pointer hover:underline flex items-center gap-1"
          >
            Nasıl Ürün Alırım
            <LuCircleHelp size={14} />
          </button>
          <span className="text-white md:mx-1 border-l border-white h-3"></span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
