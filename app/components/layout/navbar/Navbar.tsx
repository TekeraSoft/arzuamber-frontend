"use client";

import React, { useState } from "react";
import { FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Link } from "@/i18n/routing";
import Logo from "./Logo";
import TopBar from "./TopBar";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const menuItems = [
    { name: "Profile", url: "/profile" },
    { name: "Sign Up", url: "/register" },
    { name: "Log In", url: "/login" },
    { name: "Admin", url: "/admin" },
    { name: "Logout", url: "/logout" },
  ];

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Blogs", url: "/blogs" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <header className="text-mywhite z-50  fixed w-full">
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
            <li>
              <BiSearch size={30} className="cursor-pointer text-secondary" />
            </li>
            <li className="relative">
              <Link href="/cart" className="flex items-center">
                <BsCart2 size={30} className="cursor-pointer text-secondary" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  15
                </span>
              </Link>
            </li>
            <li className="relative">
              <Link href="/favorites" className="flex items-center">
                <FaHeart size={28} className="cursor-pointer text-secondary" />
                <span className="absolute -top-2 -right-3 bg-red-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  8
                </span>
              </Link>
            </li>
            <li
              className="relative flex flex-col items-center justify-center"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              {/* Kullanıcı Simgesi */}
              <div className="transition duration-300 w-full">
                <div className="flex items-center justify-center cursor-pointer text-secondary border border-gray-300 rounded-full p-2">
                  <FaUser size={28} />
                </div>
              </div>
              {/* Açılır Menü */}
              {openDropdown && (
                <div
                  className={`absolute mt-4 top-7 bg-mywhite text-myblack shadow-xl rounded-md text-sm font-thin flex flex-col justify-center items-center border border-gray-300 text-center transition-all duration-300 w-28`}
                >
                  {menuItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.url}
                      className="hover:bg-gray-200 rounded px-4 py-2 w-full text-center truncate"
                      title={item.name}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li className="relative">
              <Link href="" className="flex items-center">
                <FaHeart size={28} className="cursor-pointer text-secondary" />
                <span className="absolute -top-2 -right-3 bg-red-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  8
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {openMenu && (
          <ul className="lg:hidden justify-center items-center flex flex-col border-t-2 text-myblack border-black p-4 space-y-4 border-b-2 ">
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
              <BiSearch size={30} className="cursor-pointer hover:opacity-60" />
              <BsCart2 size={30} className="cursor-pointer hover:opacity-60" />
              <FaHeart size={28} className="cursor-pointer hover:opacity-60" />
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
                  <div className="absolute top-9 left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-secondary text-mywhite border-myblack shadow-xl rounded-md p-2 flex flex-col items-center space-y-2 border z-50 ">
                    {menuItems.map((item, i) => (
                      <Link
                        key={i}
                        href={item.url}
                        className="w-full text-center hover:bg-third rounded-md text-sm px-2 py-1"
                      >
                        {item.name}
                      </Link>
                    ))}
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
