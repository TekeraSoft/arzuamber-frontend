import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useNewPassSchema = () => {
  const t = useTranslations();

  return Yup.object({
    newPassword: Yup.string()
      .min(6, t("forgotPassForm.newPasMin"))
      .required(t("forgotPassForm.newPasReq")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], t("forgotPassForm.noMatchPass"))
      .required(t("forgotPassForm.passReReq")),
  });
};
