"use client";
import { Link, usePathname } from "@/i18n/routing";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const phoneNumber = "https://wa.me/905342608385";
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/admin") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [pathName]);

  return (
    <Link
      href={`${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        isVisible ? "fixed" : "hidden"
      }  bottom-5 right-4 z-50 bg-green-500 border text-white p-2 md:p-4 rounded-full shadow-lg hover:scale-105 transition-all text-2xl flex items-center justify-center`}
    >
      <FaWhatsapp />
    </Link>
  );
}
