import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { BsLink45Deg } from "react-icons/bs"; // Bağlantı kopyalama ikonu
import { useLocale, useTranslations } from "next-intl";
import { toast } from "react-toastify";

interface ShareButtonsProps {
  shareUrl: string;
  title: string;
  imageUrl: string;
  description?: string;
  hashtag?: string; // Hashtag'i opsiyonel olarak alıyoruz
}

function ShareButtons({
  shareUrl,
  title,
  imageUrl,
  description,
  hashtag, // Props olarak hashtag ekliyoruz
}: ShareButtonsProps) {
  const locale = useLocale();
  const t = useTranslations();

  // Locale'e göre URL'yi düzenleme
  const editedShareUrl = `https://www.arzuamber.com/${locale}/` + shareUrl;
  const editImageUrl = `${process.env.NEXT_PUBLIC_RESOURCE_API}${imageUrl}`;

  // Kopyalama işlemi için fonksiyon
  const handleCopy = () => {
    navigator.clipboard.writeText(editedShareUrl);
    toast.success(t("SnackBar.coypLinkSuccess"));
  };

  // Separator ile başlık ve URL'yi birleştirme
  const separator = " - "; // Başlık ile URL arasındaki ayırıcı
  const fullTitle = `${title}${separator}`;

  return (
    <>
      <meta property="og:image" content={editImageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <div className="flex space-x-4 justify-start items-center mt-4 w-full flex-wrap">
        {/* Copy Butonu */}
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-300 p-1 rounded-full border border-gray-400 hover:border-gray-500 focus:outline-none flex justify-center items-center"
        >
          <BsLink45Deg size={24} />
        </button>

        {/* WhatsApp */}
        <WhatsappShareButton url={editedShareUrl} title={fullTitle}>
          <FaWhatsapp
            size={26}
            className="text-primary hover:text-secondary transition-colors duration-300"
          />
        </WhatsappShareButton>

        {/* Facebook */}
        <FacebookShareButton
          url={editedShareUrl}
          quote={fullTitle}
          hashtag={hashtag} // Hashtag parametresini burada ekliyoruz
        >
          <FaFacebook
            size={26}
            className="text-primary hover:text-secondary transition-colors duration-300"
          />
        </FacebookShareButton>

        {/* Twitter */}
        <TwitterShareButton
          url={editedShareUrl}
          title={title}
          via={fullTitle} // Twitter paylaşımında başlık ve URL
        >
          <FaXTwitter
            size={26}
            className="text-primary hover:text-secondary transition-colors duration-300"
          />
        </TwitterShareButton>

        {/* Telegram */}
        <TelegramShareButton url={editedShareUrl}>
          <FaTelegram
            size={26}
            className="text-primary hover:text-secondary transition-colors duration-300"
          />
        </TelegramShareButton>
      </div>
    </>
  );
}

export default ShareButtons;
