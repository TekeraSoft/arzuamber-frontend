"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";

function ProductDescriptions({ description }: { description: string }) {
  const t = useTranslations();

  const [lineClamp, setLineClamp] = useState(true);

  const toggleClamp = () => setLineClamp(!lineClamp);

  if (!description || description.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 space-x-2 min-h-12">
        <FaRegComment size={24} />
        <p>Henüz hiç açıklama mevcut değil.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg ">
      <p
        className={`text-secondary text-base ${
          lineClamp ? "line-clamp-3" : "line-clamp-none"
        } mb-3`}
      >
        {description}
      </p>
      {description.length > 250 && (
        <button
          onClick={toggleClamp}
          className="text-secondary font-semibold mt-1 hover:underline focus:outline-none"
        >
          {lineClamp
            ? t("productDetail.readMore")
            : t("productDetail.readLess")}
        </button>
      )}
    </div>
  );
}

export default ProductDescriptions;
