import PageContainer from "@/components/Containers/PageContainer";
// import { useTranslations } from "next-intl";
import Image from "next/image";

function AboutPage() {
  // const t = useTranslations();

  return (
    <div>
      <PageContainer>
        <div className="bg-gray-50 py-12 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Hakkımızda
              {/* {t("AboutPage.aboutPageTitle")} */}
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
              Moda dünyasında sizlere en yeni trendleri, kaliteli ürünleri ve
              şık kombinleri sunmak için buradayız. Misyonumuz, her kadının
              kendini özel hissetmesini sağlamak. Modern, şık ve özgün
              tasarımlar ile gardırobunuzu yenileyin.
              {/* {t("AboutPage.aboutPageDescription")} */}
            </p>

            {/* Grid Yapısı - Responsive Tasarım */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
              {/* Görsel 1 */}
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

              {/* Görsel 2 */}
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

            <div className="mt-12">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                {/* {t("AboutPage.visionTitle")} */}
                Vizyonumuz
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {/* {t("AboutPage.visionDescription")} */}
                Sadece kıyafet değil, aynı zamanda bir yaşam tarzı sunuyoruz.
                Her bir parça, sizin tarzınızı yansıtacak şekilde
                tasarlanmıştır. Modayı takip etmek değil, ona yön vermek
                istiyoruz.
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default AboutPage;
