import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LuSearchX } from "react-icons/lu";

import PageContainer from "../Containers/PageContainer";

interface WarningTextProps {
  title: string;
  text: string;
}

function NotFoundPage({ title, text }: WarningTextProps) {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-secondary p-8 shadow-xl border-b border-mywhite">
        <div className="text-center mb-6 flex flex-col justify-center items-center">
          <LuSearchX className="text-6xl text-mywhite mb-4" />
          <h1 className="text-xl  md:text-4xl font-extrabold text-mywhite mb-4">
            {title}
          </h1>
          <p className="md:text-xl text-mywhite">{text}</p>
        </div>
        <Link
          href="/"
          className="mt-4 px-8 py-3 bg-primaryDark text-mywhite rounded-md shadow-lg text-sm md:text-xl font-semibold hover:bg-primary"
        >
          {t("warningText.ButtonText")}
        </Link>
      </div>
    </PageContainer>
  );
}

export default NotFoundPage;
