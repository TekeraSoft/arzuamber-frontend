import { Link } from "@/i18n/routing";
import { FaRegHeart } from "react-icons/fa6";
import { useTranslations } from "next-intl";

const EmptyFav = () => {
  const t = useTranslations();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 flex justify-center items-center flex-col text-center max-w-md">
        <FaRegHeart className="w-12 h-12 md:w-24 md:h-24 mx-auto text-secondary mb-4" />
        <p className="text-3xl font-semibold text-gray-700">
          {t("FavPage.emptyfavTitle")}
        </p>

        <Link href={`/`}>
          <p className="text-mywhite mt-4 bg-secondary px-3 py-2 rounded-lg shadow-lg md:text-lg w-72">
            {t("FavPage.emptyfavMessage")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EmptyFav;
