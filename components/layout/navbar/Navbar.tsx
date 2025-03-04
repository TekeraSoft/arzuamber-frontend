"use client";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import Logo from "./Logo";
// import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import { openCartModal, openLoginModal } from "@/store/modalsSlice";
import { useLocale } from "next-intl";
import { AppDispatch, RootState } from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FaUserShield } from "react-icons/fa";
import SearchBar from "./SearchBar";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { data: session } = useSession();

  const { cartProducts } = useSelector((state: RootState) => state.cart);

  // locale lang changes
  const supportedLocales = ["tr", "en"];

  const changeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang });
    setIsLangDropdownOpen(false);
  };

  const navLinks = [
    { name: t("navLinks.home"), url: "/" },
    { name: t("navLinks.products"), url: "/products" },
    { name: t("navLinks.blogs"), url: "/blogs" },
    { name: t("navLinks.about"), url: "/about" },
    { name: t("navLinks.contact"), url: "/contact" },
  ];

  const openCart = () => {
    dispatch(openCartModal());
  };

  return (
    <header className="text-mywhite z-50 fixed w-full ">
      {/* <TopBar /> */}

      {/* Navbar */}
      <nav className="bg-white  w-full  flex  ">
        <div className="container mx-auto flex  items-center justify-between px-4 py-3">
          {/* Logo */}
          <Logo setOpenMenu={setOpenMenu} openMenu={openMenu}/>

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden flex items-center justify-center gap-4 ">
            <li
                className="flex  justify-center items-center relative z-50"
                onMouseLeave={() => setIsLangDropdownOpen(false)}
            >
              <button
                  className="w-8 h-7 flex items-center justify-center border border-slate-300   rounded-md text-secondary text-xs font-semibold uppercase transition duration-500 hover:bg-secondary hover:text-white"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  onMouseLeave={() => setIsLangDropdownOpen(false)}
                  onMouseEnter={() => setIsLangDropdownOpen(true)}
              >
                {locale}
              </button>
              {isLangDropdownOpen && (
                  <ul
                      className=" absolute  top-7 w-8 bg-white border   shadow-md text-sm rounded"
                      onMouseEnter={() => setIsLangDropdownOpen(true)}
                  >
                    {supportedLocales.map((lang) => (
                        <li
                            key={lang}
                            className="transition-all duration-200 hover:scale-105"
                        >
                          <button
                              onClick={() => changeLanguage(lang)}
                              className="block  w-full  py-1.5 text-center text-xs text-secondary rounded
                                hover:bg-secondary hover:text-white  transition-all duration-300"
                          >
                            {lang.toUpperCase()}
                          </button>
                        </li>
                    ))}
                  </ul>
              )}
            </li>

            <button
                className="flex justify-center items-center relative"
                onClick={openCart}
            >
              <BsCart2 size={26} className="cursor-pointer text-secondary"/>
              <span
                  className="absolute  -top-1 left-3  bg-red-600  font-bold rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {cartProducts.length}
              </span>
            </button>

            <li
                className={
                  "  text-primary relative flex justify-center items-center   "
                }
            >
              {!session ? (
                  <button
                      onClick={() => {
                        dispatch(openLoginModal());
                        setOpenMenu(false);
                      }}
                      className="flex justify-center items-center w-full  text-center   "
                  >
                  <span
                      className="gap-1 border border-primary rounded-full text-sm  px-2 py-1 hover:bg-secondary hover:text-mywhite hover:border-slate-200 transition-all duration-300">
                    {t("menuItems.login")}
                  </span>
                  </button>
              ) : session?.user.role[0] === "ADMIN" ? (
                  <button
                      className={
                        " flex flex-row  justify-center items-center w-8 h-8   border border-primary rounded-full text-sm relative"
                      }
                      onClick={() => {
                        setOpenUserDropdown(!openUserDropdown);
                      }}
                      onMouseEnter={() => setOpenUserDropdown(true)}
                      onMouseLeave={() => setOpenUserDropdown(false)}
                  >
                    <FaUser size={15}/>
                  </button>
              ) : (
                  <button
                      className={
                        " flex flex-row  justify-center items-center px-4   border border-primary rounded-full  relative w-full"
                      }
                      onClick={() => {
                        setOpenUserDropdown(!openUserDropdown);
                      }}
                  ></button>
              )}
              <span
                  className={`${
                      openUserDropdown ? "block" : "hidden"
                  } flex flex-col border rounded absolute  top-6  w-20  bg-white`}
                  onMouseEnter={() => setOpenUserDropdown(true)}
                  onMouseLeave={() => setOpenUserDropdown(false)}
              >
                <Link
                    onClick={() => {
                      setOpenMenu(false);
                    }}
                    className={
                      "hover:bg-gray-200 px-2 py-1 text-xs md:text-sm text-center"
                    }
                    href={
                      session?.user.role[0] === "ADMIN" ? "/admin" : "/profile"
                    }
                >
                  {session?.user.role[0] === "ADMIN"
                      ? "Admin"
                      : t("menuItems.profile")}
                </Link>
                <button
                    className={
                      "hover:bg-gray-200 px-2 pb-2 text-red-600 text-xs md:text-sm"
                    }
                    onClick={() => {
                      signOut();
                      setOpenMenu(false);
                    }}
                >
                  {t("menuItems.logout")}
                </button>
              </span>
            </li>
          </div>

          <ul
              className={`hidden w-1/2 md:flex flex-row justify-between items-center gap-1 font-semibold`}
          >
            {navLinks.map((link) => (
                <Link
                    key={link.url}
                    href={link.url}
                    className="block text-center w-full"
                >
                  <li
                      onClick={() => setOpenMenu(false)}
                      className={`flex flex-col text-primary hover:underline underline-offset-4 transition-all duration-300 justify-start items-start p-1 w-full rounded-lg 
              }`}
                  >
                    {link.name}
                  </li>
                </Link>
            ))}
          </ul>
          {/*  {
            <div className=" hidden  lg:flex w-1/2">
              <SearchBar />
            </div>
          } */}

          {/* Icons */}
          <ul className="hidden lg:flex items-center justify-center gap-x-6">
            <li
                className="relative z-50"
                onMouseLeave={() => setIsLangDropdownOpen(false)}
            >
              <button
                  className="w-10 h-8 flex items-center justify-center border border-slate-300  rounded-md text-secondary text-xs font-semibold uppercase transition duration-500 hover:bg-secondary hover:text-white"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  onMouseLeave={() => setIsLangDropdownOpen(false)}
                  onMouseEnter={() => setIsLangDropdownOpen(true)}
              >
                {locale}
              </button>
              {isLangDropdownOpen && (
                  <ul
                      className=" absolute  top-8 w-10  bg-white border rounded shadow-md text-sm"
                      onMouseEnter={() => setIsLangDropdownOpen(true)}
                  >
                    {supportedLocales.map((lang) => (
                        <li key={lang}>
                          <button
                              onClick={() => changeLanguage(lang)}
                              className="block w-full  py-1 text-center rounded text-secondary  hover:bg-secondary hover:text-white  transition-all duration-300"
                          >
                            {lang === "tr" ? "TR" : "EN"}
                          </button>
                        </li>
                    ))}
                  </ul>
              )}
            </li>

            <li className="relative">
              <button
                  className="flex justify-center items-center"
                  onClick={openCart}
              >
                <BsCart2 size={30} className="cursor-pointer text-secondary"/>
                <span
                    className="absolute -top-2 -right-2 bg-red-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartProducts.length}
                </span>
              </button>
            </li>

            <ul className="hidden lg:flex gap-x-4 items-center text-base font-semibold relative">
              <li className={"text-secondaryDark relative"}>
                {!session ? (
                    <button
                        onClick={() => {
                          dispatch(openLoginModal());
                        }}
                        className="flex items-center text-base hover:underline transition-all duration-300"
                    >
                      {t("menuItems.login")}
                    </button>
                ) : session?.user.role[0] === "ADMIN" ? (
                    <button
                        className={"text-xl flex flex-row items-center gap-x-1"}
                        onClick={() => setOpenUserDropdown(!openUserDropdown)}
                        onMouseEnter={() => setOpenUserDropdown(true)}
                        onMouseLeave={() => setOpenUserDropdown(false)}
                    >
                      <FaUserShield size={32}/>
                    </button>
                ) : (
                    <button
                        className="flex justify-center items-center"
                        onClick={() => setOpenUserDropdown(!openUserDropdown)}
                        onMouseEnter={() => setOpenUserDropdown(true)}
                        onMouseLeave={() => setOpenUserDropdown(false)}
                    >
                      <FaUser size={26}/>
                    </button>
                )}
                <span
                    className={`${
                        openUserDropdown ? "block" : "hidden"
                    } flex flex-col border rounded absolute   left-0  w-20 bg-white z-50`}
                    onMouseEnter={() => setOpenUserDropdown(true)}
                    onMouseLeave={() => setOpenUserDropdown(false)}
                >
                  <Link
                      onClick={() => {
                        setOpenMenu(false);
                      }}
                      className="hover:bg-gray-200 px-2 py-1 text-sm flex justify-center items-center"
                      href={
                        session?.user.role[0] === "ADMIN" ? "/admin" : "/profile"
                      }
                  >
                    {session?.user.role[0] === "ADMIN"
                        ? "Admin"
                        : t("menuItems.myAccount")}
                  </Link>

                  <button
                      className={
                        "hover:bg-gray-200 px-2 pb-2 text-red-600 text-sm"
                      }
                      onClick={() => {
                        signOut();
                        setOpenMenu(false);
                      }}
                  >
                    {t("menuItems.logout")}
                  </button>
                </span>
              </li>
            </ul>
          </ul>
        </div>

        {/* Mobile Menu */}
      </nav>
      <div className="flex flex-col justify-center items-center w-full border-t">
        <div
            className="bg-black bg-opacity-40 w-full"
            onClick={() => setOpenMenu(false)}
        >
          <div
              className={` lg:hidden bg-mywhite  flex flex-col items-start justify-start border-r  ${
                  openMenu
                      ? " relative w-1/2 max-w-72 transform transition-all duration-700 min-h-screen translate-x-0"
                      : "max-h-0 overflow-hidden -translate-x-full "
              }`}
          >
            <ul
                className={` text-sm  w-full flex flex-col justify-center items-start gap-1   px-2 py-2    `}
            >
            {navLinks.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className="block text-center w-full"
                >
                  <li
                    onClick={() => setOpenMenu(false)}
                    className={`flex flex-col text-primary hover:bg-secondary hover:text-mywhite transition-all duration-300 justify-start items-start p-1 w-full rounded-lg 
              }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {/*
        {!openMenu && (
          <div className="w-full flex lg:hidden border-b ">
            <SearchBar />
          </div>
        )}
        */}

      </div>
    </header>
  );
}

export default Navbar;
