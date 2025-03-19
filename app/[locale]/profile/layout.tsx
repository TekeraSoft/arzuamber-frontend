"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  FaUser,
  FaBoxOpen,
  FaCogs,
  FaKey,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "animate.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeModal = (e: React.MouseEvent) => {
    // Modal dışına tıklanırsa, ilgili modal'ı kapat
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="md:container   w-full mt-20 mb-5 bg-white  md:rounded-lg ">
      <div className="flex flex-col md:flex-row gap-2 w-full">
        {/* Sidebar (Desktop) */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5 bg-white p-4 mt-5 h-full">
          <SidebarMenu />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden  flex justify-between items-center border-b  p-3 md:rounded-lg">
          <h3 className="text-lg font-semibold ">{t("profile.menuTitle")}</h3>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar (Slide-in Menu) */}
        {isMenuOpen && (
          <div
            onClick={closeModal}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          >
            <div
              className={`w-64 bg-white h-full p-5 shadow-lg  animate__animated animate__fadeInRight animate__faster`}
            >
              <SidebarMenu closeMenu={() => setIsMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 w-full bg-white py-4  min-h-[400px] border-l ">
          {children}
        </div>
      </div>
    </div>
  );
}

/* Sidebar Menü Bileşeni */
function SidebarMenu({ closeMenu }: { closeMenu?: () => void }) {
  const t = useTranslations();
  /* Menü Öğeleri */
  const menuItems = [
    { href: "/profile", icon: FaUser, label: "profile.profile" },
    { href: "/profile/orders", icon: FaBoxOpen, label: "profile.orders" },
    { href: "/profile/update", icon: FaCogs, label: "profile.update" },
    {
      href: "/profile/password-change",
      icon: FaKey,
      label: "profile.passchange",
    },
  ];

  return (
    <div className=" w-full">
      <div className="w-full flex justify-end items-center md:hidden">
        <button
          onClick={closeMenu}
          className=" bg-red-500 text-white p-0.5 rounded-md hover:scale-105 transition duration-300"
        >
          <IoMdClose size={20} />
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-primary">
        {t("profile.menuTitle")}
      </h3>
      <ul className="space-y-3">
        {menuItems.map(({ href, icon: Icon, label }, index) => (
          <li key={index}>
            <Link
              href={href}
              className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-200 transition duration-300 w-full"
              onClick={closeMenu}
            >
              <Icon className="text-primary" /> {t(label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
