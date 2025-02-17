import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { TbPlugConnectedX } from "react-icons/tb";

function Error() {
  const t = useTranslations();

  return (
    <div className="w-full h-screen container mx-auto my-5 flex flex-col justify-center items-center bg-secondary shadow-xl gap-3 sm:gap-5 p-4">
      <TbPlugConnectedX size={120} className="text-mywhite mb-4 sm:mb-6" />
      <h1 className="md:text-3xl text-lg font-bold text-mywhite my-4 text-center">
        {t("warningText.somethingWentWrong")}
      </h1>
      <p className="md:text-lg text-sm text-mywhite mb-3 text-center font-thin">
        {t("warningText.serverError")}
      </p>
      <Link
        className="bg-mywhite text-secondary font-semibold py-2 px-7 rounded-lg shadow-md transition duration-300 hover:scale-105 text-center"
        href={`/`}
      >
        {t("warningText.ButtonText")}
      </Link>
    </div>
  );
}

export default Error;
