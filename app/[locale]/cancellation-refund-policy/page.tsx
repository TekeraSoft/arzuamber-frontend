import PageContainer from "@/components/Containers/PageContainer";
import { useTranslations } from "next-intl";
import Image from "next/image"; // Image bileşeni eklendi

export default function Page() {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className=" flex flex-col justify-center items-center  gap-5">
        <h1 className="text-lg  md:text-4xl text-gray-800 font-bold text-center">
          {t("ReturnAndCancelPolicy.title")}
        </h1>
        <div className=" relative w-full h-[500px]">
          <Image
            src="/images/utils/boutique-4633332_1280.jpg" // Kendi resminizi buraya ekleyin
            alt="Return and Cancel Policy Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>

        <p className="text-gray-500  text-sm  text-start tracking-wide">
          {t("ReturnAndCancelPolicy.content")}
        </p>
      </div>
    </PageContainer>
  );
}
