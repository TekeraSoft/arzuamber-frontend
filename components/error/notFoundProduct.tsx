import React from "react";
import { useTranslations } from "next-intl";
import { FaSearch } from "react-icons/fa";
import "animate.css";

function NotFoundProduct() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-96 animate__animated animate__fadeIn">
      <div className="flex flex-col justify-center items-center text-center mb-6">
        <FaSearch className="text-6xl text-gray-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800">
          {t("warningText.notFoundProduct.title")}
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          {t("warningText.notFoundProduct.message")}
        </p>
      </div>
    </div>
  );
}

export default NotFoundProduct;
