import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useRegisterValidationSchema = () => {
  const t = useTranslations();

  return Yup.object({
    name: Yup.string()
      .min(2, t("registerForm.errors.nameMin"))
      .max(50, t("registerForm.errors.nameMax"))
      .required(t("registerForm.errors.nameRequired")),
    surname: Yup.string()
      .min(2, t("registerForm.errors.surnameMin"))
      .max(50, t("registerForm.errors.surnameMax"))
      .required(t("registerForm.errors.surnameRequired")),
    email: Yup.string()
      .email(t("registerForm.errors.email")) // Genel e-posta formatı doğrulaması
      .required(t("registerForm.errors.emailRequired"))

      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        t("registerForm.errors.email")
      ),
    password: Yup.string()
      .min(6, t("registerForm.errors.passwordMin"))
      .required(t("registerForm.errors.passwordRequired"))
      .matches(/[A-Z]/, t("registerForm.errors.passwordUpperCase"))
      .matches(/[a-z]/, t("registerForm.errors.passwordLowerCase"))
      .matches(/[0-9]/, t("registerForm.errors.passwordNumber"))
      .matches(/[\W_]/, t("registerForm.errors.passwordSpecialChar")),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], t("registerForm.errors.passwordMatch"))
      .required(t("registerForm.errors.rePasswordRequired")),
  });
};
