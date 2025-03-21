import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useUserUpdateAddressSchema = () => {
  const t = useTranslations();

  return Yup.object({
    address: Yup.string()
      .min(10, t("forgotPassForm.addressMin"))
      .required(t("forgotPassForm.addressReq")),
  });
};
