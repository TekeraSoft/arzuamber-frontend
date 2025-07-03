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

function DfSharedButton({
                          shareUrl,
                          title,
                          hashtag, // Props olarak hashtag ekliyoruz
                      }: ShareButtonsProps) {
    const locale = useLocale();
    const t = useTranslations();

    // Locale'e göre URL'yi düzenleme
    const editedShareUrl = `https://arzuamber.com/${locale}/df/` + shareUrl;

    // Kopyalama işlemi için fonksiyon
    const handleCopy = () => {
        navigator.clipboard.writeText(editedShareUrl);
        toast.success(t("SnackBar.coypLinkSuccess"));
    };

    // Separator ile başlık ve URL'yi birleştirme
    const separator = " - "; // Başlık ile URL arasındaki ayırıcı
    const fullTitle = `${title}${separator}`;

    return (
        <div className="flex flex-col justify-start w-full items-start">
            <h2 className="text-lg font-semibold text-secondary mb-2">Paylaş</h2>
            <div className="flex flex-wrap gap-3 justify-start items-center w-full">
                {/* Copy Butonu */}
                <button
                    onClick={handleCopy}
                    className="p-3 rounded-full border border-gray-400 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:border-gray-500 hover:text-gray-800 transition duration-300 shadow-sm transform hover:scale-105"
                >
                    <BsLink45Deg size={20} />
                </button>

                {/* WhatsApp */}
                <WhatsappShareButton url={editedShareUrl} title={fullTitle}>
                    <div className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-300 shadow-md transform hover:scale-105">
                        <FaWhatsapp size={20} />
                    </div>
                </WhatsappShareButton>

                {/* Facebook */}
                <FacebookShareButton
                    url={editedShareUrl}
                    quote={fullTitle}
                    hashtag={hashtag}
                >
                    <div className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105">
                        <FaFacebook size={20} />
                    </div>
                </FacebookShareButton>

                {/* Twitter (X) */}
                <TwitterShareButton url={editedShareUrl} title={title} via={fullTitle}>
                    <div className="p-3 rounded-full bg-black text-white hover:bg-gray-900 transition duration-300 shadow-md transform hover:scale-105">
                        <FaXTwitter size={20} />
                    </div>
                </TwitterShareButton>

                {/* Telegram */}
                <TelegramShareButton url={editedShareUrl}>
                    <div className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 shadow-md transform hover:scale-105">
                        <FaTelegram size={20} />
                    </div>
                </TelegramShareButton>
            </div>
        </div>
    );
}

export default DfSharedButton;
