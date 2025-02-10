"use client"
import React, { useState } from "react";
import { FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { IoEarth } from "react-icons/io5";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import Logo from "./Logo";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, openRegisterModal } from "@/store/modalsSlice";
import Button from "@/components/general/Button";
import {AppDispatch, RootState} from "@/store/store";
import {signOut, useSession} from "next-auth/react";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data: session } = useSession()
  const pathname = usePathname();
  const carts = useSelector((state: RootState) => state.cart.carts);
  const favs = useSelector((state: RootState) => state.favorites.favs);

  const menuItems = [
    { name: "Profile", url: "/profile" },
    { name: "Admin", url: "/admin" },
  ];

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Blogs", url: "/blogs" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];

  // locale lang changes
  const supportedLocales = ["tr", "en"];

  const changeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang });
    setIsLangDropdownOpen(false);
  };

  // const t = useTranslations();
  // const menuItems = [
  //   { name: t("menuItems.profile"), url: "/profile" },
  //   { name: t("menuItems.admin"), url: "/admin" },
  // ];

  // const navLinks = [
  //   { name: t("navLinks.home"), url: "/" },
  //   { name: t("navLinks.products"), url: "/products" },
  //   { name: t("navLinks.blogs"), url: "/blogs" },
  //   { name: t("navLinks.about"), url: "/about" },
  //   { name: t("navLinks.contact"), url: "/contact" },
  // ];

  return (
      <header className="text-mywhite z-50 fixed w-full">
        {/* Top Bar */}
        <TopBar />

        {/* Navbar */}
        <nav className="bg-transparent backdrop-blur-3xl bg-opacity-0 w-full border-">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <Logo />

            {/* Hamburger Menu (Mobile) */}
            <div className="lg:hidden flex items-center justify-center">
              <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="text-myblack text-2xl focus:outline-none border border-black rounded-md p-1"
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
                <Link href="/cart" className="flex items-center">
                  <BsCart2 size={30} className="cursor-pointer text-secondary"/>
                  <span
                      className="absolute -top-2 -right-2 bg-red-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {carts.length}
                </span>
                </Link>
              </li>

              <ul className="hidden lg:flex gap-x-4 items-center text-base font-semibold relative">
                <li>
                  <IoEarth
                      size={32}
                      className="cursor-pointer text-secondary"
                      onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  />
                  {isLangDropdownOpen && (
                      <ul className=" absolute top-7 left-0 mt-2 w-16 bg-white border rounded shadow-md">
                        {supportedLocales.map((lang) => (
                            <li key={lang}>
                              <button
                                  onClick={() => changeLanguage(lang)}
                                  className="block w-full px-3 py-1 text-left hover:bg-gray-100 text-secondary"
                              >
                                {lang === "tr" ? "TR" : "EN"}
                              </button>
                            </li>
                        ))}
                      </ul>
                  )}
                </li>
                <li className={'text-secondary relative'}>
                  {
                    !session ? (<button onClick={() => dispatch(openLoginModal())}
                                        className="flex items-center text-xl">Log In</button>): (
                        session?.user.role[0] === 'ADMIN' ? (
                            <button className={'text-xl flex flex-row items-center gap-x-1'} onClick={()=> setOpenUserDropdown(!openUserDropdown)} ><FaUser size={28}/></button>
                        ): <button onClick={()=> setOpenUserDropdown(!openUserDropdown)} className={'text-xl'} >Hesabım</button>
                    )
                  }
                  <span className={`${openUserDropdown ? 'block':'hidden'} flex flex-col border rounded absolute -bottom-20 w-20 bg-white`}>
                    <Link className={'hover:bg-gray-200 px-2 py-2'} href={session?.user.role[0] === 'ADMIN' ? '/admin':'/profile'}>
                      {session?.user.role[0] === 'ADMIN' ? 'Admin' : 'Profile'}
                    </Link>
                    <button className={'hover:bg-gray-200 px-2 pb-2 text-red-600'} onClick={()=> signOut()}>Log Out</button>
                  </span>
                </li>
              </ul>

            </ul>
          </div>

          {/* Mobile Menu */}
          {openMenu && (
              <ul className="lg:hidden justify-center items-center flex flex-col border-t-2 text-myblack border-black p-4 space-y-4 border-b-2">
                {navLinks.map((link) => (
                    <li key={link.url}>
                      <Link
                          href={link.url}
                          className="block text-lg underline underline-offset-4 px-2 rounded-md"
                      >
                        {link.name}
                      </Link>
                    </li>
                ))}
                <div className="flex items-center gap-4 mt-4">
                  <Link href="/cart">
                    <BsCart2
                        size={30}
                        className="cursor-pointer hover:opacity-60"
                    />
                  </Link>
                </div>
                <li className="flex items-center justify-center">
                  <div className="relative">
                    <div
                        className="flex items-center justify-center space-x-2 border rounded-full p-2 hover:opacity-60 border-black cursor-pointer"
                        onClick={() => setOpenDropdown(!openDropdown)}
                    >
                      <FaUser size={20} />
                    </div>
                    {openDropdown && (
                        <div className="absolute top-9 left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-secondary text-mywhite border-myblack shadow-xl rounded-md p-2 flex flex-col items-center space-y-2 border z-50">
                          {menuItems.map((item, i) => (
                              <Link
                                  key={i}
                                  href={item.url}
                                  className="w-full text-center hover:bg-third rounded-md text-sm px-2 py-1"
                              >
                                {item.name}
                              </Link>
                          ))}
                          {/* Sign Up and Log In actions */}
                          <Button
                              text="Sign Up"
                              color="default"
                              onClick={() => dispatch(openRegisterModal())}
                              className="w-full text-center hover:bg-third rounded-md text-sm px-2 py-1"
                          />
                          <Button
                              text="Login"
                              color="default"
                              onClick={() => dispatch(openLoginModal())}
                              className="w-full text-center hover:bg-third rounded-md text-sm px-2 py-1"
                          />
                          <Button
                              text="Log out"
                              color="default"
                              onClick={() => console.log("logout")}
                              className="w-full text-center hover:bg-third rounded-lg text-sm px-2 py-1"
                          />
                        </div>
                    )}
                  </div>
                </li>
              </ul>
          )}
        </nav>
      </header>
  );
}

export default Navbar;