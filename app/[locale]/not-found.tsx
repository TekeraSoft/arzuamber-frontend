import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaRegSadTear } from "react-icons/fa";

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      {/* İkon ile başlık */}
      <FaRegSadTear className="text-6xl text-gray-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {t("warningText.pageNotFoundTitle")}
      </h1>

      {/* Hata mesajı */}
      <p className="text-lg text-gray-600 mb-6">
        {t("warningText.pageNotFoundText")}
      </p>

      {/* Ana sayfaya yönlendirme */}
      <Link
        href="/"
        className="px-6 py-3 bg-secondary text-white rounded-full hover:scale-105 transition-colors"
      >
        {t("warningText.ButtonText")}
      </Link>
    </div>
  );
}
