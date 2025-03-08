"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineSearchOff } from "react-icons/md";

function SearchBar() {
  const t = useTranslations();

  const [SearchOpen, setSearchOpen] = useState(false);

  if (SearchOpen) {
    return (
      <div
        className={` 
      
      ${SearchOpen ? "w-full" : "w-0"}
      
      flex justify-center items-center bg-mywhite text-black px-5 py-2 border-b md:border-none transition duration-300  `}
      >
        <div className="w-8 h-full flex justify-center items-center">
          <MdOutlineSearchOff
            size={16}
            onClick={() => setSearchOpen(!SearchOpen)}
          />
        </div>
        <div className=" w-full flex  transition duration-300 hover:shadow hover:shadow-secondary rounded-lg  ">
          <input
            type="text"
            placeholder={t("SearchBar.placeHolder")}
            className="px-4 py-1 outline-none  bg-white  w-full text-sm border border-secondary rounded-l-lg pr-10 text-primary selection:bg-secondary   selection:text-mywhite"
          />
          <button className=" flex items-center justify-center bg-secondary text-white px-3 rounded-r-lg hover:bg-secondaryDark transition duration-300">
            <BiSearch size={18} />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="    w-full flex justify-start lg:justify-end items-center">
        <button
          className=" w-9 h-9 flex items-center justify-center bg-secondary text-white px-3  hover:bg-secondaryDark transition duration-300"
          onClick={() => setSearchOpen(!SearchOpen)}
        >
          <BiSearch size={16} />
        </button>
      </div>
    );
  }
}

export default SearchBar;
