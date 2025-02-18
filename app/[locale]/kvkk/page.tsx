import PageContainer from "@/components/Containers/PageContainer";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-gray-800 text-center md:text-4xl">
        {t("KVKK.title1")}
      </h1>
      <p className="text-gray-600 mt-6 text-sm md:text-base leading-relaxed">
        {t("KVKK.text1")}
      </p>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("KVKK.title2")}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {t("KVKK.text2")}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("KVKK.title3")}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {t("KVKK.text3")}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("KVKK.title4")}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {t("KVKK.text4")}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("KVKK.title5")}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {t("KVKK.text5")}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("KVKK.title6")}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {t("KVKK.text6")}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("KVKK.title7")}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {t("KVKK.text7")}
        </p>
      </div>
    </PageContainer>
  );
}
