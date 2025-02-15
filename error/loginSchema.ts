import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useLoginValidationSchema = () => {
  const t = useTranslations();

  return Yup.object({
    email: Yup.string()
      .email(t("loginForm.errors.email"))
      .required(t("loginForm.errors.emailRequired")),
    password: Yup.string()
      .min(6, t("loginForm.errors.passwordMin"))
      .required(t("loginForm.errors.passwordRequired")),
  });
};
