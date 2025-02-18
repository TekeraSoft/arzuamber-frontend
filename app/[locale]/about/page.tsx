import PageContainer from "@/components/Containers/PageContainer";
import { useTranslations } from "next-intl";
import Image from "next/image";

function AboutPage() {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto text-center ">
        <h2 className="text-4xl font-bold text-gray-800  py-10">
          {t("AboutPage.aboutPageTitle")}
        </h2>
        <p className="  md:text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
          {t("AboutPage.aboutPageDescription")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8 md:mb-0">
          <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/about/about1.jpg"
              alt="Moda Butik Görsel 1"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-lg object-cover"
            />
          </div>

          <div className=" block md:hidden">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              {t("AboutPage.visionTitle")}
            </h3>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              {t("AboutPage.visionDescription")}
            </p>
          </div>

          <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/about/about2.jpg"
              alt="Moda Butik Görsel 2"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className=" hidden md:block  md:mt-12 my-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            {t("AboutPage.visionTitle")}
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("AboutPage.visionDescription")}
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export default AboutPage;
