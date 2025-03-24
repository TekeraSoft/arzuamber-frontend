import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useUserUpdatePhoneSchema = () => {
  const t = useTranslations();

  return Yup.object({
    phoneNumber: Yup.string().required(t("paymentForm.buyer.gsmNumber")),
    address: Yup.string()
        .min(10, t("forgotPassForm.addressMin"))
        .required(t("forgotPassForm.addressReq")),
  });
};
