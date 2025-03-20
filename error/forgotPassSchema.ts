import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useForgotPassValidationSchema = () => {
  const t = useTranslations();

  return Yup.object({
    forgotEmail: Yup.string()
      .email(t("loginForm.errors.email"))
      .required(t("loginForm.errors.emailRequired")),
  });
};
