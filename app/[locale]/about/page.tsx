"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className=" mt-24 text-center flex flex-col justify-center items-center animate__animated  animate__fadeIn ">
      <h2 className="text-4xl font-bold text-gray-800 mb-2">
        {t("AboutPage.aboutPageTitle")}
      </h2>
      <p className="text-sm  md:text-base text-gray-600 mb-8 max-w-4xl mx-auto">
        {t("AboutPage.aboutPageDescription")}
      </p>

      <Image
        src={
          locale === "tr"
            ? "/images/about/about1TR.png"
            : "/images/about/about1EN.png"
        }
        alt="Moda Butik Görsel 2"
        width={1024}
        height={500}
        priority
        className="rounded-lg "
      />

      <div className=" mt-5">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
          {t("AboutPage.visionTitle")}
        </h3>
        <p className="  md:text-lg text-gray-600 max-w-3xl mx-auto">
          {t("AboutPage.visionDescription")}
        </p>
      </div>
    </div>
  );
}
export default AboutPage;
