"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FaUser, FaBoxOpen, FaCogs, FaKey } from "react-icons/fa";
import "animate.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:container w-full mt-20 mb-5 bg-white md:rounded-lg">
      <div className="flex flex-col md:flex-row gap-2 w-full">
        {/* Sidebar (Desktop) */}
        <div className="md:block md:w-1/4 lg:w-1/5 bg-white p-4 mt-5 h-full">
          <SidebarMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full flex bg-white py-4 min-h-[70vh] border-l px-2">
          {children}
        </div>
      </div>
    </div>
  );
}

/* Sidebar Menü Bileşeni */
function SidebarMenu() {
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
    <div className="w-full">
      <h3 className="text-2xl md:text-lg font-semibold mb-4 border-b pb-2 text-primary  text-center">
        {t("profile.menuTitle")}
      </h3>
      <ul className="grid grid-cols-2 gap-4 md:flex md:flex-col items-center md:items-start w-full">
        {menuItems.map(({ href, icon: Icon, label }, index) => (
          <li key={index} className="w-full">
            <Link
              href={href}
              className="flex flex-col items-center justify-center text-center rounded-lg hover:bg-gray-200 transition duration-300 p-3 border w-full"
            >
              <Icon className="text-primary text-xl mb-1" />
              <span className="text-sm font-medium">{t(label)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
