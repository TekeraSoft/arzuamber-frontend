"use client";
import { Link } from "@/i18n/routing";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "https://wa.me/905342608385";

  return (
    <Link
      href={`${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5  right-4 z-50 bg-green-500 border text-white p-2 md:p-4 rounded-full shadow-lg hover:scale-105 transition-all text-2xl flex items-center justify-center"
    >
      <FaWhatsapp />
    </Link>
  );
}
