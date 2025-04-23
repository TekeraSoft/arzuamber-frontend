import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "@/i18n/routing";
import {
  FaBlog,
  FaBoxOpen,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaThList,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesDispatch, setShortCategory } from "@/store/categorySlice";
import { IoMdArrowDropright } from "react-icons/io";

function NavbarMobile({ setOpenMenu, openMenu, SearchOpen, setSearchOpen }) {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesDispatch());
  }, [dispatch]);

  const { categories } = useSelector((state: RootState) => state.category);

  const navLinks = [
    { name: t("navLinks.home"), url: "/", icon: <FaHome /> },
    { name: t("navLinks.products"), url: "/products", icon: <FaBoxOpen /> },
    {
      name: t("navLinks.categories"),
      icon: <FaThList />,
      hasSubmenu: true,
    },
    { name: t("navLinks.blogs"), url: "/blogs", icon: <FaBlog /> },
    { name: t("navLinks.about"), url: "/about", icon: <FaInfoCircle /> },
    { name: t("navLinks.contact"), url: "/contact", icon: <FaEnvelope /> },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full border-t">
      <div
        className="bg-black bg-opacity-40 w-full"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setOpenMenu(false);
            setShowCategories(false);
          }
        }}
      >
        <div
          className={`lg:hidden bg-mywhite flex flex-col items-start justify-start border-r ${
            openMenu
              ? "relative w-1/2 max-w-72 transform transition-all duration-700 min-h-screen translate-x-0"
              : "max-h-0 overflow-hidden -translate-x-full"
          }`}
        >
          <ul className="text-sm w-full flex flex-col justify-center items-start gap-1 px-2 py-2">
            {navLinks.map((link, i) => {
              if (link.hasSubmenu) {
                return (
                  <div key={i} className="w-full">
                    <button
                      onClick={() => setShowCategories(!showCategories)}
                      className="flex items-center gap-2 text-primary hover:bg-secondary hover:text-mywhite transition-all duration-300 justify-between w-full p-2 rounded-lg"
                    >
                      <span className="flex items-center gap-2">
                        {link.icon}
                        {link.name}
                      </span>
                      {showCategories ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {showCategories && (
                      <div className="pl-6 py-1 flex flex-col gap-1">
                        {categories.map((category, index) => (
                          <Link
                            href={`/category/${category.name}`}
                            key={index}
                            onClick={() => {
                              dispatch(setShortCategory(category.name));
                              setOpenMenu(false);
                              setShowCategories(false);
                            }}
                          >
                            <span className="flex items-center text-sm text-primary hover:bg-secondary hover:text-mywhite transition-all duration-300 justify-start p-1 w-full rounded-lg gap-2">
                              <IoMdArrowDropright className="text-base" />
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.url}
                  href={link.url}
                  className="block text-center w-full"
                >
                  <li
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center gap-2 text-primary hover:bg-secondary hover:text-mywhite transition-all duration-300 justify-start p-2 w-full rounded-lg"
                  >
                    {link.icon}
                    {link.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      {!openMenu && SearchOpen && (
        <div className="w-full flex lg:hidden">
          <SearchBar SearchOpen={SearchOpen} setSearchOpen={setSearchOpen} />
        </div>
      )}
    </div>
  );
}

export default NavbarMobile;
