import { useTranslations } from "next-intl";
import { FaPhoneAlt, FaRegAddressCard, FaEnvelope } from "react-icons/fa";

export default function ProfilePage() {
  const t = useTranslations();

  return (
    <div className="w-full px-4 md:px-8 py-6 space-y-8 h-full bg-white  rounded-lg">
      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl  md:text-2xl font-semibold text-primary">
          {t("userInfo.title")}
        </h3>
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <FaRegAddressCard className="text-primary text-xl" />
            <span className="font-medium text-gray-800">
              <strong>{t("userInfo.name")}: </strong> Jhon Doe
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-primary text-xl" />
            <span className="font-medium text-gray-800">
              <strong>{t("userInfo.email")}: </strong> example@gmail.com
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="text-primary text-xl" />
            <span className="font-medium text-gray-800">
              <strong>{t("userInfo.phone")}: </strong> +90 555 123 4567
            </span>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-2">
        <h3 className="text-xl  md:text-2xl font-semibold text-primary">
          {t("userInfo.address")}
        </h3>
        <div className="bg-gray-50  rounded-lg shadow-sm">
          <p className="text-gray-700 text-sm leading-relaxed p-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
            temporibus, id qui, laboriosam maiores distinc Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Nemo quibusdam, officiis non
            facere porro nostrum dolores dolor vero veniam illum molestiae
            impedit, quisquam deserunt dolore aperiam nobis soluta fugit,
            commodi velit.
          </p>
        </div>
      </div>
    </div>
  );
}
