"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaBars, FaUser, FaBoxOpen, FaCogs } from "react-icons/fa"; // React Icons

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu on mobile
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="container mt-24">
      <div className="flex flex-col gap-x-12 md:flex-row h-full">
        {/* Sidebar for larger screens, Topbar for mobile */}
        <div className="h-full  md:w-1/4 rounded-lg bg-secondary text-white p-6 md:block hidden">
          <Link href="/profile">
            <h3 className="text-lg font-semibold mb-4 border-b">
              {t("profile.menuTitle")}
            </h3>
          </Link>

          <ul className="space-y-4">
            <li>
              <Link
                href="/profile"
                className="text-white hover:text-primary transition duration-300 flex items-center"
              >
                <FaUser className="mr-3" /> {t("profile.profile")}
              </Link>
            </li>
            <li>
              <Link
                href="/profile/orders"
                className="text-white hover:text-primary transition duration-300 flex items-center"
              >
                <FaBoxOpen className="mr-3" /> {t("profile.orders")}
              </Link>
            </li>
            <li>
              <Link
                href="/profile/update"
                className="text-white hover:text-primary transition duration-300 flex items-center"
              >
                <FaCogs className="mr-3" /> {t("profile.update")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Topbar for mobile */}
        <div className="md:hidden flex justify-between items-center p-5 bg-secondary text-white">
          <h3 className="text-lg font-semibold"> {t("profile.menuTitle")}</h3>
          <button onClick={toggleMenu} className="text-white">
            {/* Hamburger icon for mobile menu */}
            <FaBars className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu (Appears when isMenuOpen is true) */}
        {isMenuOpen && (
          <div className="md:hidden bg-secondary text-white p-3 border-t">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/profile"
                  className="text-white hover:text-primary transition duration-300 flex items-center"
                >
                  <FaUser className="mr-3" /> {t("profile.profile")}
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/orders"
                  className="text-white hover:text-primary transition duration-300 flex items-center"
                >
                  <FaBoxOpen className="mr-3" /> {t("profile.orders")}
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/update"
                  className="text-white hover:text-primary transition duration-300 flex items-center"
                >
                  <FaCogs className="mr-3" /> {t("profile.update")}
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 h-full w-full min-h-[400px] ">{children}</div>
      </div>
    </div>
  );
}
