"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

function ProductDescriptions({ description }) {
  const t = useTranslations();

  const [lineClamp, setLineClamp] = useState(true);

  const toggleClamp = () => setLineClamp(!lineClamp);

  return (
    <div>
      {" "}
      <>
        <p
          className={`text-secondary text-base ${
            lineClamp ? "line-clamp-3" : "line-clamp-none"
          }`}
        >
          {description}
        </p>
        {description.length > 250 && (
          <button
            onClick={toggleClamp}
            className="text-secondary font-semibold text-end mt-1 hover:underline"
          >
            {lineClamp
              ? t("productDetail.readMore")
              : t("productDetail.readLess")}
          </button>
        )}
      </>
    </div>
  );
}

export default ProductDescriptions;
