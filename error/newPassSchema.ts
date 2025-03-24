import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useNewPassSchema = () => {
  const t = useTranslations();

  return Yup.object({
    newPassword: Yup.string()
      .min(6, t("forgotPassForm.newPasMin"))
      .required(t("forgotPassForm.newPasReq"))
        .matches(/[A-Z]/, t("registerForm.errors.passwordUpperCase"))
        .matches(/[a-z]/, t("registerForm.errors.passwordLowerCase"))
        .matches(/[0-9]/, t("registerForm.errors.passwordNumber"))
        .matches(/[\W_]/, t("registerForm.errors.passwordSpecialChar")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], t("forgotPassForm.noMatchPass"))
      .required(t("forgotPassForm.passReReq")),
  });
};
