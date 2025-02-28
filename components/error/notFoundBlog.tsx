import React from "react";
import { useTranslations } from "next-intl";
import { FaSearch } from "react-icons/fa";
import "animate.css";

function NotFoundBlog() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100 animate__animated animate__fadeIn">
      <div className="flex flex-col justify-center items-center text-center mb-6">
        <FaSearch className="text-6xl text-gray-500 mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800">
          {t("warningText.BlogNotFoundTitle")}
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          {t("warningText.BlogNotFoundText")}
        </p>
      </div>
      {/* Blog içeriği örneği */}
      <div className="max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("warningText.notFoundBlog.secondaryTitle")}
        </h2>
        <p className="text-gray-600">
          {t("warningText.notFoundBlog.secondaryMessage")}
        </p>
      </div>
    </div>
  );
}

export default NotFoundBlog;
