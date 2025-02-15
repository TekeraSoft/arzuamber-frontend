"use client";
import React, { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { IoEarth } from "react-icons/io5";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import Logo from "./Logo";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  openCartModal,
  openLoginModal,
  openRegisterModal,
} from "@/store/modalsSlice";
import Button from "@/components/general/Button";
import { AppDispatch, RootState } from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const carts = useSelector((state: RootState) => state.cart.carts);

  // locale lang changes
  const supportedLocales = ["tr", "en"];

  const changeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang });
    setIsLangDropdownOpen(false);
  };

  const t = useTranslations();

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
      {/* Top Bar */}
      <TopBar />

      {/* Navbar */}
      <nav className="bg-transparent backdrop-blur-2xl bg-opacity-0 w-full border-b border-black md:border-none ">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Logo />

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden flex items-center justify-center gap-5 ">
            <li className="flex  justify-center items-center">
              <IoEarth
                size={24}
                className="cursor-pointer text-secondary"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              />
              {isLangDropdownOpen && (
                <ul className=" absolute top-10 right-28  mt-1 w-12 bg-white border rounded shadow-md text-sm">
                  {supportedLocales.map((lang) => (
                    <li key={lang}>
                      <button
                        onClick={() => changeLanguage(lang)}
                        className="block w-full px-3 py-1 text-left hover:bg-gray-100 text-secondary "
                      >
                        {lang === "tr" ? "TR" : "EN"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <button
              className="flex justify-center items-center"
              onClick={openCart}
            >
              <BsCart2 size={26} className="cursor-pointer text-secondary" />
              <span className="absolute  top-3 right-16 bg-red-600  font-bold rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {carts.length}
              </span>
            </button>

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="text-myblack text-lg focus:outline-none border border-black rounded-md p-1"
            >
              {openMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Links (Desktop) */}
          <ul
            className={`hidden lg:flex gap-8 text-base font-semibold transition-all duration-300`}
          >
            {navLinks.map((link) => (
              <li key={link.url} className="relative group">
                <Link
                  href={link.url}
                  className=" text-md text-secondary hover:text-secondary transition-all duration-300"
                >
                  {link.name}
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary transition-all duration-500 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <ul className="hidden lg:flex items-center justify-center gap-5">
            <li className="relative">
              <button
                className="flex justify-center items-center"
                onClick={openCart}
              >
                <BsCart2 size={30} className="cursor-pointer text-secondary" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {carts.length}
                </span>
              </button>
            </li>

            <ul className="hidden lg:flex gap-x-4 items-center text-base font-semibold relative">
              <li>
                <IoEarth
                  size={32}
                  className="cursor-pointer text-secondary"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                />
                {isLangDropdownOpen && (
                  <ul className=" absolute top-7 right-8 mt-2 w-12 bg-white border rounded shadow-md text-sm">
                    {supportedLocales.map((lang) => (
                      <li key={lang}>
                        <button
                          onClick={() => changeLanguage(lang)}
                          className="block w-full px-3 py-1 text-left hover:bg-gray-100 text-secondary "
                        >
                          {lang === "tr" ? "TR" : "EN"}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className={"text-secondary relative"}>
                {!session ? (
                  <button
                    onClick={() => dispatch(openLoginModal())}
                    className="flex items-center text-xl hover:underline"
                  >
                    {t("menuItems.login")}
                  </button>
                ) : session?.user.role[0] === "ADMIN" ? (
                  <button
                    className={"text-xl flex flex-row items-center gap-x-1"}
                    onClick={() => setOpenUserDropdown(!openUserDropdown)}
                  >
                    <FaUser size={28} />
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenUserDropdown(!openUserDropdown)}
                    className={"text-xl "}
                  >
                    {t("menuItems.myAccount")}
                  </button>
                )}
                <span
                  className={`${
                    openUserDropdown ? "block" : "hidden"
                  } flex flex-col border rounded absolute  mt-1 left-0  w-20 bg-white`}
                >
                  <Link
                    className={"hover:bg-gray-200 px-2 py-1 text-sm"}
                    href={
                      session?.user.role[0] === "ADMIN" ? "/admin" : "/profile"
                    }
                  >
                    {session?.user.role[0] === "ADMIN" ? "Admin" : "Profile"}
                  </Link>
                  <button
                    className={
                      "hover:bg-gray-200 px-2 pb-2 text-red-600 text-sm"
                    }
                    onClick={() => signOut()}
                  >
                    {t("menuItems.logout")}
                  </button>
                </span>
              </li>
            </ul>
          </ul>
        </div>

        {/* Mobile Menu */}
        {openMenu && (
          <div>
            <ul className="lg:hidden grid items-center grid-cols-2  border-t text-myblack border-black  border-b mx-auto container gap-2 py-2">
              {navLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="block text-base underline underline-offset-4 px-2 rounded-md"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className={"  text-myblack  "}>
                {!session ? (
                  <button
                    onClick={() => dispatch(openLoginModal())}
                    className="flex items-center px-5 py-1  gap-1 border border-myblack rounded-full text-sm"
                  >
                    {t("menuItems.login")}
                  </button>
                ) : session?.user.role[0] === "ADMIN" ? (
                  <button
                    className={
                      " flex flex-row  justify-center items-center px-5 py-1  gap-1 border border-myblack rounded-full text-sm"
                    }
                    onClick={() => setOpenUserDropdown(!openUserDropdown)}
                  >
                    <FaUser />
                    {t("menuItems.myAccount")}
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenUserDropdown(!openUserDropdown)}
                    className={"text-xl "}
                  >
                    {t("menuItems.myAccount")}
                  </button>
                )}
                <span
                  className={`${
                    openUserDropdown ? "block" : "hidden"
                  } flex flex-col border rounded absolute   py-1  right-24  w-20 bg-white`}
                >
                  <Link
                    className={
                      "hover:bg-gray-200 px-2 py-1 text-sm text-center"
                    }
                    href={
                      session?.user.role[0] === "ADMIN" ? "/admin" : "/profile"
                    }
                  >
                    {session?.user.role[0] === "ADMIN" ? "Admin" : "Profile"}
                  </Link>
                  <button
                    className={
                      "hover:bg-gray-200 px-2 pb-2 text-red-600 text-sm"
                    }
                    onClick={() => signOut()}
                  >
                    {t("menuItems.logout")}
                  </button>
                </span>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
