"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import DOMPurify from "dompurify";

function ProductDescriptions({ description }: { description: string }) {
  const t = useTranslations();

  const [lineClamp, setLineClamp] = useState(true);

  const toggleClamp = () => setLineClamp(!lineClamp);

  if (!description || description.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 space-x-2 min-h-12">
        <FaRegComment size={24} />
        <p>Henüz açıklama mevcut değil.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg flex flex-col justify-start items-end gap-2 p-4 border">
      <div
        className={`prose prose-sm md:prose-base text-secondary max-w-none ${
          lineClamp ? "line-clamp-3 overflow-hidden" : ""
        }`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      />

      {description.length > 250 && (
        <button
          onClick={toggleClamp}
          className="text-secondary text-sm md:text-base font-semibold mt-1 hover:underline focus:outline-none"
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
