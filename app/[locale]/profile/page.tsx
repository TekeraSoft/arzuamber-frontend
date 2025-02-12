import { useTranslations } from "next-intl";
import { FaPhoneAlt, FaRegAddressCard, FaEnvelope } from "react-icons/fa";

export default function ProfilePage() {
  const t = useTranslations();

  return (
    <div className="w-full   md:px-6 py-2 space-y-6 h-full ">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-secondary">
          {t("userInfo.title")}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <FaRegAddressCard className="mr-2 text-primary" />
            <strong> {t("userInfo.name")}:</strong>Jhon Doe
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-primary" />
            <strong> {t("userInfo.email")}:</strong> example@gmail.com
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2 text-primary" />
            <strong> {t("profileUpdate.email")}:</strong>+90 555 123 4567
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-secondary">
          {t("userInfo.address")}
        </h3>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
          temporibus, id qui, laboriosam maiores distinc Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Nemo quibusdam, officiis non facere
          porro nostrum dolores dolor vero veniam illum molestiae impedit,
          quisquam deserunt dolore aperiam nobis soluta fugit, commodi velit
        </p>
      </div>
    </div>
  );
}
