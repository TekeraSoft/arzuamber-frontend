import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useContactPageValidationSchema = () => {
  const t = useTranslations();

  return Yup.object({
    name: Yup.string().required(t("ContactPage.form.nameRequired")),
    surname: Yup.string().required(t("ContactPage.form.lastNameRequired")),
    email: Yup.string()
      .email(t("ContactPage.form.emailInvalid"))
      .required(t("ContactPage.form.emailRequired")),
    message: Yup.string().required(t("ContactPage.form.messageRequired")),
  });
};
