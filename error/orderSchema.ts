import * as yup from "yup";
import { useTranslations } from "next-intl";

export const useOrderValidationSchema = () => {
  const t = useTranslations("paymentForm");

  return yup.object().shape({
    cardHolderName: yup.string().required("Ad zorunlu alan !"),
    cardNumber: yup
      .string()
      .min(16, "Minimum 16 karakter !")
      .required(t("paymentCard.cardHolderName")),
    expireMonth: yup
      .string()
      .min(2)
      .max(2)
      .required(t("paymentCard.expireMonth.required")),
    expireYear: yup.string().min(2).max(2).required("Yıl zorunlu alan !"),
    cvc: yup
      .string()
      .min(3)
      .max(3)
      .required(t("paymentCard.expireYear.required")),

    buyer: yup.object({
      name: yup.string().required(t("buyer.name")),
      surname: yup.string().required(t("buyer.surname")),
      gsmNumber: yup.string().required(t("buyer.gsmNumber")),
      email: yup
        .string()
        .email(t("buyer.email.email"))
        .required(t("buyer.email.required")),
    }),
    shippingAddress: yup.object({
      city: yup.string().required(t("shippingAddress.city")),
      state: yup.string().required(t("shippingAddress.district")),
      address: yup.string().required(t("shippingAddress.address")),
      street: yup.string().required(t("shippingAddress.Neighbourhood")),
    }),
  });
};
