import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useUserPassChangeSchema = () => {
  const t = useTranslations();

  return Yup.object({
    changedPassword: Yup.string()
      .min(6, t("forgotPassForm.passMin"))
      .required(t("forgotPassForm.passReq")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("changedPassword")], t("forgotPassForm.noMatchPass"))
      .required(t("forgotPassForm.passReReq")),
  });
};
