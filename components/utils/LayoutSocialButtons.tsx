"use client";
import { Link, usePathname } from "@/i18n/routing";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function LayoutSocialButtons() {
  const [isVisible, setIsVisible] = useState(true);
  const phoneNumber = "https://wa.me/905342608385";
  const instaUrl = "https://www.instagram.com/arzuamber.moda";
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/admin") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [pathName]);

  return (
    <div
      className={`${
        isVisible ? "flex" : "hidden"
      } fixed bottom-5 right-4 z-50 flex-row gap-3`}
    >
      <Link
        href={instaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-secondary border text-white p-2 md:p-4 rounded-full shadow-lg hover:scale-105 transition-all text-2xl flex items-center justify-center"
      >
        <FaInstagram />
      </Link>
      <Link
        href={phoneNumber}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 border text-white p-2 md:p-4 rounded-full shadow-lg hover:scale-105 transition-all text-2xl flex items-center justify-center"
      >
        <FaWhatsapp />
      </Link>
    </div>
  );
}
