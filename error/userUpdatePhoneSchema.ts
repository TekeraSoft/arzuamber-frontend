import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useUserUpdatePhoneSchema = () => {
  const t = useTranslations();

  return Yup.object({
    phone: Yup.string().required(t("paymentForm.buyer.gsmNumber")),
  });
};
