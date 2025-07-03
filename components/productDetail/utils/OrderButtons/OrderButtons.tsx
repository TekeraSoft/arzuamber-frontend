"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import SelectSizeModal from "./SelectSizeModal";
import { useParams } from "next/navigation";

interface OrderButtonsProps {
  pathName: string;
  productName: string;
  productLink: string;
  productColor: string;
  productSize: string;
}

const OrderButtons = ({
    pathName,
  productName,
  productLink,
  productSize,
  productColor,
}: OrderButtonsProps) => {
  const local = useLocale();


  // Modal açma/kapatma için state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editedShareUrl = pathName?.startsWith("/df") ? `https://www.arzuamber.com/${local}${pathName}` : `https://www.arzuamber.com/${local}/product/` + productLink;

  const handleWhatsAppOrder = () => {
    if (!productSize) {
      // Eğer boyut seçilmemişse, modal'ı açıyoruz
      setIsModalOpen(true);
      return;
    }

    const message = `Merhaba, bu ürünü sipariş vermek istiyorum,\n Ürün Adı: ${productName}  \nBeden: ${productSize} \nRenk: ${productColor}  \n${editedShareUrl}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905342608385?text=${encodedMessage}`, "_blank");
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modal'ı kapat
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-2 w-full">
      {/* Telefon ile Sipariş Ver */}
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="tel:905342608385"
        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-xs md:text-sm text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 w-full whitespace-nowrap "
      >
        <FaPhoneAlt className="text-xl md:text-xl" />
        Telefon ile Sipariş Ver
      </motion.a>

      {/* WhatsApp ile Sipariş Ver */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsAppOrder}
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-xs md:text-sm text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 w-full whitespace-nowrap"
      >
        <FaWhatsapp className="text-2xl" />
        WhatsApp ile Sipariş Ver
      </motion.button>

      {/* Modal: Boyut seçilmediğinde gösterilecek */}
      {isModalOpen && <SelectSizeModal closeModal={closeModal} />}
    </div>
  );
};

export default OrderButtons;
