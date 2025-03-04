import { useTranslations } from "next-intl";
import React from "react";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const t = useTranslations();

  return (
    <div className="w-full  flex justify-center items-center bg-mywhite text-black px-5 py-2 ">
      <div className=" w-full flex ">
        <input
          type="text"
          placeholder={t("SearchBar.placeHolder")}
          className="px-4 py-1 outline-none bg-white  w-full text-sm border border-secondary rounded-l-lg pr-10 text-primary selection:bg-secondary  selection:text-mywhite "
        />
        <button className=" flex items-center justify-center bg-secondary text-white px-3 rounded-r-lg hover:bg-secondaryDark transition duration-300">
          <BiSearch size={18} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
